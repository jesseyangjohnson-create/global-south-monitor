import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { formatDate, getAllNews, getNewsBySlug } from "@/lib/news";
import { absoluteUrl, getSiteUrl } from "@/lib/site-url";

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
  return item
    ? {
        title: item.title,
        description: item.summary,
        alternates: { canonical: `/news/${item.slug}` },
        openGraph: {
          type: "article",
          url: `/news/${item.slug}`,
          title: item.title,
          description: item.summary,
          publishedTime: item.date,
          modifiedTime: item.updatedAt,
          locale: "zh_CN",
        },
        twitter: { card: "summary", title: item.title, description: item.summary },
      }
    : {};
}

export default async function NewsDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) notFound();
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    description: item.summary,
    datePublished: item.date,
    dateModified: item.updatedAt,
    inLanguage: item.language,
    mainEntityOfPage: absoluteUrl(`/news/${item.slug}`),
    author: { "@type": "Organization", name: "全球南方观察" },
    publisher: {
      "@type": "Organization",
      name: "全球南方观察",
      url: getSiteUrl().toString(),
    },
    isAccessibleForFree: true,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />
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
        {item.demo && <div className="demo-alert">演示内容，不代表真实新闻。</div>}
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
