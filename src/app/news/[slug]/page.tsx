import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { formatDate, getAllNews, getNewsBySlug } from "@/lib/news";

export function generateStaticParams() {
  return getAllNews().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  return item ? { title: item.title, description: item.summary } : {};
}

export default async function NewsDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) notFound();

  return (
    <main>
      <article className="article-shell">
        <div className="article-breadcrumb">
          <Link href="/news">最新资讯</Link> / {item.region}
        </div>
        <h1>{item.title}</h1>
        <p className="article-summary">{item.summary}</p>
        <div className="article-meta">
          <span>{formatDate(item.date)}</span>
          <span>{item.country} · {item.region}</span>
          <span>来源：{item.source}</span>
          <span>大类：{item.category}</span>
          <span>标签：{item.topics.join(" / ")}</span>
        </div>
        <div className="demo-alert">演示内容，不代表真实新闻。</div>
        <div className="article-content">
          <ReactMarkdown>{item.content}</ReactMarkdown>
        </div>
        <a className="button source-button" href={item.sourceUrl} target="_blank" rel="noreferrer">
          查看原文链接 ↗
        </a>
      </article>
    </main>
  );
}
