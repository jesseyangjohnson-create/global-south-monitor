"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Globe, { type GlobeMethods } from "react-globe.gl";
import { feature } from "topojson-client";
import countriesTopology from "world-atlas/countries-110m.json";
import type { GlobeArticle, GlobeCountry } from "@/lib/globe-data";

type PolygonFeature = {
  id?: string | number;
  properties?: { name?: string };
  geometry: { type: string; coordinates: number[] };
};

export function NewsGlobe({ countries, points, activeRegion }: { countries: GlobeCountry[]; points: GlobeArticle[]; activeRegion: string }) {
  const router = useRouter();
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 680, height: 620 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const countryById = useMemo(() => new Map(countries.map((country) => [country.numericId, country])), [countries]);
  const polygons = useMemo(() => {
    const object = (countriesTopology.objects as { countries: object }).countries;
    return (feature(countriesTopology as never, object as never) as unknown as { features: PolygonFeature[] }).features;
  }, []);
  const visiblePoints = activeRegion === "全部" ? points : points.filter((point) => point.region === activeRegion);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const updateSize = () => {
      const width = node.clientWidth;
      setSize({ width, height: Math.min(650, Math.max(390, width * 0.88)) });
    };
    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!ready || !globeRef.current) return;
    const globe = globeRef.current;
    const controls = globe.controls();
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 150;
    controls.maxDistance = 360;
    controls.autoRotateSpeed = 0.34;
    controls.autoRotate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const stopRotation = () => { controls.autoRotate = false; };
    controls.addEventListener("start", stopRotation);
    return () => controls.removeEventListener("start", stopRotation);
  }, [ready]);

  useEffect(() => {
    if (!ready || !globeRef.current || activeRegion === "全部") return;
    const targets: Record<string, { lat: number; lng: number; altitude: number }> = {
      "撒哈拉以南非洲": { lat: -3, lng: 24, altitude: 1.75 },
      "中东与北非": { lat: 26, lng: 29, altitude: 1.75 },
      "拉丁美洲与加勒比": { lat: -12, lng: -67, altitude: 1.8 },
      "南亚": { lat: 22, lng: 79, altitude: 1.65 },
      "东南亚": { lat: 8, lng: 110, altitude: 1.7 },
      "中亚": { lat: 43, lng: 68, altitude: 1.65 },
      "太平洋岛国": { lat: -10, lng: 165, altitude: 1.9 },
    };
    globeRef.current.pointOfView(targets[activeRegion], 900);
  }, [activeRegion, ready]);

  const countryForPolygon = (polygon: object) => {
    const id = (polygon as PolygonFeature).id;
    return id === undefined ? undefined : countryById.get(String(id).padStart(3, "0"));
  };

  return (
    <div className="globe-canvas" ref={containerRef} aria-label="可拖动的全球南方新闻三维地球">
      <Globe
        ref={globeRef}
        width={size.width}
        height={size.height}
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere
        atmosphereColor="#6aa897"
        atmosphereAltitude={0.13}
        globeImageUrl={null}
        showGraticules
        polygonsData={polygons}
        polygonAltitude={(polygon) => countryForPolygon(polygon) ? 0.012 : 0.004}
        polygonCapColor={(polygon) => {
          const country = countryForPolygon(polygon);
          if (!country) return "rgba(70, 96, 103, 0.22)";
          const active = activeRegion === "全部" || country.region === activeRegion;
          if (!active) return "rgba(70, 96, 103, 0.3)";
          return hoveredId === country.numericId ? "rgba(222, 170, 96, 0.92)" : "rgba(50, 154, 127, 0.78)";
        }}
        polygonSideColor={() => "rgba(7, 28, 45, 0.35)"}
        polygonStrokeColor={() => "rgba(221, 236, 232, 0.42)"}
        polygonLabel={(polygon) => {
          const country = countryForPolygon(polygon);
          return country ? `<div class="globe-tooltip"><strong>${country.nameZh}</strong><span>${country.nameEn}</span><span>${country.newsCount} 条资讯 · 最新 ${country.latestDate}</span></div>` : "";
        }}
        onPolygonHover={(polygon) => setHoveredId(polygon ? countryForPolygon(polygon)?.numericId ?? null : null)}
        onPolygonClick={(polygon) => {
          const country = countryForPolygon(polygon);
          if (country) router.push(`/country/${country.slug}`);
        }}
        pointsData={visiblePoints}
        pointLat={(point) => (point as GlobeArticle).lat}
        pointLng={(point) => (point as GlobeArticle).lng}
        pointAltitude={0.035}
        pointRadius={(point) => (point as GlobeArticle).date === points[0]?.date ? 0.26 : 0.18}
        pointColor={() => "#f2b967"}
        pointResolution={8}
        pointsTransitionDuration={350}
        pointLabel={(point) => {
          const article = point as GlobeArticle;
          return `<div class="globe-tooltip"><strong>${article.title}</strong><span>${article.date} · ${article.category}</span><span>${article.country}</span></div>`;
        }}
        onPointClick={(point) => router.push(`/news/${(point as GlobeArticle).slug}`)}
        onGlobeReady={() => {
          setReady(true);
          globeRef.current?.pointOfView({ lat: 14, lng: 58, altitude: 2.05 }, 0);
        }}
      />
      {!ready && <div className="globe-loading">正在载入新闻地图...</div>}
    </div>
  );
}
