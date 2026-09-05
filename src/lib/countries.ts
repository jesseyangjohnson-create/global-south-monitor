export type CountryRecord = {
  nameZh: string;
  nameEn: string;
  iso2: string;
  iso3: string;
  numericId?: string;
  slug: string;
  lat: number;
  lng: number;
  region: string;
};

export const COUNTRY_REGISTRY: readonly CountryRecord[] = [
  { nameZh: "阿根廷", nameEn: "Argentina", iso2: "AR", iso3: "ARG", numericId: "032", slug: "argentina", lat: -38.4, lng: -63.6, region: "拉丁美洲与加勒比" },
  { nameZh: "安哥拉", nameEn: "Angola", iso2: "AO", iso3: "AGO", numericId: "024", slug: "angola", lat: -11.2, lng: 17.9, region: "撒哈拉以南非洲" },
  { nameZh: "巴布亚新几内亚", nameEn: "Papua New Guinea", iso2: "PG", iso3: "PNG", numericId: "598", slug: "papua-new-guinea", lat: -6.3, lng: 143.9, region: "太平洋岛国" },
  { nameZh: "巴基斯坦", nameEn: "Pakistan", iso2: "PK", iso3: "PAK", numericId: "586", slug: "pakistan", lat: 30.4, lng: 69.3, region: "南亚" },
  { nameZh: "巴勒斯坦", nameEn: "Palestine", iso2: "PS", iso3: "PSE", numericId: "275", slug: "palestine", lat: 31.9, lng: 35.2, region: "中东与北非" },
  { nameZh: "巴西", nameEn: "Brazil", iso2: "BR", iso3: "BRA", numericId: "076", slug: "brazil", lat: -10.8, lng: -52.9, region: "拉丁美洲与加勒比" },
  { nameZh: "斐济", nameEn: "Fiji", iso2: "FJ", iso3: "FJI", numericId: "242", slug: "fiji", lat: -17.8, lng: 178.1, region: "太平洋岛国" },
  { nameZh: "刚果（布）", nameEn: "Republic of the Congo", iso2: "CG", iso3: "COG", numericId: "178", slug: "republic-of-the-congo", lat: -0.7, lng: 15.8, region: "撒哈拉以南非洲" },
  { nameZh: "哥伦比亚", nameEn: "Colombia", iso2: "CO", iso3: "COL", numericId: "170", slug: "colombia", lat: 4.6, lng: -74.3, region: "拉丁美洲与加勒比" },
  { nameZh: "哈萨克斯坦", nameEn: "Kazakhstan", iso2: "KZ", iso3: "KAZ", numericId: "398", slug: "kazakhstan", lat: 48.0, lng: 67.0, region: "中亚" },
  { nameZh: "吉尔吉斯斯坦", nameEn: "Kyrgyzstan", iso2: "KG", iso3: "KGZ", numericId: "417", slug: "kyrgyzstan", lat: 41.2, lng: 74.8, region: "中亚" },
  { nameZh: "加纳", nameEn: "Ghana", iso2: "GH", iso3: "GHA", numericId: "288", slug: "ghana", lat: 7.9, lng: -1.0, region: "撒哈拉以南非洲" },
  { nameZh: "喀麦隆", nameEn: "Cameroon", iso2: "CM", iso3: "CMR", numericId: "120", slug: "cameroon", lat: 5.7, lng: 12.7, region: "撒哈拉以南非洲" },
  { nameZh: "科特迪瓦", nameEn: "Cote d'Ivoire", iso2: "CI", iso3: "CIV", numericId: "384", slug: "cote-divoire", lat: 7.5, lng: -5.5, region: "撒哈拉以南非洲" },
  { nameZh: "肯尼亚", nameEn: "Kenya", iso2: "KE", iso3: "KEN", numericId: "404", slug: "kenya", lat: 0.2, lng: 37.9, region: "撒哈拉以南非洲" },
  { nameZh: "马拉维", nameEn: "Malawi", iso2: "MW", iso3: "MWI", numericId: "454", slug: "malawi", lat: -13.3, lng: 34.3, region: "撒哈拉以南非洲" },
  { nameZh: "毛里求斯", nameEn: "Mauritius", iso2: "MU", iso3: "MUS", numericId: "480", slug: "mauritius", lat: -20.3, lng: 57.6, region: "撒哈拉以南非洲" },
  { nameZh: "孟加拉国", nameEn: "Bangladesh", iso2: "BD", iso3: "BGD", numericId: "050", slug: "bangladesh", lat: 23.7, lng: 90.4, region: "南亚" },
  { nameZh: "秘鲁", nameEn: "Peru", iso2: "PE", iso3: "PER", numericId: "604", slug: "peru", lat: -9.2, lng: -75.0, region: "拉丁美洲与加勒比" },
  { nameZh: "缅甸", nameEn: "Myanmar", iso2: "MM", iso3: "MMR", numericId: "104", slug: "myanmar", lat: 21.9, lng: 96.0, region: "东南亚" },
  { nameZh: "摩洛哥", nameEn: "Morocco", iso2: "MA", iso3: "MAR", numericId: "504", slug: "morocco", lat: 31.8, lng: -7.1, region: "中东与北非" },
  { nameZh: "墨西哥", nameEn: "Mexico", iso2: "MX", iso3: "MEX", numericId: "484", slug: "mexico", lat: 23.6, lng: -102.5, region: "拉丁美洲与加勒比" },
  { nameZh: "南非", nameEn: "South Africa", iso2: "ZA", iso3: "ZAF", numericId: "710", slug: "south-africa", lat: -30.6, lng: 22.9, region: "撒哈拉以南非洲" },
  { nameZh: "尼泊尔", nameEn: "Nepal", iso2: "NP", iso3: "NPL", numericId: "524", slug: "nepal", lat: 28.4, lng: 84.1, region: "南亚" },
  { nameZh: "尼日利亚", nameEn: "Nigeria", iso2: "NG", iso3: "NGA", numericId: "566", slug: "nigeria", lat: 9.1, lng: 8.7, region: "撒哈拉以南非洲" },
  { nameZh: "帕劳", nameEn: "Palau", iso2: "PW", iso3: "PLW", numericId: "585", slug: "palau", lat: 7.5, lng: 134.6, region: "太平洋岛国" },
  { nameZh: "斯里兰卡", nameEn: "Sri Lanka", iso2: "LK", iso3: "LKA", numericId: "144", slug: "sri-lanka", lat: 7.9, lng: 80.8, region: "南亚" },
  { nameZh: "斯威士兰", nameEn: "Eswatini", iso2: "SZ", iso3: "SWZ", numericId: "748", slug: "eswatini", lat: -26.5, lng: 31.5, region: "撒哈拉以南非洲" },
  { nameZh: "塔吉克斯坦", nameEn: "Tajikistan", iso2: "TJ", iso3: "TJK", numericId: "762", slug: "tajikistan", lat: 38.9, lng: 71.0, region: "中亚" },
  { nameZh: "泰国", nameEn: "Thailand", iso2: "TH", iso3: "THA", numericId: "764", slug: "thailand", lat: 15.9, lng: 101.0, region: "东南亚" },
  { nameZh: "图瓦卢", nameEn: "Tuvalu", iso2: "TV", iso3: "TUV", numericId: "798", slug: "tuvalu", lat: -7.1, lng: 177.6, region: "太平洋岛国" },
  { nameZh: "瓦努阿图", nameEn: "Vanuatu", iso2: "VU", iso3: "VUT", numericId: "548", slug: "vanuatu", lat: -16.2, lng: 167.7, region: "太平洋岛国" },
  { nameZh: "委内瑞拉", nameEn: "Venezuela", iso2: "VE", iso3: "VEN", numericId: "862", slug: "venezuela", lat: 6.4, lng: -66.6, region: "拉丁美洲与加勒比" },
  { nameZh: "叙利亚", nameEn: "Syria", iso2: "SY", iso3: "SYR", numericId: "760", slug: "syria", lat: 35.0, lng: 38.5, region: "中东与北非" },
  { nameZh: "也门", nameEn: "Yemen", iso2: "YE", iso3: "YEM", numericId: "887", slug: "yemen", lat: 15.6, lng: 48.5, region: "中东与北非" },
  { nameZh: "印度", nameEn: "India", iso2: "IN", iso3: "IND", numericId: "356", slug: "india", lat: 22.8, lng: 79.0, region: "南亚" },
  { nameZh: "印度尼西亚", nameEn: "Indonesia", iso2: "ID", iso3: "IDN", numericId: "360", slug: "indonesia", lat: -2.5, lng: 118.0, region: "东南亚" },
  { nameZh: "约旦", nameEn: "Jordan", iso2: "JO", iso3: "JOR", numericId: "400", slug: "jordan", lat: 31.2, lng: 36.5, region: "中东与北非" },
  { nameZh: "越南", nameEn: "Vietnam", iso2: "VN", iso3: "VNM", numericId: "704", slug: "vietnam", lat: 15.9, lng: 107.8, region: "东南亚" },
  { nameZh: "赞比亚", nameEn: "Zambia", iso2: "ZM", iso3: "ZMB", numericId: "894", slug: "zambia", lat: -13.1, lng: 27.8, region: "撒哈拉以南非洲" },
  { nameZh: "中国", nameEn: "China", iso2: "CN", iso3: "CHN", numericId: "156", slug: "china", lat: 35.9, lng: 104.2, region: "东南亚" },
] as const;

const byName = new Map(COUNTRY_REGISTRY.map((country) => [country.nameZh, country]));
const bySlug = new Map(COUNTRY_REGISTRY.map((country) => [country.slug, country]));
const byNumericId = new Map(COUNTRY_REGISTRY.filter((country) => country.numericId).map((country) => [country.numericId, country]));

export const getCountryByName = (name: string) => byName.get(name);
export const getCountryBySlug = (slug: string) => bySlug.get(slug);
export const getCountryByNumericId = (id: string | number) => byNumericId.get(String(id).padStart(3, "0"));
