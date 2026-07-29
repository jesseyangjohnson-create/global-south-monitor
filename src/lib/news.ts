import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { categoryFromTopics, normalizeRegion } from "@/lib/site";

export type NewsItem = {
  slug: string;
  title: string;
  date: string;
  country: string;
  region: string;
  tags: string[];
  /** @deprecated 使用 tags；仅为旧组件保留。 */
  topics: string[];
  category: string;
  source: string;
  sourceUrl: string;
  summary: string;
  featured: boolean;
  contentType: "news" | "analysis" | "weeklyBrief";
  language: string;
  updatedAt: string;
  demo?: true;
  content: string;
};

const newsDirectory = path.join(process.cwd(), "content/news");

function parseNewsFile(filename: string): NewsItem {
  const filenameSlug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(newsDirectory, filename), "utf8");
  const { data, content } = matter(raw);
  const tags = Array.isArray(data.tags)
    ? data.tags
    : Array.isArray(data.topics)
      ? data.topics
      : [];
  return {
    slug: data.slug || filenameSlug,
    title: data.title,
    date: data.date,
    country: data.country,
    region: normalizeRegion(data.region),
    tags,
    topics: tags,
    category: data.category || categoryFromTopics(tags),
    source: data.source,
    sourceUrl: data.sourceUrl,
    summary: data.summary,
    featured: Boolean(data.featured),
    contentType: data.contentType || "news",
    language: data.language || "zh-CN",
    updatedAt: data.updatedAt || data.date,
    ...(data.demo === true ? { demo: true as const } : {}),
    content,
  };
}

export function getAllNews(): NewsItem[] {
  return fs
    .readdirSync(newsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map(parseNewsFile)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getNewsBySlug(slug: string) {
  const file = `${slug}.md`;
  if (!fs.existsSync(path.join(newsDirectory, file))) return undefined;
  return parseNewsFile(file);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}
