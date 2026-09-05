import { COUNTRY_REGISTRY, getCountryByName, type CountryRecord } from "@/lib/countries";
import { getAllNews, type NewsItem } from "@/lib/news";

export type GlobeArticle = Pick<NewsItem, "slug" | "title" | "date" | "category" | "country" | "region"> & {
  lat: number;
  lng: number;
};

export type GlobeCountry = CountryRecord & {
  newsCount: number;
  latestDate: string;
  articles: GlobeArticle[];
};

export type GlobeData = {
  countries: GlobeCountry[];
  points: GlobeArticle[];
  totalNews: number;
  mappedNews: number;
  latestDate: string;
  unmappedLabels: { label: string; count: number }[];
};

function spreadPoint(country: CountryRecord, index: number, total: number) {
  if (total === 1) return { lat: country.lat, lng: country.lng };
  const angle = index * 2.399963;
  const radius = 0.45 + Math.sqrt(index + 1) * 0.34;
  const lat = country.lat + Math.sin(angle) * radius;
  const lngScale = Math.max(0.35, Math.cos((country.lat * Math.PI) / 180));
  return { lat, lng: country.lng + (Math.cos(angle) * radius) / lngScale };
}

export function getGlobeData(): GlobeData {
  const news = getAllNews();
  const grouped = new Map<string, NewsItem[]>();
  const unmapped = new Map<string, number>();

  for (const item of news) {
    const country = getCountryByName(item.country);
    if (!country) {
      unmapped.set(item.country, (unmapped.get(item.country) ?? 0) + 1);
      continue;
    }
    const items = grouped.get(country.slug) ?? [];
    items.push(item);
    grouped.set(country.slug, items);
  }

  const countries = COUNTRY_REGISTRY.flatMap((country) => {
    const items = grouped.get(country.slug);
    if (!items?.length) return [];
    const articles = items.map((item, index) => ({
      slug: item.slug,
      title: item.title,
      date: item.date,
      category: item.category,
      country: item.country,
      region: item.region,
      ...spreadPoint(country, index, items.length),
    }));
    return [{ ...country, newsCount: items.length, latestDate: items[0].date, articles }];
  });

  return {
    countries,
    points: countries.flatMap((country) => country.articles),
    totalNews: news.length,
    mappedNews: countries.reduce((sum, country) => sum + country.newsCount, 0),
    latestDate: news[0]?.date ?? "",
    unmappedLabels: [...unmapped].map(([label, count]) => ({ label, count })).sort((a, b) => b.count - a.count),
  };
}
