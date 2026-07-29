import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <div className="page-hero">
        <div className="shell">
          <div className="eyebrow">404 · PAGE NOT FOUND</div>
          <h1>没有找到这个页面</h1>
          <p>链接可能已经变更，或者这条资讯尚未发布。</p>
          <Link className="button button-dark" href="/">
            返回首页
          </Link>
        </div>
      </div>
    </main>
  );
}
