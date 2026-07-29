import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const newsDir = path.join(process.cwd(), "content/news");
const files = fs.readdirSync(newsDir).filter((file) => file.endsWith(".md"));
const required = [
  "title", "date", "country", "region", "category", "topics", "source",
  "sourceUrl", "summary", "featured",
];

assert.equal(files.length, 12, "演示新闻必须恰好为 12 条");

const slugs = new Set();
let featuredCount = 0;
const categories = new Set();
for (const file of files) {
  const slug = file.replace(/\.md$/, "");
  assert(!slugs.has(slug), `slug 重复: ${slug}`);
  slugs.add(slug);
  const parsed = matter(fs.readFileSync(path.join(newsDir, file), "utf8"));
  for (const key of required) {
    assert(Object.hasOwn(parsed.data, key), `${file} 缺少 ${key}`);
  }
  assert(Array.isArray(parsed.data.topics) && parsed.data.topics.length > 0, `${file} topics 无效`);
  categories.add(parsed.data.category);
  assert.match(parsed.data.date, /^\d{4}-\d{2}-\d{2}$/, `${file} 日期格式无效`);
  assert.match(parsed.data.sourceUrl, /^https?:\/\//, `${file} 原文链接无效`);
  assert(parsed.content.includes("演示内容，不代表真实新闻。"), `${file} 缺少演示声明`);
  if (parsed.data.featured) featuredCount += 1;
}

assert(featuredCount >= 1, "至少需要一条焦点新闻");
assert.equal(categories.size, 8, "演示新闻必须覆盖 8 个一级议题");
console.log(`内容校验通过：${files.length} 条 Markdown 演示新闻，覆盖 ${categories.size} 个一级议题。`);
