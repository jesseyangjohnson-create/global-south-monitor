import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于网站",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main>
      <div className="page-hero"><div className="shell"><div className="eyebrow">ABOUT THE MONITOR</div><h1>关于全球南方观察</h1><p>一个以公共知识为导向的中文国际发展资讯原型。</p></div></div>
      <section className="section shell about-grid">
        <div className="prose">
          <h2>我们关注什么</h2>
          <p>全球南方观察关注发展融资、主权债务、国际贸易、产业与供应链、气候治理、能源转型、粮食安全以及全球治理等议题。</p>
          <h2>当前版本说明</h2>
          <p>资讯由编辑人工检索、核验和录入，存放在本地 Markdown 文件中；网站不使用数据库、登录系统、新闻爬虫或任何付费 API。</p>
          <h2>内容与免责声明</h2>
          <p><strong>公开页面只展示已核验并保留原始链接的正式资讯。</strong>仓库中的历史测试文件继续保留，但不会进入首页、列表、分类、搜索、RSS 或站点地图。本站内容不构成研究、政策或投资建议。</p>
        </div>
        <aside className="principles">
          <h2>编辑原则</h2>
          <ol>
            <li>明确区分演示信息与真实报道。</li>
            <li>避免用夸张标题替代事实脉络。</li>
            <li>保留来源与原文入口。</li>
            <li>重视区域差异与发展背景。</li>
          </ol>
        </aside>
      </section>
    </main>
  );
}
