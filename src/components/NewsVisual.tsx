import { CATEGORIES } from "@/lib/site";
import { TopicIcon } from "@/components/TopicIcon";

export function NewsVisual({
  category,
  region,
  large = false,
}: {
  category: string;
  region: string;
  large?: boolean;
}) {
  const topic = CATEGORIES.find((item) => item.name === category) ?? CATEGORIES[0];
  return (
    <div
      className={`news-visual visual-${topic.slug} ${large ? "news-visual-large" : ""}`}
      aria-hidden="true"
    >
      <div className="visual-orbit" />
      <div className="visual-lines" />
      <span className="visual-icon"><TopicIcon name={topic.icon} size={large ? 46 : 30} /></span>
      <span className="visual-region">{region}</span>
    </div>
  );
}
