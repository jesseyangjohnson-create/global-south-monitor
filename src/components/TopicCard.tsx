import Link from "next/link";
import { TopicIcon } from "@/components/TopicIcon";
import Image from "next/image";
import { THEME_IMAGE_BY_CATEGORY } from "@/data/home-image-credits";

export function TopicCard({
  topic,
  count,
}: {
  topic: { name: string; slug: string; icon: string; description: string };
  count: number;
}) {
  const image = THEME_IMAGE_BY_CATEGORY[topic.name];
  return (
    <Link className={`topic-card topic-card-${topic.slug}`} href={`/topics/${topic.slug}`}>
      {image && <Image className="topic-card-image" src={image.path} alt={image.alt} fill sizes="(max-width: 560px) 100vw, (max-width: 1050px) 50vw, 25vw" />}
      <span className="topic-visual" aria-hidden="true" />
      <span className="topic-photo-overlay" aria-hidden="true" />
      <div className="topic-icon"><TopicIcon name={topic.icon} /></div>
      <div className="topic-card-count">{String(count).padStart(2, "0")} <span>条资讯</span></div>
      <h3>{topic.name}</h3>
      <p>{topic.description}</p>
      <span className="topic-action">进入专题 →</span>
    </Link>
  );
}
