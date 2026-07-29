import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const description =
  "连接全球南方地区现场与全球议题，关注经济、金融、社会发展、地缘安全、气候环境与全球治理。";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: "全球南方观察 | Global South Monitor",
    template: "%s | 全球南方观察",
  },
  description,
  applicationName: "全球南方观察 Global South Monitor",
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.ico" },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "/",
    siteName: "全球南方观察 Global South Monitor",
    title: "全球南方观察 | Global South Monitor",
    description,
  },
  twitter: {
    card: "summary",
    title: "全球南方观察 | Global South Monitor",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const siteUrl = getSiteUrl().toString();
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "全球南方观察",
    alternateName: "Global South Monitor",
    url: siteUrl,
    description,
    inLanguage: "zh-CN",
    publisher: { "@id": `${siteUrl}#organization` },
  };
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}#organization`,
    name: "全球南方观察",
    alternateName: "Global South Monitor",
    url: siteUrl,
  };

  return (
    <html lang="zh-CN" data-scroll-behavior="smooth">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([websiteJsonLd, organizationJsonLd]).replace(/</g, "\\u003c"),
          }}
        />
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
