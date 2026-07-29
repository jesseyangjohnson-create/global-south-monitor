import type { Metadata } from "next";
import { TopicCard } from "@/components/TopicCard";
import { getAllNews } from "@/lib/news";
import { CATEGORIES } from "@/lib/site";

export const metadata: Metadata = {
  title: "核心议题",
  alternates: { canonical: "/topics" },
};

export default function TopicsPage() {
  const news = getAllNews();
  return (
    <main>
      <div className="page-hero"><div className="shell"><div className="eyebrow">GLOBAL ISSUE DESK</div><h1>核心议题</h1><p>以八个清晰的大类组织全球南方新闻，旧有细分标签仍保留在每条资讯中。</p></div></div>
      <section className="section shell topic-grid">
        {CATEGORIES.map((topic) => <TopicCard topic={topic} count={news.filter((item) => item.category === topic.name).length} key={topic.slug} />)}
      </section>
    </main>
  );
}
