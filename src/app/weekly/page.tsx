import type { Metadata } from "next";
import Link from "next/link";
import { NewsCard } from "@/components/NewsCard";
import { getAllNews } from "@/lib/news";

export const metadata: Metadata = {
  title: "每周观察",
  alternates: { canonical: "/weekly" },
};

export default function WeeklyPage() {
  const news = getAllNews().slice(0, 6);
  return (
    <main>
      <div className="page-hero weekly-page-hero"><div className="shell"><div className="eyebrow">WEEKLY WATCH · ISSUE 07</div><h1>每周观察</h1><p>把一周内分散的地区资讯串联为三条值得继续追踪的发展线索。</p></div></div>
      <section className="section shell">
        <div className="weekly-intro"><span>本期导读</span><h2>融资约束、产业联系与气候适应</h2><p>从近期已核验资讯中选择六条内容，串联发展融资、产业升级、公共治理与气候韧性的共同线索。</p></div>
        <div className="news-grid">{news.map((item) => <NewsCard item={item} key={item.slug} />)}</div>
        <div className="weekly-back"><Link className="button button-dark" href="/news">浏览全部资讯</Link></div>
      </section>
    </main>
  );
}
