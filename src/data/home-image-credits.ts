export type HomeImageCredit = {
  id: string;
  path: string;
  category?: string;
  photographer: string;
  sourcePage: string;
  license: string;
  alt: string;
  objectPosition?: string;
  usageCaution?: string;
};

export const HOME_IMAGE_CREDITS: readonly HomeImageCredit[] = [
  { id: "home-global-issues-singapore", path: "/images/home/home-global-issues-singapore.webp", photographer: "NIR HIMI", sourcePage: "https://unsplash.com/photos/an-aerial-view-of-singapores-skyline-7XIiNxeJ4nI", license: "Unsplash License", alt: "新加坡滨海城市、港湾与船舶的航拍景观", objectPosition: "center" },
  { id: "home-global-south-jakarta", path: "/images/home/home-global-south-jakarta.webp", photographer: "Affan Fadhlan", sourcePage: "https://unsplash.com/photos/a-view-of-a-city-from-a-distance-ION9_iEUQyo", license: "Unsplash License", alt: "印度尼西亚雅加达现代城市天际线", objectPosition: "center 42%" },
  { id: "theme-economy-hong-kong", category: "经济", path: "/images/themes/theme-economy-hong-kong.webp", photographer: "Jimmy Whitson", sourcePage: "https://unsplash.com/photos/modern-skyscrapers-in-a-city-skyline-NnaM0vQCUGs", license: "Unsplash License", alt: "香港中环现代高层建筑与金融区城市景观" },
  { id: "theme-finance-market-screen", category: "金融", path: "/images/themes/theme-finance-market-screen.webp", photographer: "Daniel Brzdęk", sourcePage: "https://unsplash.com/photos/financial-stock-market-data-displayed-on-a-screen-EuIqk6LpUU0", license: "Unsplash License", alt: "显示全球金融市场数据的交易屏幕" },
  { id: "theme-social-development-ghana-classroom", category: "社会与发展", path: "/images/themes/theme-social-development-ghana-classroom.webp", photographer: "David Geneugelijk", sourcePage: "https://unsplash.com/photos/a-teacher-instructs-students-in-a-classroom-CXa6E3krENE", license: "Unsplash License", alt: "加纳阿克拉一间课堂中的教学场景", usageCaution: "仅作为教育与发展主题视觉，不指称图中人物参与任何具体新闻事件。" },
  { id: "theme-geopolitics-border-checkpoint", category: "地缘与安全", path: "/images/themes/theme-geopolitics-border-checkpoint.webp", photographer: "wang binghua", sourcePage: "https://unsplash.com/photos/trucks-are-passing-through-a-border-checkpoint-YDvITwNHT3w", license: "Unsplash License", alt: "货运卡车通过边境检查站" },
  { id: "theme-global-governance-un", category: "全球治理", path: "/images/themes/theme-global-governance-un.webp", photographer: "Maxim Klimashin", sourcePage: "https://unsplash.com/photos/united-nations-headquarters-building-with-flags-flying-j4Wc_Ezq7OE", license: "Unsplash License", alt: "联合国总部大楼与成员国旗帜", usageCaution: "仅作全球治理主题视觉，不暗示联合国对本站或内容有背书。" },
  { id: "theme-agriculture-vietnam-rice", category: "农业与粮食安全", path: "/images/themes/theme-agriculture-vietnam-rice.webp", photographer: "Tom De Decker", sourcePage: "https://unsplash.com/photos/rice-terraces-cascade-down-a-lush-green-valley-LrprN_omc7s", license: "Unsplash License", alt: "越南木江界山谷中的绿色梯田" },
  { id: "theme-tech-industry-robotics", category: "科技与产业", path: "/images/themes/theme-tech-industry-robotics.webp", photographer: "Lilian Do Khac", sourcePage: "https://unsplash.com/photos/robotic-arms-assembling-a-car-chassis-on-a-factory-line-EyqUxJuOb1Q", license: "Unsplash License", alt: "汽车生产线上多台工业机器人协同装配车身" },
  { id: "theme-china-global-south-guangzhou-port", category: "中国与全球南方", path: "/images/themes/theme-china-global-south-guangzhou-port.webp", photographer: "Zheng XUE", sourcePage: "https://unsplash.com/photos/traditional-chinese-building-overlooking-a-busy-harbor-SoAe5dQiQ4c", license: "Unsplash License", alt: "广州南沙港区水域、货船与中国传统建筑屋檐" },
  { id: "theme-climate-kolkata-flood", category: "气候问题", path: "/images/themes/theme-climate-kolkata-flood.webp", photographer: "Dibakar Roy", sourcePage: "https://unsplash.com/photos/people-walking-in-a-flooded-street-KbG3OsDKkCM", license: "Unsplash License", alt: "印度加尔各答季风期间被洪水淹没的城市街道", usageCaution: "仅作极端天气主题视觉，不声称图示事件由气候变化造成。" },
  { id: "theme-energy-renewables", category: "能源问题", path: "/images/themes/theme-energy-renewables.webp", photographer: "Bernd Dittrich", sourcePage: "https://unsplash.com/photos/wind-turbines-and-solar-panels-in-a-rural-landscape-tlxsnnsfCh4", license: "Unsplash License", alt: "乡村景观中的风力发电机与光伏电站" },
];

export const THEME_IMAGE_BY_CATEGORY = Object.fromEntries(
  HOME_IMAGE_CREDITS.filter((image) => image.category).map((image) => [image.category, image]),
) as Record<string, HomeImageCredit>;
