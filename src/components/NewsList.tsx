import { NewsCard } from "@/components/NewsCard";
import type { NewsItem } from "@/lib/news";

export function NewsList({
  items,
  emptyText = "暂时没有符合条件的资讯。换个关键词或筛选条件试试。",
}: {
  items: NewsItem[];
  emptyText?: string;
}) {
  if (!items.length) {
    return (
      <div className="empty-state">
        <span>暂无结果</span>
        <p>{emptyText}</p>
      </div>
    );
  }
  return (
    <div className="news-grid">
      {items.map((item) => (
        <NewsCard item={item} key={item.slug} />
      ))}
    </div>
  );
}
