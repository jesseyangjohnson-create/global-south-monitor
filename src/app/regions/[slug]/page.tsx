import Link from "next/link";
import { notFound } from "next/navigation";
import { NewsList } from "@/components/NewsList";
import { RegionSilhouette } from "@/components/RegionSilhouette";
import { getAllNews } from "@/lib/news";
import { REGIONS } from "@/lib/site";

export function generateStaticParams() {
  return REGIONS.map((item) => ({ slug: item.slug }));
}

export default async function RegionDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const region = REGIONS.find((item) => item.slug === slug);
  if (!region) notFound();
  const items = getAllNews().filter((item) => item.region === region.name);
  const countries = [...new Set(items.map((item) => item.country))];
  return (
    <main>
      <div className="region-detail-hero">
        <div className="shell region-detail-grid">
          <div><div className="eyebrow">REGIONAL LENS</div><h1>{region.name}</h1><p>{region.description}</p><div className="region-stat"><strong>{items.length}</strong><span>条资讯</span><strong>{countries.length}</strong><span>个已收录国家</span></div></div>
          <RegionSilhouette shape={region.shape} />
        </div>
      </div>
      <section className="section shell">
        <div className="section-heading compact-heading"><div><span>COUNTRIES</span><h2>地区所属国家</h2></div></div>
        <div className="country-chips">
          {region.countries.map((country) => {
            const hasNews = countries.includes(country);
            return hasNews ? <Link href={`/countries/${encodeURIComponent(country)}`} key={country}>{country}<span>查看资讯 →</span></Link> : <span className="disabled" key={country}>{country}<small>待收录</small></span>;
          })}
        </div>
      </section>
      <section className="section section-tint"><div className="shell"><div className="section-heading"><div><span>REGIONAL NEWS</span><h2>地区资讯</h2></div></div><NewsList items={items} /></div></section>
    </main>
  );
}
