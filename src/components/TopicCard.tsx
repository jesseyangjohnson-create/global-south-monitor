import Link from "next/link";
import { TopicIcon } from "@/components/TopicIcon";

export function TopicCard({
  topic,
  count,
}: {
  topic: { name: string; slug: string; icon: string; description: string };
  count: number;
}) {
  return (
    <Link className={`topic-card topic-card-${topic.slug}`} href={`/topics/${topic.slug}`}>
      <span className="topic-visual" aria-hidden="true" />
      <div className="topic-icon"><TopicIcon name={topic.icon} /></div>
      <div className="topic-card-count">{String(count).padStart(2, "0")} <span>条资讯</span></div>
      <h3>{topic.name}</h3>
      <p>{topic.description}</p>
      <span className="topic-action">进入专题 →</span>
    </Link>
  );
}
