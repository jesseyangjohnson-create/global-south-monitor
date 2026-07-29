import type { Metadata } from "next";

export const metadata: Metadata = { title: "关于网站" };

export default function AboutPage() {
  return (
    <main>
      <div className="page-hero"><div className="shell"><div className="eyebrow">ABOUT THE MONITOR</div><h1>关于全球南方观察</h1><p>一个以公共知识为导向的中文国际发展资讯原型。</p></div></div>
      <section className="section shell about-grid">
        <div className="prose">
          <h2>我们关注什么</h2>
          <p>全球南方观察关注发展融资、主权债务、国际贸易、产业与供应链、气候治理、能源转型、粮食安全以及全球治理等议题。</p>
          <h2>第一版说明</h2>
          <p>当前版本是最小可用产品。资讯存放在本地 Markdown 文件中，不使用数据库、登录系统、新闻爬虫或任何付费 API。</p>
          <h2>内容与免责声明</h2>
          <p><strong>本站现有 12 条资讯全部是演示内容，不代表真实新闻。</strong>它们只用于测试页面、分类、搜索和阅读体验，不应作为研究、政策或投资决策依据。</p>
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
