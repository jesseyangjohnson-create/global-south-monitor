import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const directory = path.join(process.cwd(), "content/news");
const disclaimer = "演示内容，不代表真实新闻。";
const summarySuffix =
  "本条目仅用于展示网站内容结构、分类筛选与页面样式，不构成事实报道或决策依据。";

for (const filename of fs.readdirSync(directory).filter((name) => name.endsWith(".md"))) {
  const filePath = path.join(directory, filename);
  const slug = filename.replace(/\.md$/, "");
  const parsed = matter(fs.readFileSync(filePath, "utf8"));
  const data = parsed.data;
  const tags = Array.isArray(data.tags) ? data.tags : data.topics ?? [];
  let summary = String(data.summary ?? "").trim();
  if (!summary.includes(disclaimer)) summary = `${disclaimer}${summary}`;
  if ([...summary].length < 60) summary = `${summary}${summarySuffix}`;

  const migrated = {
    title: data.title,
    slug,
    date: data.date,
    country: data.country,
    region: data.region === "非洲" ? "撒哈拉以南非洲" : data.region,
    category: data.category,
    tags,
    source: data.source,
    sourceUrl:
      data.sourceUrl === "https://example.com"
        ? `https://example.com/demo/${slug}`
        : data.sourceUrl,
    summary,
    featured: Boolean(data.featured),
    contentType: data.contentType ?? "news",
    language: data.language ?? "zh-CN",
    updatedAt: data.updatedAt ?? data.date,
    demo: true,
  };

  let body = parsed.content.trim();
  if (!body.includes(disclaimer)) body = `${disclaimer}\n\n${body}`;
  fs.writeFileSync(filePath, matter.stringify(`${body}\n`, migrated), "utf8");
  console.log(`已迁移 ${path.relative(process.cwd(), filePath)}`);
}
