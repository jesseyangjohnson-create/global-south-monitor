import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://global-south-monitor.vercel.app"),
  title: {
    default: "全球南方观察 | Global South Monitor",
    template: "%s | 全球南方观察",
  },
  description:
    "连接全球南方地区现场与全球议题，关注经济、金融、社会发展、地缘安全、气候环境与全球治理。",
  applicationName: "全球南方观察 Global South Monitor",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "/",
    siteName: "全球南方观察 Global South Monitor",
    title: "全球南方观察 | Global South Monitor",
    description:
      "连接全球南方地区现场与全球议题，关注经济、金融、社会发展、地缘安全、气候环境与全球治理。",
  },
  twitter: {
    card: "summary",
    title: "全球南方观察 | Global South Monitor",
    description:
      "连接全球南方地区现场与全球议题，关注经济、金融、社会发展、地缘安全、气候环境与全球治理。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" data-scroll-behavior="smooth">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
