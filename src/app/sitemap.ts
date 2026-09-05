import type { MetadataRoute } from "next";
import { getAllNews } from "@/lib/news";
import { CATEGORIES, REGIONS } from "@/lib/site";
import { absoluteUrl } from "@/lib/site-url";
import { COUNTRY_REGISTRY } from "@/lib/countries";

export default function sitemap(): MetadataRoute.Sitemap {
  const news = getAllNews();
  const staticPaths = ["", "/news", "/regions", "/topics", "/countries", "/weekly", "/about"];
  const countries = [...new Set(news.map((item) => item.country))];
  const mappedCountries = COUNTRY_REGISTRY.filter((country) => countries.includes(country.nameZh));
  const latestUpdate = news[0]?.updatedAt ?? new Date().toISOString().slice(0, 10);

  return [
    ...staticPaths.map((pathname) => ({
      url: absoluteUrl(pathname || "/"),
      lastModified: latestUpdate,
      changeFrequency: pathname === "" ? ("daily" as const) : ("weekly" as const),
      priority: pathname === "" ? 1 : 0.7,
    })),
    ...news.map((item) => ({
      url: absoluteUrl(`/news/${item.slug}`),
      lastModified: item.updatedAt,
      changeFrequency: "monthly" as const,
      priority: item.featured ? 0.8 : 0.6,
    })),
    ...REGIONS.map((item) => ({
      url: absoluteUrl(`/regions/${item.slug}`),
      lastModified: latestUpdate,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...CATEGORIES.map((item) => ({
      url: absoluteUrl(`/topics/${item.slug}`),
      lastModified: latestUpdate,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...countries.map((country) => ({
      url: absoluteUrl(`/countries/${encodeURIComponent(country)}`),
      lastModified: latestUpdate,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    ...mappedCountries.map((country) => ({
      url: absoluteUrl(`/country/${country.slug}`),
      lastModified: latestUpdate,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
