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
  topics: string[];
  category: string;
  source: string;
  sourceUrl: string;
  summary: string;
  featured: boolean;
  content: string;
};

const newsDirectory = path.join(process.cwd(), "content/news");

function parseNewsFile(filename: string): NewsItem {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(newsDirectory, filename), "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title,
    date: data.date,
    country: data.country,
    region: normalizeRegion(data.region),
    topics: data.topics,
    category: data.category || categoryFromTopics(data.topics),
    source: data.source,
    sourceUrl: data.sourceUrl,
    summary: data.summary,
    featured: Boolean(data.featured),
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
