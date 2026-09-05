#!/usr/bin/env python3
"""Discover candidate Global South stories from Google News RSS and GDELT."""
import argparse, hashlib, json, re, time
from email.utils import parsedate_to_datetime
from datetime import date, datetime, timedelta
from pathlib import Path
from urllib.parse import quote, urljoin, urlparse
from urllib.request import Request, urlopen
from urllib.error import URLError
import ssl
import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup

GDELT_QUERIES = [
    '("Global South" OR "developing countries" OR "emerging markets") (development OR economy OR finance)',
    '(Africa OR "Latin America" OR "South Asia" OR "Southeast Asia" OR "Central Asia" OR Pacific) (development OR investment OR trade OR infrastructure)',
    '(climate OR "climate finance" OR drought OR flood OR resilience OR energy OR electricity OR renewable)',
    '(China OR BRICS OR "Belt and Road" OR "South-South") (Africa OR ASEAN OR "Latin America" OR "Central Asia" OR "Global South")',
]

QUERIES = [
    "Global South economy", "Africa development finance", "Latin America development",
    "South Asia economy", "Southeast Asia development", "Central Asia economy", "Pacific Islands development",
    "China Africa cooperation", "China Latin America", "China ASEAN", "China Central Asia", "China Global South",
    "BRICS development", "Belt and Road development", "climate finance developing countries", "Africa climate",
    "South Asia flood", "climate resilience developing countries", "Africa electricity", "renewable energy developing countries",
    "energy transition ASEAN", "critical minerals Latin America", "food security Africa", "agriculture South Asia",
    "World Bank developing countries", "ADB development", "AfDB development", "IDB development", "IMF emerging markets",
]
SITES = ["worldbank.org", "adb.org", "afdb.org", "iadb.org", "imf.org", "fao.org", "undp.org", "un.org", "mofcom.gov.cn", "mfa.gov.cn"]
OFFICIAL_SITES = ["adb.org", "afdb.org", "iadb.org", "worldbank.org", "wfp.org", "mfa.gov.cn", "mofcom.gov.cn", "gov.cn", "fao.org", "undp.org", "un.org", "imf.org"]
OFFICIAL_ENTRIES = {
    "adb.org": ["https://www.adb.org/news", "https://www.adb.org/news/releases", "https://www.adb.org/rss/news-releases.xml"],
    "worldbank.org": ["https://www.worldbank.org/en/news", "https://www.worldbank.org/en/news/all", "https://www.worldbank.org/en/news/press-release"],
    "wfp.org": ["https://www.wfp.org/news", "https://www.wfp.org/rss.xml"],
    "mfa.gov.cn": ["https://www.mfa.gov.cn/wjdt_674879/", "https://www.mfa.gov.cn/web/wjdt_674879/"],
    "mofcom.gov.cn": ["https://www.mofcom.gov.cn/xwfb/", "https://www.mofcom.gov.cn/xwfb/bldhd/"],
    "gov.cn": ["https://www.gov.cn/xinwen/", "https://english.www.gov.cn/news/"],
    "undp.org": ["https://www.undp.org/press-releases", "https://www.undp.org/news-centre"],
    "un.org": ["https://news.un.org/en/news", "https://news.un.org/feed/subscribe/en/news/all/rss.xml"],
    "fao.org": ["https://www.fao.org/newsroom/en", "https://www.fao.org/newsroom/rss-feed/en"],
    "imf.org": ["https://www.imf.org/en/News", "https://www.imf.org/en/News/SearchNews"],
}
BAD = re.compile(r"\b(sport|sports|entertainment|celebrity|horoscope|betting|casino|sale|discount|marketing)\b", re.I)
REGIONS = {"Africa":"撒哈拉以南非洲", "Nigeria":"撒哈拉以南非洲", "Kenya":"撒哈拉以南非洲", "Ghana":"撒哈拉以南非洲", "South Africa":"撒哈拉以南非洲", "Asia":"东南亚", "Philippines":"东南亚", "Indonesia":"东南亚", "Vietnam":"东南亚", "China":"中国与全球南方", "Latin America":"拉丁美洲与加勒比", "Brazil":"拉丁美洲与加勒比", "Peru":"拉丁美洲与加勒比", "Pakistan":"南亚", "India":"南亚", "Nepal":"南亚", "Central Asia":"中亚", "Kyrgyzstan":"中亚", "Pacific":"太平洋岛国", "Fiji":"太平洋岛国"}

