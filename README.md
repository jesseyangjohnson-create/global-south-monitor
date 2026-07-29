# 全球南方观察 Global South Monitor

[![在线访问](https://img.shields.io/badge/在线访问-global--south--monitor.vercel.app-146351)](https://global-south-monitor.vercel.app/)

面向中文读者的全球南方新闻与研究资讯网站，定位为“国际发展智库网站 + 全球新闻资讯平台”。网站通过地区、国家和议题组织内容，关注国际发展、区域经济与全球治理。

> 仓库保留 12 条历史测试内容，但读取层会将其排除；公开页面、搜索、RSS 和站点地图只展示正式资讯。

## 在线访问

正式网站：[https://global-south-monitor.vercel.app/](https://global-south-monitor.vercel.app/)

线上版本由 Vercel 托管。当前网站没有自动新闻抓取、AI 自动摘要、数据库、后台管理或用户系统，内容由编辑人工核验、录入和发布。

公开订阅与搜索入口：

- RSS：[https://global-south-monitor.vercel.app/rss.xml](https://global-south-monitor.vercel.app/rss.xml)
- Sitemap：[https://global-south-monitor.vercel.app/sitemap.xml](https://global-south-monitor.vercel.app/sitemap.xml)

## 当前功能

- 首页热点轮播、今日热点、最新资讯、核心议题、全球地区和每周观察
- 关键词搜索以及地区、一级议题筛选
- 新闻详情、来源链接、地区 → 国家 → 国家新闻层级
- 八个一级议题、七个地区和旧标签兼容映射
- 本地 Markdown 内容与规范化 front matter
- 交互式本地录入工具和阻断式内容质量检查
- 响应式布局、减少动画设置和本地 SVG 视觉资源
- canonical、Open Graph、Twitter Card、JSON-LD、RSS、sitemap、robots 和 404 页面
- Vercel Web Analytics 基础组件（需在项目后台启用）
- GitHub Actions 自动验收、Dependabot 和 Issue 模板

当前版本**没有**自动抓取、实时资讯、AI 摘要、数据库、登录、后台管理、自动发布或交互式 GIS 地图。

## 技术栈

- Next.js 16（App Router）、React 19、TypeScript、Tailwind CSS 4
- `gray-matter` 与 `react-markdown`
- `@vercel/analytics`
- npm 锁文件用于 CI 和部署；本地也可使用 pnpm

项目不需要 API 密钥或付费服务。

## 本地运行与构建

建议使用 Node.js 20.9 或更高版本。

```bash
npm ci
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)。

完整验收：

```bash
npm run content:check
npm run lint
npm run typecheck
npm run build
```

生产模式本地运行：

```bash
npm run start
```

复制 `.env.example` 为本地环境文件，并把 `NEXT_PUBLIC_SITE_URL` 设置为实际站点地址。`.env*`（除示例文件外）不会被提交。

## 项目目录

```text
global-south-monitor/
├── .github/                   # CI、Dependabot、Issue 模板
├── config/
│   └── content-taxonomy.json # 页面和工具共用的分类配置
├── content/news/             # 独立 Markdown 新闻
├── data/sources.yml          # 人工维护的来源登记表
├── docs/                     # 来源、编辑、纠错与运营规范
├── scripts/
│   ├── add-news.mjs          # 交互式录入
│   ├── content-check.mjs     # 内容质量检查
│   └── migrate-news.mjs      # 旧内容一次性迁移
├── src/app/                  # 页面、metadata、RSS、sitemap、robots
├── src/components/           # 导航、轮播、卡片和 SVG 组件
└── src/lib/                  # 新闻读取、分类和站点 URL
```

主要路由包括 `/`、`/news`、`/news/[slug]`、`/topics`、`/regions`、`/countries`、`/weekly` 和 `/about`。

## 新闻数据格式

每条新闻是 `content/news/` 中的独立 `.md` 文件：

```yaml
---
title: "示例标题"
slug: "2026-07-29-a1b2c3d4e5"
date: "2026-07-29"
country: "示例国家"
region: "撒哈拉以南非洲"
category: "金融"
tags:
  - "债务"
  - "发展融资"
source: "来源名称"
sourceUrl: "https://example.com/original"
summary: "60—250字摘要；录入工具建议保持在100—200字，并准确交代内容范围、来源与必要背景。"
featured: false
contentType: "news"
language: "zh-CN"
updatedAt: "2026-07-29"
---

经过核验并以自己的语言撰写的正文。
```

必填字段为 `title`、`slug`、`date`、`country`、`region`、`category`、`tags`、`source`、`sourceUrl`、`summary`、`featured`、`contentType`、`language` 和 `updatedAt`。`contentType` 仅可为 `news`、`analysis` 或 `weeklyBrief`。

一级议题和地区只在 [`config/content-taxonomy.json`](config/content-taxonomy.json) 中维护，页面、录入工具和检查工具共同读取该文件。旧 `topics` 字段仍可由读取层兼容，但新内容必须使用 `tags`。

演示新闻须设置 `demo: true` 并明确写明“演示内容，不代表真实新闻”。正式新闻不得包含 `demo` 字段或演示文字。

## 录入第一条真实新闻

```bash
npm run news:add
```

按提示选择地区、一级议题和内容类型，填写来源、URL 与摘要。工具会生成安全且唯一的 slug、防止覆盖与重复来源链接，并显示文件路径；它不会提交或推送 Git。

创建后：

1. 打开新文件，把正文占位文字改为经过核验的内容。
2. 按 [`docs/source-policy.md`](docs/source-policy.md) 和 [`docs/editorial-policy.md`](docs/editorial-policy.md) 复核。
3. 运行四项完整验收。
4. 人工检查 Git 变更后再提交和推送。

## 内容质量与运营

`npm run content:check` 会检查字段、日期、URL、唯一 slug、重复来源链接、重复标题、分类范围、摘要长度、演示标记、布尔类型、Markdown 解析和路径冲突。严重错误以非零状态退出，并在 GitHub Actions 中阻止错误版本通过。

- 来源登记：[`data/sources.yml`](data/sources.yml)
- 来源政策：[`docs/source-policy.md`](docs/source-policy.md)
- 编辑规范：[`docs/editorial-policy.md`](docs/editorial-policy.md)
- 纠错政策：[`docs/correction-policy.md`](docs/correction-policy.md)
- 每周发布、检查和备份：[`docs/operations.md`](docs/operations.md)

## 分析、隐私与安全

项目仅集成 Vercel 官方 Web Analytics 组件，不接入广告、用户画像或第三方营销跟踪。启用与数据保留规则以 Vercel 项目设置为准。

`.gitignore` 排除环境文件、`.vercel/`、`node_modules/`、`.next/`、日志、编辑器缓存和系统临时文件。不要把密钥、Token、Cookie 或个人信息写入 Markdown、来源登记表、Issue 或 Git 历史。

## 后续规划

可在后续阶段评估更完善的编辑审核、授权图片、链接健康检查、专题聚合和自动化测试。RSS 抓取、AI 摘要、数据库、登录、后台系统和自动发布均未实现，也不属于当前阶段。

## 版权与来源

当前仓库未附加开源许可证，不应仅因仓库公开而推定获得再发布或商用许可。演示来源与链接均为明确的示例配置，不代表真实机构或授权关系。

不转载来源完整正文，不使用版权不明的图片；正式内容必须保留原始链接并分别核验文字、图片、数据和引用的授权与署名要求。项目内地图和地区轮廓为简化 SVG，不表达精确行政边界或国界立场。
