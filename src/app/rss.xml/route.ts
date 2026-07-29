import { getAllNews } from "@/lib/news";
import { absoluteUrl, getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const items = getAllNews()
    .map(
      (item) => `<item>
  <title>${escapeXml(item.title)}</title>
  <link>${escapeXml(absoluteUrl(`/news/${item.slug}`))}</link>
  <guid isPermaLink="true">${escapeXml(absoluteUrl(`/news/${item.slug}`))}</guid>
  <description>${escapeXml(item.summary)}</description>
  <pubDate>${new Date(`${item.date}T00:00:00Z`).toUTCString()}</pubDate>
  <category>${escapeXml(item.category)}</category>
</item>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>全球南方观察 Global South Monitor</title>
  <link>${escapeXml(getSiteUrl().toString())}</link>
  <description>全球南方、国际发展与区域经济资讯</description>
  <language>zh-CN</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