def fetch(url, cache):
    key = hashlib.sha256(url.encode()).hexdigest() + ".txt"; p = cache / key
    if p.exists() and p.stat().st_size and time.time() - p.stat().st_mtime < 86400: return p.read_text(errors="replace")
    try:
        req = Request(url, headers={"User-Agent":"GlobalSouthMonitorNewsBot/1.0 (+public research)"})
        try: data = urlopen(req, timeout=20).read()
        except (ssl.SSLCertVerificationError, URLError) as exc:
            if isinstance(exc, URLError) and not isinstance(exc.reason, ssl.SSLCertVerificationError): raise
            data = urlopen(req, timeout=20, context=ssl._create_unverified_context()).read()
        text = data.decode("utf-8", "replace"); p.write_text(text); return text
    except Exception as exc:
        print(f"fetch failed: {urlparse(url).netloc} {type(exc).__name__}: {exc}")
        return ""

def resolve_url(url):
    if urlparse(url).netloc != "news.google.com": return url
    try:
        req=Request(url, headers={"User-Agent":"Mozilla/5.0"})
        try: r=urlopen(req, timeout=20)
        except (ssl.SSLCertVerificationError, URLError) as exc:
            if isinstance(exc, URLError) and not isinstance(exc.reason, ssl.SSLCertVerificationError): return ""
            r=urlopen(req, timeout=20, context=ssl._create_unverified_context())
        target=r.geturl(); return target if urlparse(target).netloc != "news.google.com" else ""
    except Exception: return ""

def parse_date(value):
    m = re.search(r"(20\d\d)[-/](\d\d?)[-/](\d\d?)", value or "")
    if not m: m = re.search(r"(20\d\d)(\d\d)[-/](\d\d)", value or "")
    if m: return f"{m.group(1)}-{int(m.group(2)):02d}-{int(m.group(3)):02d}"
    try: return parsedate_to_datetime(value).date().isoformat()
    except (TypeError, ValueError, IndexError): return ""

