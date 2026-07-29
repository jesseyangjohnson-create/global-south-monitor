import type { Metadata } from "next";
import { RegionCard } from "@/components/RegionCard";
import { getAllNews } from "@/lib/news";
import { REGIONS } from "@/lib/site";

export const metadata: Metadata = {
  title: "全球地区",
  alternates: { canonical: "/regions" },
};

export default function RegionsPage() {
  const news = getAllNews();
  return (
    <main>
      <div className="page-hero page-hero-dark"><div className="shell"><div className="eyebrow">REGIONAL LENS</div><h1>全球地区</h1><p>从地理现场进入国家资讯，在区域联系中理解全球南方。</p></div></div>
      <section className="section regions-section"><div className="shell regions-grid">
        {REGIONS.map((region) => <RegionCard region={region} count={news.filter((item) => item.region === region.name).length} key={region.slug} />)}
      </div></section>
    </main>
  );
}
