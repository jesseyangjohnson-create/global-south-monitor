"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Component, useEffect, useRef, useState, type ErrorInfo, type ReactNode } from "react";
import type { GlobeData } from "@/lib/globe-data";

const REGIONS = ["全部", "撒哈拉以南非洲", "中东与北非", "拉丁美洲与加勒比", "南亚", "东南亚", "中亚", "太平洋岛国"];
const NewsGlobe = dynamic(() => import("@/components/NewsGlobe").then((module) => module.NewsGlobe), {
  ssr: false,
  loading: () => <div className="globe-placeholder">正在载入交互地球...</div>,
});

class GlobeBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error("Globe rendering failed", error, info); }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

function CountryDirectory({ data }: { data: GlobeData }) {
  return (
    <div className="globe-country-list" aria-label="已覆盖国家列表">
      {data.countries.map((country) => (
        <Link href={`/country/${country.slug}`} key={country.slug}>
          <span><strong>{country.nameZh}</strong><small>{country.nameEn}</small></span>
          <b>{country.newsCount}</b>
        </Link>
      ))}
    </div>
  );
}

export function NewsGlobeSection({ data }: { data: GlobeData }) {
  const [activeRegion, setActiveRegion] = useState("全部");
  const [isNearViewport, setIsNearViewport] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsNearViewport(true);
        observer.disconnect();
      }
    }, { rootMargin: "300px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section globe-section" id="global-south-atlas" ref={sectionRef}>
      <div className="shell globe-layout">
        <div className="globe-copy">
          <div className="eyebrow">GLOBAL SOUTH ATLAS</div>
          <h2>全球南方观察地图</h2>
          <p>从地理空间探索全球南方的发展、金融、气候、能源与中国合作动态。</p>
          <dl className="globe-stats">
            <div><dt>已覆盖国家</dt><dd>{data.countries.length}</dd></div>
            <div><dt>资讯</dt><dd>{data.totalNews}</dd></div>
            <div><dt>地区</dt><dd>{REGIONS.length - 1}</dd></div>
            <div><dt>最新更新</dt><dd>{data.latestDate.replaceAll("-", "/")}</dd></div>
          </dl>
          <div className="globe-filters" aria-label="按地区筛选地图">
            {REGIONS.map((region) => (
              <button type="button" className={activeRegion === region ? "active" : ""} aria-pressed={activeRegion === region} onClick={() => setActiveRegion(region)} key={region}>{region}</button>
            ))}
          </div>
          <details className="globe-directory"><summary>按国家浏览全部资讯</summary><CountryDirectory data={data} /></details>
        </div>
        <div className="globe-stage">
          <GlobeBoundary fallback={<CountryDirectory data={data} />}>
            {isNearViewport ? <NewsGlobe countries={data.countries} points={data.points} activeRegion={activeRegion} /> : <div className="globe-placeholder">新闻地图将在进入视野时载入</div>}
          </GlobeBoundary>
          <p className="globe-instruction">拖动旋转 · 滚轮缩放 · 点击国家或新闻点浏览</p>
        </div>
      </div>
    </section>
  );
}
