import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div>
          <strong>全球南方观察</strong>
          <p>连接全球南方地区现场与全球发展议题的中文资讯窗口。</p>
        </div>
        <div>
          <span className="footer-label">浏览</span>
          <Link href="/news">最新资讯</Link>
          <Link href="/regions">地区分类</Link>
          <Link href="/topics">专题分类</Link>
          <Link href="/weekly">每周观察</Link>
        </div>
        <div>
          <span className="footer-label">说明</span>
          <Link href="/about">关于网站</Link>
          <p>本站第一版内容均为界面演示，不构成政策、投资或法律建议。</p>
        </div>
      </div>
      <div className="shell copyright">
        © 2026 Global South Monitor · MVP
      </div>
    </footer>
  );
}
