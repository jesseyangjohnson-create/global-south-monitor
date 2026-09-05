import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NewsList } from "@/components/NewsList";
import { COUNTRY_REGISTRY, getCountryBySlug } from "@/lib/countries";
import { formatDate, getAllNews } from "@/lib/news";

export function generateStaticParams() {
  const names = new Set(getAllNews().map((item) => item.country));
  return COUNTRY_REGISTRY.filter((country) => names.has(country.nameZh)).map((country) => ({ slug: country.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const country = getCountryBySlug((await params).slug);
  return country ? {
    title: `${country.nameZh}资讯`,
    description: `浏览全球南方观察收录的${country.nameZh}发展动态与新闻。`,
    alternates: { canonical: `/country/${country.slug}` },
  } : {};
}

export default async function CountryPage({ params }: { params: Promise<{ slug: string }> }) {
  const country = getCountryBySlug((await params).slug);
  if (!country) notFound();
  const items = getAllNews().filter((item) => item.country === country.nameZh);
  if (!items.length) notFound();
  const categories = [...new Set(items.map((item) => item.category))].map((name) => ({ name, count: items.filter((item) => item.category === name).length }));

  return (
    <main>
      <div className="country-detail-hero">
        <div className="shell country-detail-grid">
          <div><div className="eyebrow">COUNTRY DOSSIER · {country.iso3}</div><h1>{country.nameZh}</h1><p className="country-english">{country.nameEn}</p><p>{country.region} · 全球南方观察新闻档案</p><Link className="country-back" href="/#global-south-atlas">← 返回全球南方观察地图</Link></div>
          <dl className="country-summary"><div><dt>新闻数量</dt><dd>{items.length}</dd></div><div><dt>最新更新</dt><dd>{formatDate(items[0].date)}</dd></div></dl>
        </div>
      </div>
      <section className="section shell">
        <div className="section-heading compact-heading"><div><span>CATEGORY MIX</span><h2>栏目分布</h2></div></div>
        <div className="country-category-strip">{categories.map((category) => <span key={category.name}>{category.name}<b>{category.count}</b></span>)}</div>
      </section>
      <section className="section section-tint"><div className="shell"><div className="section-heading"><div><span>COUNTRY NEWS</span><h2>{country.nameZh}全部资讯</h2></div><p className="section-note">按发布时间由近及远排列</p></div><NewsList items={items} /></div></section>
    </main>
  );
}
