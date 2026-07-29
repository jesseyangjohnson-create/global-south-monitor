import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const newsDirectory = path.join(root, "content/news");
const taxonomy = JSON.parse(
  fs.readFileSync(path.join(root, "config/content-taxonomy.json"), "utf8"),
);
const categories = new Set(taxonomy.categories.map((item) => item.name));
const regions = new Set(taxonomy.regions.map((item) => item.name));
const contentTypes = new Set(taxonomy.contentTypes);
const required = [
  "title",
  "slug",
  "date",
  "country",
  "region",
  "category",
  "tags",
  "source",
  "sourceUrl",
  "summary",
  "featured",
  "contentType",
  "language",
  "updatedAt",
];
const reservedSlugs = new Set(["api", "index", "new", "page", "rss", "robots", "sitemap"]);
const errors = [];
const seen = { slug: new Map(), sourceUrl: new Map(), title: new Map() };
const today = new Date().toISOString().slice(0, 10);

function add(file, message) {
  errors.push(`${file}: ${message}`);
}

function validDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value))) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

function validHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function recordUnique(field, value, file) {
  const key = String(value).trim().toLocaleLowerCase("zh-CN");
  if (!key) return;
  const previous = seen[field].get(key);
  if (previous) add(file, `${field} 与 ${previous} 重复`);
  else seen[field].set(key, file);
}

const files = fs.readdirSync(newsDirectory).filter((name) => name.endsWith(".md")).sort();
for (const filename of files) {
  const relative = `content/news/${filename}`;
  let parsed;
  try {
    parsed = matter(fs.readFileSync(path.join(newsDirectory, filename), "utf8"));
  } catch (error) {
    add(relative, `Markdown/front matter 无法解析：${error.message}`);
    continue;
  }

  const data = parsed.data;
  for (const field of required) {
    if (
      data[field] === undefined ||
      data[field] === null ||
      (typeof data[field] === "string" && !data[field].trim())
    ) {
      add(relative, `缺少必填字段 ${field}`);
    }
  }

  if (!validDate(data.date)) add(relative, "date 必须是有效的 YYYY-MM-DD 日期");
  else if (data.date > today) add(relative, `date 是未来日期（当前日期 ${today}）`);
  if (!validDate(data.updatedAt)) add(relative, "updatedAt 必须是有效的 YYYY-MM-DD 日期");
  if (validDate(data.date) && validDate(data.updatedAt) && data.updatedAt < data.date) {
    add(relative, "updatedAt 不得早于 date");
  }
  if (!validHttpUrl(data.sourceUrl)) add(relative, "sourceUrl 必须是有效的 HTTP/HTTPS 地址");
  if (!categories.has(data.category)) add(relative, `category 不在允许范围：${data.category}`);
  if (!regions.has(data.region)) add(relative, `region 不在允许范围：${data.region}`);
  if (!contentTypes.has(data.contentType)) {
    add(relative, `contentType 必须是 ${taxonomy.contentTypes.join("、")} 之一`);
  }
  if (!Array.isArray(data.tags) || data.tags.some((tag) => typeof tag !== "string" || !tag.trim())) {
    add(relative, "tags 必须是非空字符串组成的数组");
  }
  if (typeof data.featured !== "boolean") add(relative, "featured 必须是布尔值");

  const summaryLength = [...String(data.summary ?? "").trim()].length;
  if (summaryLength < 60 || summaryLength > 250) {
    add(relative, `summary 长度为 ${summaryLength} 字，应为 60—250 字`);
  }

  const filenameSlug = filename.replace(/\.md$/, "");
  const slug = String(data.slug ?? "");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) add(relative, "slug 只能包含小写字母、数字和单个连字符");
  if (slug !== filenameSlug) add(relative, `文件名必须与 slug 一致（应为 ${slug}.md）`);
  if (reservedSlugs.has(slug)) add(relative, `slug "${slug}" 与站点路径保留字冲突`);

  const hasDemoField = Object.prototype.hasOwnProperty.call(data, "demo");
  const containsDemoText = `${data.title ?? ""}\n${data.summary ?? ""}\n${parsed.content}`.includes("演示内容");
  if (data.demo === true) {
    if (!containsDemoText || !parsed.content.includes("演示内容，不代表真实新闻")) {
      add(relative, "演示新闻必须在正文中明确写明“演示内容，不代表真实新闻”");
    }
  } else {
    if (hasDemoField) add(relative, "正式新闻不得包含 demo 字段；演示新闻的 demo 必须为 true");
    if (containsDemoText) add(relative, "正式新闻不得含有“演示内容”文字");
  }

  recordUnique("slug", slug, relative);
  recordUnique("sourceUrl", data.sourceUrl, relative);
  recordUnique("title", data.title, relative);
}

if (errors.length) {
  console.error(`内容检查失败：发现 ${errors.length} 个严重错误。\n`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`内容检查通过：${files.length} 条新闻，未发现严重错误。`);
