#!/usr/bin/env python3
"""Discover candidate Global South stories from Google News RSS and GDELT."""
import argparse, hashlib, json, re, time
from email.utils import parsedate_to_datetime
from datetime import date, datetime
from pathlib import Path
from urllib.parse import quote, urlparse
from urllib.request import Request, urlopen
from urllib.error import URLError
import ssl
import xml.etree.ElementTree as ET

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
    except Exception: return ""

def parse_date(value):
    m = re.search(r"(20\d\d)[-/](\d\d?)[-/](\d\d?)", value or "")
    if m: return f"{m.group(1)}-{int(m.group(2)):02d}-{int(m.group(3)):02d}"
    try: return parsedate_to_datetime(value).date().isoformat()
    except (TypeError, ValueError, IndexError): return ""

def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--start", required=True); ap.add_argument("--end", required=True); ap.add_argument("--limit", type=int, default=100); ap.add_argument("--output", default="reports/news-candidates.json"); args = ap.parse_args()
    start, end = date.fromisoformat(args.start), date.fromisoformat(args.end); cache = Path(".cache/news"); cache.mkdir(parents=True, exist_ok=True); rows=[]; seen_urls=set(); seen_titles=set()
    queries = QUERIES + [f"site:{s} {q}" for s in SITES for q in QUERIES[:8]]
    for q in queries:
        rss = fetch("https://news.google.com/rss/search?q=" + quote(q + f" after:{args.start} before:{args.end}"), cache)
        try: root=ET.fromstring(rss)
        except ET.ParseError: continue
        for item in root.findall(".//item"):
            title=(item.findtext("title") or "").strip(); url=(item.findtext("link") or "").strip(); pd=parse_date(item.findtext("pubDate") or "")
            if not title or not url or BAD.search(title) or url in seen_urls or title.lower() in seen_titles: continue
            if not pd or not (start <= date.fromisoformat(pd) <= end): continue
            seen_urls.add(url); seen_titles.add(title.lower()); country=next((k for k in REGIONS if k.lower() in title.lower()), "")
            rows.append({"title":title,"published_date":pd,"discovered_url":url,"resolved_url":"","source_domain":urlparse(url).netloc,"query":q,"country_if_detected":country,"region_if_detected":REGIONS.get(country,""),"candidate_category":"","discovery_source":"google_news_rss"})
            if len(rows)>=args.limit: break
        if len(rows)>=args.limit: break
    Path(args.output).parent.mkdir(parents=True, exist_ok=True); Path(args.output).write_text(json.dumps(rows, ensure_ascii=False, indent=2)); print(f"discovered {len(rows)} candidates -> {args.output}")
if __name__ == "__main__": main()