def official_urls(domain, start, end, cache):
    """Use sitemaps, feeds, and official index pages to find direct article URLs."""
    base = "https://" + domain
    robots = fetch(base + "/robots.txt", cache)
    maps = re.findall(r"(?im)^\s*Sitemap:\s*(\S+)", robots)
    maps.extend([base + "/sitemap.xml", "https://www." + domain + "/sitemap.xml"])
    found = {}; article_hint=re.compile(r"news|press|article|release|story|content|xinwen|wjdt|xwfb",re.I)
    def add(url,title="",hint_date=""):
        if not url or "#" in url: return
        host=urlparse(url).netloc.lower()
        path=urlparse(url).path.rstrip("/")
        patterns={
            "adb.org":r"/news/[^/]{20,}$",
            "worldbank.org":r"/news/(press-release|feature|immersive-story|video)/20\d{2}/",
            "wfp.org":r"/news/[^/]{15,}$",
            "mfa.gov.cn":r"/20\d{4}/t20\d{6}_\d+\.shtml$",
            "mofcom.gov.cn":r"/art/20\d{4}/art_\d+_\d+\.html$|/20\d{6}/\d+\.shtml$",
            "gov.cn":r"/20\d{2}-\d{2}/\d{2}/content_\d+\.htm[l]?$|/news/20\d{4}/\d+/content_.*\.html$",
            "undp.org":r"/(press-releases|stories)/[^/]{15,}$",
            "un.org":r"/en/story/20\d{2}/\d{2}/\d+$",
            "fao.org":r"/newsroom/detail/[^/]+/en$",
            "imf.org":r"/news/articles/20\d{2}/\d{2}/\d{2}/[^/]+$",
        }
        is_article=bool(re.search(patterns.get(domain,r"/[^/]{20,}$"),path,re.I))
        if host.endswith(domain) and article_hint.search(url) and is_article and url not in found: found[url]=(title,hint_date)
    for sm in list(dict.fromkeys(maps))[:6]:
        xml = fetch(sm, cache)
        if not xml: continue
        try: root = ET.fromstring(xml)
        except ET.ParseError: continue
        tag = root.tag.rsplit("}", 1)[-1]
        locs=[(e.text or "").strip() for e in root.iter() if e.tag.rsplit("}",1)[-1]=="loc"]
        if tag == "sitemapindex":
            for child in [u for u in locs if article_hint.search(u)][:6]:
                try:
                    child_xml = fetch(child, cache)
                    if not child_xml: continue
                    cr = ET.fromstring(child_xml)
                except (ET.ParseError, OSError, ValueError): continue
                for node in list(cr):
                    values={e.tag.rsplit("}",1)[-1]:(e.text or "").strip() for e in node}
                    add(values.get("loc",""),hint_date=parse_date(values.get("lastmod","")))
        else:
            for node in list(root):
                values={e.tag.rsplit("}",1)[-1]:(e.text or "").strip() for e in node}
                add(values.get("loc",""),hint_date=parse_date(values.get("lastmod","")))
    entries=list(OFFICIAL_ENTRIES.get(domain,[]))
    if domain=="gov.cn": entries[1:1]=[f"https://english.www.gov.cn/news/page_{page}.html" for page in range(2,31)]
    for entry in entries:
        data=fetch(entry,cache)
        if not data: continue
        try:
            root=ET.fromstring(data)
            if root.tag.rsplit("}",1)[-1].lower() not in {"rss","feed","rdf"}: raise ET.ParseError("not a feed")
            for item in root.findall(".//item")+root.findall(".//{*}entry"):
                link=item.findtext("link") or ""
                link_node=item.find("{*}link")
                if link_node is not None: link=link_node.get("href") or link
                add(link,(item.findtext("title") or item.findtext("{*}title") or "").strip(),parse_date(item.findtext("pubDate") or item.findtext("{*}updated") or ""))
        except ET.ParseError:
            soup=BeautifulSoup(data,"html.parser")
            for anchor in soup.select("a[href]"):
                url=urljoin(entry,anchor["href"]); title=anchor.get_text(" ",strip=True)
                if len(title)>=12: add(url,title,parse_date(anchor.get("datetime","") or url))
    return [(url,*meta) for url,meta in found.items()]

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--start", required=True); ap.add_argument("--end", required=True); ap.add_argument("--limit", type=int, default=100); ap.add_argument("--output", default="reports/news-candidates.json"); ap.add_argument("--source", choices=("all", "gdelt", "official"), default="all"); ap.add_argument("--domains", default=",".join(OFFICIAL_SITES)); args = ap.parse_args()
    start, end = date.fromisoformat(args.start), date.fromisoformat(args.end); cache = Path(".cache/news"); cache.mkdir(parents=True, exist_ok=True); rows=[]; seen_urls=set(); seen_titles=set()
    queries = QUERIES + [f"site:{s} {q}" for s in SITES for q in QUERIES[:8]]
    stats={"direct_urls":0,"google_wrappers":0,"resolved_wrappers":0,"unresolved_wrappers":0}
    if args.source == "official":
        per_domain=max(8,(args.limit+1)//2)
        for domain in args.domains.split(","):
            domain_count=0
            for url, title, hint_date in official_urls(domain.strip(), start, end, cache):
                if url in seen_urls or urlparse(url).netloc == "news.google.com": continue
                if hint_date and not (start <= date.fromisoformat(hint_date) <= end): continue
                seen_urls.add(url); stats["direct_urls"] += 1
                rows.append({"title":title or url.rsplit("/",1)[-1].replace("-"," ").strip() or url,"published_date":hint_date,"discovered_url":url,"resolved_url":url,"source_domain":urlparse(url).netloc,"query":"official source index","country_if_detected":"","region_if_detected":"","candidate_category":"","discovery_source":"official"})
                domain_count+=1
                if domain_count>=per_domain or len(rows)>=args.limit: break
            if len(rows) >= args.limit: break
        Path(args.output).parent.mkdir(parents=True, exist_ok=True); Path(args.output).write_text(json.dumps(rows, ensure_ascii=False, indent=2)); print(f"discovered total={len(rows)} direct_urls={len(rows)} google_wrappers=0 domains={sorted({r['source_domain'] for r in rows})} -> {args.output}"); return
    # GDELT returns publisher URLs directly. Keep requests broad and rate-limited.
    gdelt_queries = GDELT_QUERIES
    for i, q in enumerate(gdelt_queries):
        if i: time.sleep(6)
        end_exclusive = (date.fromisoformat(args.end) + timedelta(days=1)).strftime("%Y%m%d")
        gdelt=f"https://api.gdeltproject.org/api/v2/doc/doc?query={quote(q)}&mode=ArtList&format=json&maxrecords=250&startdatetime={args.start.replace('-','')}000000&enddatetime={end_exclusive}000000"
        payload = fetch(gdelt, cache)
        if "Please limit requests" in payload:
            print(f"GDELT rate limited; waiting 10s before one retry for query {i + 1}/4")
            time.sleep(10)
            payload = fetch(gdelt + "&retry=1", cache)
        if not payload:
            print(f"GDELT query {i + 1}/4 returned no payload")
        try: articles=json.loads(payload).get("articles", [])
        except (json.JSONDecodeError, AttributeError): articles=[]
        for a in articles:
            title=(a.get("title") or "").strip(); url=(a.get("url") or "").strip(); pd=parse_date(a.get("seendate") or a.get("date") or "")
            if not title or not url or BAD.search(title) or url in seen_urls or title.lower() in seen_titles or not pd or not (start <= date.fromisoformat(pd) <= end): continue
            seen_urls.add(url); seen_titles.add(title.lower()); stats["direct_urls"]+=1
            rows.append({"title":title,"published_date":pd,"discovered_url":url,"resolved_url":url,"source_domain":urlparse(url).netloc,"query":q,"country_if_detected":a.get("sourcecountry", ""),"region_if_detected":"","candidate_category":"","discovery_source":"gdelt"})
            if len(rows)>=args.limit: break
        if len(rows)>=args.limit: break
    if args.source == "gdelt":
        queries = []
    for q in queries:
        rss = fetch("https://news.google.com/rss/search?q=" + quote(q + f" after:{args.start} before:{args.end}"), cache)
        try: root=ET.fromstring(rss)
        except ET.ParseError: continue
        for item in root.findall(".//item"):
            title=(item.findtext("title") or "").strip(); url=(item.findtext("link") or "").strip(); pd=parse_date(item.findtext("pubDate") or "")
            if not title or not url or BAD.search(title) or url in seen_urls or title.lower() in seen_titles: continue
            if not pd or not (start <= date.fromisoformat(pd) <= end): continue
            seen_urls.add(url); seen_titles.add(title.lower()); country=next((k for k in REGIONS if k.lower() in title.lower()), ""); stats["google_wrappers"]+=1
            resolved=resolve_url(url); stats["resolved_wrappers"] += bool(resolved); stats["unresolved_wrappers"] += not bool(resolved)
            rows.append({"title":title,"published_date":pd,"discovered_url":url,"resolved_url":resolved,"source_domain":urlparse(resolved).netloc if resolved else "news.google.com","query":q,"country_if_detected":country,"region_if_detected":REGIONS.get(country,""),"candidate_category":"","discovery_source":"google_news_rss"})
            if len(rows)>=args.limit: break
        if len(rows)>=args.limit: break
    domains = {}
    for row in rows: domains[row["source_domain"]] = domains.get(row["source_domain"], 0) + 1
    Path(args.output).parent.mkdir(parents=True, exist_ok=True); Path(args.output).write_text(json.dumps(rows, ensure_ascii=False, indent=2)); print(f"discovered total={len(rows)} direct_urls={stats['direct_urls']} google_wrappers={stats['google_wrappers']} resolved_wrappers={stats['resolved_wrappers']} unresolved_wrappers={stats['unresolved_wrappers']} domains={domains} -> {args.output}")
if __name__ == "__main__": main()
