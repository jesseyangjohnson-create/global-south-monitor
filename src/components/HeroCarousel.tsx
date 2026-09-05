"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { NewsItem } from "@/lib/news";
import { CATEGORIES } from "@/lib/site";
import { NewsVisual } from "@/components/NewsVisual";
import { TopicIcon } from "@/components/TopicIcon";
import { WorldMapGraphic } from "@/components/WorldMapGraphic";
import Image from "next/image";
import { HOME_IMAGE_CREDITS } from "@/data/home-image-credits";

function displayDate(date: string) {
  return date.replaceAll("-", ".");
}

export function HeroCarousel({ featured }: { featured: NewsItem }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStart = useRef<number | null>(null);
  const slideCount = 3;
  const globalIssuesImage = HOME_IMAGE_CREDITS.find((image) => image.id === "home-global-issues-singapore")!;
  const globalSouthImage = HOME_IMAGE_CREDITS.find((image) => image.id === "home-global-south-jakarta")!;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setTimeout(
      () => setActive((current) => (current + 1) % slideCount),
      6000,
    );
    return () => window.clearTimeout(timer);
  }, [active, paused, reducedMotion]);

  const goTo = (index: number) => setActive((index + slideCount) % slideCount);

  return (
    <section
      className="hero-carousel"
      aria-roledescription="轮播"
      aria-label="首页热点"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const distance = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current;
        if (Math.abs(distance) > 45) goTo(active + (distance < 0 ? 1 : -1));
        touchStart.current = null;
      }}
    >
      <div className={`hero-slide hero-brand-slide ${active === 0 ? "is-active" : ""}`} aria-hidden={active !== 0}>
        <div className="hero-brand-photo"><Image src={globalSouthImage.path} alt={globalSouthImage.alt} fill priority sizes="100vw" style={{ objectPosition: globalSouthImage.objectPosition }} /></div>
        <div className="hero-map-wrap"><WorldMapGraphic /></div>
        <div className="shell hero-content">
          <div className="eyebrow">GLOBAL SOUTH MONITOR</div>
          <h1>全球南方观察</h1>
          <div className="hero-en">Global South Monitor</div>
          <p>连接全球南方的地区现场、发展议题与国际经济脉络。</p>
          <div className="hero-actions">
            <Link className="button button-light" href="/news">浏览最新资讯</Link>
            <Link className="button button-ghost" href="/topics">探索全球议题</Link>
          </div>
        </div>
      </div>

      <div className={`hero-slide hero-news-slide ${active === 1 ? "is-active" : ""}`} aria-hidden={active !== 1}>
        <div className="hero-news-visual">{featured.image ? <Image src={featured.image} alt="" fill priority sizes="100vw" /> : <NewsVisual category={featured.category} region={featured.region} large />}</div>
        <div className="shell hero-content hero-news-content">
          <div className="hero-news-copy">
            <div className="eyebrow">FEATURED BRIEF · {featured.region}</div>
            <h2>{featured.title}</h2>
            <p>{featured.summary}</p>
            <div className="hero-meta">
              <span>{featured.country}</span><span>{featured.category}</span><span>{displayDate(featured.date)}</span>
            </div>
            <Link className="button button-light" href={`/news/${featured.slug}`}>阅读全文</Link>
          </div>
        </div>
      </div>

      <div className={`hero-slide hero-issues-slide ${active === 2 ? "is-active" : ""}`} aria-hidden={active !== 2}>
        <div className="hero-issues-photo"><Image src={globalIssuesImage.path} alt={globalIssuesImage.alt} fill sizes="100vw" style={{ objectPosition: globalIssuesImage.objectPosition }} /></div>
        <div className="issue-data-field" aria-hidden="true" />
        <div className="shell hero-content">
          <div className="eyebrow">ISSUES THAT SHAPE OUR WORLD</div>
          <h2>追踪塑造未来的全球议题</h2>
          <div className="hero-issue-grid">
            {CATEGORIES.map((category) => (
              <Link href={`/topics/${category.slug}`} key={category.slug}>
                <TopicIcon name={category.icon} size={24} />
                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <button className="carousel-arrow carousel-prev" type="button" aria-label="上一张" onClick={() => goTo(active - 1)}>←</button>
      <button className="carousel-arrow carousel-next" type="button" aria-label="下一张" onClick={() => goTo(active + 1)}>→</button>
      <div className="carousel-status" aria-label={`当前第 ${active + 1} 张，共 ${slideCount} 张`}>
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            className={active === index ? "active" : ""}
            type="button"
            aria-label={`切换到第 ${index + 1} 张`}
            aria-current={active === index ? "true" : undefined}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
      <a className="scroll-cue" href="#today" aria-label="向下浏览">
        <span>SCROLL</span><i />
      </a>
    </section>
  );
}
