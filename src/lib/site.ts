import taxonomy from "../../config/content-taxonomy.json";

export const CATEGORIES = taxonomy.categories;
export const REGIONS = taxonomy.regions;
export const CONTENT_TYPES = taxonomy.contentTypes;
export const LANGUAGES = taxonomy.languages;
export const LEGACY_TOPIC_TO_CATEGORY: Record<string, string> =
  taxonomy.legacyTopicToCategory;

// 保留旧名称导出，避免已有组件或外部引用失效。
export const TOPICS = CATEGORIES;

export function categoryFromTopics(topics: string[] = []) {
  for (const topic of topics) {
    const category = LEGACY_TOPIC_TO_CATEGORY[topic];
    if (category) return category;
  }
  return "社会与发展";
}

export function regionMatches(regionName: string, value: string) {
  const region = REGIONS.find((item) => item.name === regionName);
  return region
    ? region.name === value || region.legacyNames.some((name) => name === value)
    : regionName === value;
}

export function normalizeRegion(value: string) {
  return REGIONS.find(
    (item) => item.name === value || item.legacyNames.some((name) => name === value),
  )?.name ?? value;
}

export function nameFromSlug(
  items: readonly { name: string; slug: string }[],
  slug: string,
) {
  return items.find((item) => item.slug === slug)?.name;
}

export function slugFromName(
  items: readonly { name: string; slug: string; legacyNames?: readonly string[] }[],
  name: string,
) {
  return items.find(
    (item) => item.name === name || item.legacyNames?.some((legacy) => legacy === name),
  )?.slug;
}
