import { notFound } from "next/navigation";
import { NewsList } from "@/components/NewsList";
import { getAllNews } from "@/lib/news";
import { CATEGORIES, nameFromSlug } from "@/lib/site";

export function generateStaticParams() {
  return CATEGORIES.map((item) => ({ slug: item.slug }));
}

export default async function TopicDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = CATEGORIES.find((item) => item.slug === slug);
  const name = nameFromSlug(CATEGORIES, slug);
  if (!name || !category) notFound();
  const items = getAllNews().filter((item) => item.category === name);
  return (
    <main>
      <div className="page-hero"><div className="shell"><div className="eyebrow">GLOBAL ISSUE DESK</div><h1>{name}</h1><p>{category.description}。当前收录 {items.length} 条演示资讯。</p></div></div>
      <section className="section shell"><NewsList items={items} /></section>
    </main>
  );
}
