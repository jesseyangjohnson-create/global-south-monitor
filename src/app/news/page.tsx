import type { Metadata } from "next";
import { NewsList } from "@/components/NewsList";
import { getAllNews } from "@/lib/news";
import { CATEGORIES, REGIONS } from "@/lib/site";

export const metadata: Metadata = {
  title: "最新资讯",
  alternates: { canonical: "/news" },
};

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; region?: string; category?: string; topic?: string }>;
}) {
  const params = await searchParams;
  const q = params.q?.trim().toLowerCase() ?? "";
  const region = params.region ?? "";
  const category = params.category ?? params.topic ?? "";
  const items = getAllNews().filter((item) => {
    const haystack = [
      item.title, item.summary, item.country, item.region, item.source, item.category,
      ...item.topics,
    ].join(" ").toLowerCase();
    return (!q || haystack.includes(q)) &&
      (!region || item.region === region) &&
      (!category || item.category === category || item.topics.includes(category));
  });

  return (
    <main>
      <div className="page-hero">
        <div className="shell">
          <div className="eyebrow">LATEST UPDATES</div>
          <h1>最新资讯</h1>
          <p>搜索并筛选全球南方发展议题的本地演示资讯。</p>
        </div>
      </div>
      <section className="section shell">
        <form className="filter-form" action="/news" id="filters">
          <input name="q" defaultValue={params.q} aria-label="关键词" placeholder="搜索标题、摘要、国家或来源" />
          <select name="region" defaultValue={region} aria-label="地区">
            <option value="">全部地区</option>
            {REGIONS.map((item) => <option value={item.name} key={item.slug}>{item.name}</option>)}
          </select>
          <select name="category" defaultValue={category} aria-label="议题大类">
            <option value="">全部议题</option>
            {CATEGORIES.map((item) => <option value={item.name} key={item.slug}>{item.name}</option>)}
          </select>
          <button type="submit">筛选资讯</button>
        </form>
        <div className="results-count">共找到 {items.length} 条资讯 · 按日期倒序</div>
        <NewsList items={items} />
      </section>
    </main>
  );
}
