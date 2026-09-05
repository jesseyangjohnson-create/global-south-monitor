export type HomeImageCredit = {
  id: string;
  path: string;
  title: string;
  location: string;
  author: string;
  license: string;
  sourcePage: string;
  alt: string;
};

export const HOME_IMAGE_CREDITS: readonly HomeImageCredit[] = [
  { id: "hero-sao-paulo", path: "/images/home/hero-sao-paulo.webp", title: "São Paulo Brazil Skyline Aerial, December 2024", location: "São Paulo, Brazil", author: "Spicypepper999", license: "CC0 1.0", sourcePage: "https://commons.wikimedia.org/wiki/File:Sao_Paulo_Brazil_Skyline_Aerial,_December_2024.jpg", alt: "巴西圣保罗城市天际线航拍" },
  { id: "jakarta-city", path: "/images/home/jakarta-city.webp", title: "Jakarta Skyline from Semanggi", location: "Jakarta, Indonesia", author: "Nasarapa", license: "CC0 1.0", sourcePage: "https://commons.wikimedia.org/wiki/File:Jakarta_Skyline_from_Semanggi.jpg", alt: "印度尼西亚雅加达城市天际线" },
  { id: "morocco-wind", path: "/images/home/morocco-wind.webp", title: "Nabralift tower in a wind farm in Morocco", location: "Morocco", author: "Miguel Turullols", license: "CC0 1.0", sourcePage: "https://commons.wikimedia.org/wiki/File:Nabralift_tower_in_a_wind_farm_in_Morocco.jpg", alt: "摩洛哥风电场与风力发电机" },
  { id: "mombasa-port", path: "/images/home/mombasa-port.webp", title: "Mombasa port in Kenya", location: "Mombasa, Kenya", author: "USAID in Africa", license: "Public domain (U.S. Government / USAID)", sourcePage: "https://commons.wikimedia.org/wiki/File:Mombasa_port_in_Kenya_(8329577391).png", alt: "肯尼亚蒙巴萨港口与货运设施" },
  { id: "vietnam-rice", path: "/images/home/vietnam-rice.webp", title: "Rice terraces in Vietnam", location: "Sapa, Vietnam", author: "Eerin25", license: "CC0 1.0", sourcePage: "https://commons.wikimedia.org/wiki/File:Rice_terraces_in_Vietnam.jpg", alt: "越南沙巴山地梯田景观" },
  { id: "solar-panels", path: "/images/home/solar-panels.webp", title: "Solar panels-5", location: "Renewable energy", author: "Wikideas1", license: "CC0 1.0", sourcePage: "https://commons.wikimedia.org/wiki/File:Solar_panels-5.jpg", alt: "成排安装的太阳能光伏板" },
];
