import Link from "next/link";
import { HeroCarousel } from "@/components/HeroCarousel";
import { NewsCard } from "@/components/NewsCard";
import { NewsVisual } from "@/components/NewsVisual";
import { RegionCard } from "@/components/RegionCard";
import { Reveal } from "@/components/Reveal";
import { TopicCard } from "@/components/TopicCard";
import { formatDate, getAllNews } from "@/lib/news";
import { CATEGORIES, REGIONS } from "@/lib/site";

export default function Home() {
  const news = getAllNews();
  const featured = news.find((item) => item.featured) ?? news[0];
  const secondary = news.filter((item) => item.slug !== featured.slug).slice(0, 3);
  const latest = news.slice(0, 8);

  return (
    <main className="home-page">
      <HeroCarousel featured={featured} />

      <section className="section shell" id="today">
        <Reveal>
          <div className="section-heading">
            <div><span>EDITOR&apos;S PICKS</span><h2>今日热点</h2></div>
            <Link className="section-link" href="/news">查看全部资讯 →</Link>
          </div>
        </Reveal>
        <div className="spotlight-grid">
          <Reveal className="spotlight-main">
            <article>
              <NewsVisual category={featured.category} region={featured.region} large />
              <div className="spotlight-overlay">
                <div className="spotlight-meta">{featured.category} · {featured.country} · {formatDate(featured.date)}</div>
                <h2><Link href={`/news/${featured.slug}`}>{featured.title}</Link></h2>
                <p>{featured.summary}</p>
                <Link className="button button-light" href={`/news/${featured.slug}`}>阅读焦点</Link>
              </div>
            </article>
          </Reveal>
          <div className="spotlight-side">
            {secondary.map((item, index) => (
              <Reveal delay={index * 90} key={item.slug}>
                <NewsCard item={item} compact />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tint">
        <div className="shell">
          <Reveal>
            <div className="section-heading">
              <div><span>LATEST UPDATES</span><h2>最新资讯</h2></div>
              <p className="section-note">来自七个重点地区的最新发展观察</p>
            </div>
          </Reveal>
          <div className="news-grid news-grid-four">
            {latest.map((item, index) => (
              <Reveal delay={(index % 4) * 70} key={item.slug}>
                <NewsCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell">
        <Reveal>
          <div className="section-heading">
            <div><span>CORE ISSUES</span><h2>核心议题</h2></div>
            <p className="section-note">用更清晰的一级分类连接复杂世界</p>
          </div>
        </Reveal>
        <div className="topic-grid">
          {CATEGORIES.map((topic, index) => (
            <Reveal delay={(index % 4) * 65} key={topic.slug}>
              <TopicCard topic={topic} count={news.filter((item) => item.category === topic.name).length} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section regions-section">
        <div className="shell">
          <Reveal>
            <div className="section-heading light-heading">
              <div><span>GLOBAL REGIONS</span><h2>从地区理解全球南方</h2></div>
              <Link className="section-link" href="/regions">浏览全部地区 →</Link>
            </div>
          </Reveal>
          <div className="regions-grid">
            {REGIONS.map((region, index) => (
              <Reveal delay={(index % 3) * 70} key={region.slug}>
                <RegionCard region={region} count={news.filter((item) => item.region === region.name).length} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell">
        <Reveal>
          <div className="weekly-feature">
            <div className="weekly-number">07</div>
            <div className="weekly-copy">
              <span>WEEKLY WATCH · 本周观察</span>
              <h2>发展融资、产业链与气候适应：本周值得串联阅读的三条线索</h2>
              <p>从跨地区资讯中提取共同变量，以一组简短导读建立议题之间的联系。</p>
              <Link className="button button-dark" href="/weekly">阅读本周观察</Link>
            </div>
            <div className="weekly-list">
              {latest.slice(0, 3).map((item, index) => (
                <Link href={`/news/${item.slug}`} key={item.slug}>
                  <span>0{index + 1}</span>{item.title}
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section about-strip">
        <Reveal className="shell about-strip-inner">
          <div><span className="eyebrow">ABOUT THE MONITOR</span><h2>在新闻速度与研究深度之间，提供清晰的中文观察入口。</h2></div>
          <div><p>全球南方观察关注国际发展、区域经济及全球治理。当前版本全部使用本地演示内容，用于验证分类、阅读与检索体验。</p><Link className="section-link" href="/about">了解我们的方法 →</Link></div>
        </Reveal>
      </section>
    </main>
  );
}
