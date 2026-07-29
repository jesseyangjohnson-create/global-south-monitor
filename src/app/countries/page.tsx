import type { Metadata } from "next";
import Link from "next/link";
import { getAllNews } from "@/lib/news";

export const metadata: Metadata = {
  title: "国家分类",
  alternates: { canonical: "/countries" },
};

export default function CountriesPage() {
  const news = getAllNews();
  const countries = [...new Set(news.map((item) => item.country))].sort((a, b) => a.localeCompare(b, "zh-CN"));
  return (
    <main>
      <div className="page-hero"><div className="shell"><div className="eyebrow">COUNTRY INDEX</div><h1>国家分类</h1><p>按国家与经济体浏览资讯，建立清晰的区域索引。</p></div></div>
      <section className="section shell directory-grid">
        {countries.map((country) => {
          const count = news.filter((item) => item.country === country).length;
          return (
            <Link className="directory-card" href={`/countries/${encodeURIComponent(country)}`} key={country}>
              <span>COUNTRY</span><h2>{country}</h2><p>{count} 条资讯 · 查看国家档案 →</p>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
