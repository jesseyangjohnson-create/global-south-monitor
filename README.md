# 全球南方观察 Global South Monitor

一个面向中文读者的全球南方新闻与研究资讯网站。本项目以“国际发展智库网站 + 全球新闻资讯平台”为定位，通过地区、国家和议题三个层次，整理国际发展、区域经济与全球治理相关内容。

> 当前仓库中的 12 条新闻均为界面和功能测试所用的演示内容，不代表真实新闻。

## 当前版本功能

- 全宽三页首页轮播，支持自动切换、手动控制、触摸滑动和减少动画设置
- 今日热点、最新资讯、核心议题、全球地区和每周观察首页模块
- 关键词搜索以及地区、一级议题筛选
- 新闻详情页和外部原文链接入口
- 地区 → 所属国家 → 国家新闻的内容层级
- 八个一级议题及兼容旧标签的映射
- 七个地区入口和本地 SVG 地理轮廓
- 本地 Markdown 新闻读取和 front matter 元数据
- 桌面、平板和手机响应式布局
- 基础 SEO 标题和描述
- 内容格式自动校验

当前版本**没有**自动新闻抓取、实时资讯、AI 自动摘要、数据库、后台管理、用户系统或真正的交互式 GIS 地图。

## 技术栈

- Next.js 16（App Router）
- React 19
- TypeScript
- Tailwind CSS 4
- `gray-matter`：解析 Markdown front matter
- `react-markdown`：渲染新闻正文
- pnpm：依赖管理

项目不需要 API 密钥或付费服务。

## 本地运行

建议使用 Node.js 20.9 或更高版本，并安装 pnpm。

```bash
pnpm install
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000)。

## 检查与生产构建

```bash
pnpm test
pnpm lint
pnpm build
```

生产模式本地运行：

```bash
pnpm start
```

## 项目目录

```text
global-south-monitor/
├── content/news/             # 独立 Markdown 新闻文件
├── public/                   # 本地公共资源
├── scripts/
│   └── validate-content.mjs  # 新闻字段与演示声明校验
├── src/
│   ├── app/                  # Next.js App Router 页面
│   ├── components/           # 导航、轮播、新闻卡片和 SVG 组件
│   └── lib/                  # 新闻读取与分类映射
├── package.json
├── next.config.ts
└── README.md
```

主要页面：

- `/`：首页
- `/news`：最新资讯、搜索与筛选
- `/news/[slug]`：新闻详情
- `/topics`、`/topics/[slug]`：一级议题
- `/regions`、`/regions/[slug]`：地区及所属国家
- `/countries`、`/countries/[slug]`：国家索引及国家新闻
- `/weekly`：每周观察
- `/about`：关于网站

## 新闻文件格式

每条新闻是 `content/news/` 中的独立 `.md` 文件：

```yaml
---
title: "示例标题"
date: "2026-07-28"
country: "示例国家"
region: "撒哈拉以南非洲"
category: "金融"
topics:
  - "主权债务"
  - "发展融资"
source: "演示来源"
sourceUrl: "https://example.com"
summary: "100字以内的新闻摘要。"
featured: false
---

**演示内容，不代表真实新闻。**

新闻正文。
```

必填字段包括：

- `title`
- `date`
- `country`
- `region`
- `category`
- `topics`
- `source`
- `sourceUrl`
- `summary`
- `featured`

一级议题可使用：经济、金融、社会与发展、地缘与安全、气候与环境、全球治理、农业与粮食安全、科技与产业。`topics` 用于保存更细的二级标签。

## 如何新增新闻

1. 在 `content/news/` 新建名称唯一的 Markdown 文件，文件名会成为新闻 URL slug。
2. 按上述格式填写全部 front matter 字段。
3. 确认地区和一级议题与 `src/lib/site.ts` 中的定义一致。
4. 填写来源名称和原文链接。
5. 如果是演示内容，正文必须明确包含“演示内容，不代表真实新闻。”
6. 运行 `pnpm test`、`pnpm lint` 和 `pnpm build`。

## 演示内容说明

当前 12 条新闻用于验证页面、分类、搜索、轮播和响应式布局，不应被视为真实报道、研究结论、政策建议或投资建议。演示内容不包含真实国际组织近期事件、具体声明或虚构统计数据。

## 后续规划

可能的后续工作包括：

- 建立正式的编辑规范和来源核验流程
- 增加真实且有授权的新闻图片
- 完善二级标签和专题聚合
- 增加 RSS、站点地图和更完整的 SEO 元数据
- 建立内容更新和发布流程
- 补充组件与端到端自动化测试

以上均为规划，不代表当前版本已经实现。

## 版权与来源

网站界面与代码以本仓库实际授权状态为准；本版本暂未附加开源许可证，因此不得仅凭公开仓库推定获得再发布或商用许可。

演示新闻来源统一标记为“演示来源”，外部链接使用 `example.com`，不代表任何真实媒体或机构。世界地图、地区轮廓和议题图标均为项目内的简化 SVG 视觉组件，不包含精确行政边界，也不用于表达国界立场。未来使用真实新闻、图片或第三方资料时，应分别核验其版权、署名和转载条件。
