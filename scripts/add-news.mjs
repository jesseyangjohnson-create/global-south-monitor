import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";
import matter from "gray-matter";

const root = process.cwd();
const directory = path.join(root, "content/news");
const taxonomy = JSON.parse(
  fs.readFileSync(path.join(root, "config/content-taxonomy.json"), "utf8"),
);
const interface_ = readline.createInterface({ input: process.stdin, output: process.stdout });

function validDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  return new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value;
}

function validHttpUrl(value) {
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

async function askRequired(label, validator = (value) => Boolean(value)) {
  while (true) {
    const value = (await interface_.question(`${label}：`)).trim();
    if (validator(value)) return value;
    console.log("输入无效，请重新输入。");
  }
}

async function choose(label, options) {
  console.log(`\n${label}`);
  options.forEach((option, index) => console.log(`  ${index + 1}. ${option}`));
  const selected = await askRequired("请输入序号", (value) => {
    const number = Number(value);
    return Number.isInteger(number) && number >= 1 && number <= options.length;
  });
  return options[Number(selected) - 1];
}

const existing = fs
  .readdirSync(directory)
  .filter((name) => name.endsWith(".md"))
  .map((name) => {
    const parsed = matter(fs.readFileSync(path.join(directory, name), "utf8"));
    return { filename: name, ...parsed.data };
  });

try {
  console.log("新增新闻（不会自动提交或推送 Git）\n");
  const title = await askRequired("中文标题");
  if (existing.some((item) => item.title === title)) throw new Error("该标题已存在，已取消创建。");
  const date = await askRequired("日期（YYYY-MM-DD）", validDate);
  const country = await askRequired("国家");
  const region = await choose("选择地区：", taxonomy.regions.map((item) => item.name));
  const category = await choose("选择一级议题：", taxonomy.categories.map((item) => item.name));
  const tagsText = await askRequired("二级标签（多个请用中文或英文逗号分隔）");
  const tags = tagsText.split(/[,，]/).map((tag) => tag.trim()).filter(Boolean);
  const source = await askRequired("来源");
  const sourceUrl = await askRequired("原文链接（HTTP/HTTPS）", validHttpUrl);
  if (existing.some((item) => item.sourceUrl === sourceUrl)) {
    throw new Error("该原文链接已登记，已取消创建。");
  }
  const summary = await askRequired(
    "摘要（建议 100—200 字，系统允许 60—250 字）",
    (value) => [...value].length >= 60 && [...value].length <= 250,
  );
  const featuredAnswer = await askRequired("是否精选？（y/N）", (value) =>
    /^(y|yes|n|no)$/i.test(value || "n"),
  );
  const contentType = await choose("选择内容类型：", taxonomy.contentTypes);
  const digest = crypto
    .createHash("sha256")
    .update(`${title}\0${country}\0${date}`)
    .digest("hex")
    .slice(0, 10);
  let slug = `${date}-${digest}`;
  let counter = 2;
  while (fs.existsSync(path.join(directory, `${slug}.md`))) slug = `${date}-${digest}-${counter++}`;
  const filePath = path.join(directory, `${slug}.md`);
  const updatedAt = new Date().toISOString().slice(0, 10);
  const frontMatter = {
    title,
    slug,
    date,
    country,
    region,
    category,
    tags,
    source,
    sourceUrl,
    summary,
    featured: /^(y|yes)$/i.test(featuredAnswer),
    contentType,
    language: "zh-CN",
    updatedAt,
  };
  const body = "请在发布前，以自己的语言撰写经过核验的正文，并区分事实、引述与评论。\n";
  fs.writeFileSync(filePath, matter.stringify(body, frontMatter), { encoding: "utf8", flag: "wx" });
  console.log(`\n创建成功：${path.relative(root, filePath)}`);
  console.log("请编辑正文并运行 npm run content:check；工具未执行 Git 提交或推送。");
} catch (error) {
  console.error(`\n创建失败：${error.message}`);
  process.exitCode = 1;
} finally {
  interface_.close();
}
