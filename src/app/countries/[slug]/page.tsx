import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsList } from "@/components/NewsList";
import { getAllNews } from "@/lib/news";

export function generateStaticParams() {
  return [...new Set(getAllNews().map((item) => item.country))].map((country) => ({ slug: country }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const country = decodeURIComponent(slug);
  const exists = getAllNews().some((item) => item.country === country);
  return exists
    ? {
        title: `${country}资讯`,
        description: `浏览全球南方观察收录的${country}相关资讯。`,
        alternates: { canonical: `/countries/${encodeURIComponent(country)}` },
      }
    : {};
}

export default async function CountryDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const country = decodeURIComponent(slug);
  const items = getAllNews().filter((item) => item.country === country);
  if (!items.length) notFound();
  return (
    <main>
      <div className="page-hero"><div className="shell"><div className="eyebrow">COUNTRY INDEX</div><h1>{country}</h1><p>该国家或经济体相关的资讯档案，共 {items.length} 条。</p></div></div>
      <section className="section shell"><NewsList items={items} /></section>
    </main>
  );
}
