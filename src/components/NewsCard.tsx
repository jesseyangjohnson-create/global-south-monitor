import Link from "next/link";
import { formatDate, type NewsItem } from "@/lib/news";
import { CATEGORIES, REGIONS, slugFromName } from "@/lib/site";
import { NewsVisual } from "@/components/NewsVisual";

export function NewsCard({
  item,
  compact = false,
}: {
  item: NewsItem;
  compact?: boolean;
}) {
  const regionSlug = slugFromName(REGIONS, item.region);
  const categorySlug = slugFromName(CATEGORIES, item.category);
  return (
    <article className={`news-card ${compact ? "news-card-compact" : ""}`}>
      {!compact && <NewsVisual category={item.category} region={item.region} />}
      <div className="news-card-body">
        <div className="card-kicker">
          {categorySlug ? <Link href={`/topics/${categorySlug}`}>{item.category}</Link> : item.category}
          <span>{formatDate(item.date)}</span>
        </div>
        <h3><Link href={`/news/${item.slug}`}>{item.title}</Link></h3>
        {!compact && <p>{item.summary}</p>}
        <div className="card-meta">
          <span>{regionSlug ? <Link href={`/regions/${regionSlug}`}>{item.country} · {item.region}</Link> : item.country}</span>
          <span>来源：{item.source}</span>
        </div>
        <div className="card-bottom">
          <div className="tag-row">
            {item.topics.slice(0, 2).map((topic) => <span key={topic}>{topic}</span>)}
          </div>
          <Link className="read-link" href={`/news/${item.slug}`} aria-label={`阅读：${item.title}`}>阅读 →</Link>
        </div>
      </div>
    </article>
  );
}
