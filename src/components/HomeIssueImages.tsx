import Image from "next/image";
import Link from "next/link";
import { HOME_IMAGE_CREDITS } from "@/data/home-image-credits";

const issues = [
  { image: "mombasa-port", title: "贸易与基础设施", english: "TRADE & INFRASTRUCTURE", href: "/topics/geopolitics-security" },
  { image: "morocco-wind", title: "气候与能源", english: "CLIMATE & ENERGY", href: "/topics/climate" },
  { image: "vietnam-rice", title: "农业与粮食安全", english: "AGRICULTURE & FOOD", href: "/topics/agriculture-food-security" },
  { image: "jakarta-city", title: "城市化与产业发展", english: "CITIES & INDUSTRY", href: "/topics/technology-industry" },
] as const;

export function HomeIssueImages() {
  return (
    <section className="section home-image-issues">
      <div className="shell">
        <div className="section-heading">
          <div><span>KEY THEMES</span><h2>全球南方关键议题</h2></div>
          <p className="section-note">从港口、能源、农业与城市现场，进入持续更新的专题观察。</p>
        </div>
        <div className="home-image-grid">
          {issues.map((issue) => {
            const image = HOME_IMAGE_CREDITS.find((item) => item.id === issue.image)!;
            return <Link href={issue.href} className="home-image-card" key={issue.image}>
              <Image src={image.path} alt={image.alt} fill sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 25vw" />
              <span className="home-image-overlay" />
              <span className="home-image-copy"><small>{issue.english}</small><strong>{issue.title}</strong><em>进入议题 →</em></span>
            </Link>;
          })}
        </div>
      </div>
    </section>
  );
}
