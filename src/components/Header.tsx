"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  ["首页", "/"],
  ["最新资讯", "/news"],
  ["议题", "/topics"],
  ["地区", "/regions"],
  ["每周观察", "/weekly"],
  ["关于我们", "/about"],
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${pathname !== "/" ? "is-inner" : ""} ${scrolled ? "is-scrolled" : ""}`}>
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="全球南方观察首页">
          <span className="brand-mark">南</span>
          <span>
            <strong>全球南方观察</strong>
            <small>Global South Monitor</small>
          </span>
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "关闭导航菜单" : "打开导航菜单"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span /><span />
        </button>
        <nav className={`nav ${open ? "is-open" : ""}`} aria-label="主导航">
          {links.map(([label, href]) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link className={active ? "active" : ""} href={href} key={href} onClick={() => setOpen(false)}>
                {label}
              </Link>
            );
          })}
          <Link className="nav-search" href="/news#filters" aria-label="搜索资讯" onClick={() => setOpen(false)}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m15.5 15.5 5 5" />
            </svg>
            <span>搜索</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
