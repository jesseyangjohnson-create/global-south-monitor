#!/usr/bin/env python3
"""Verify direct news URLs using structured metadata and article content."""
import argparse, hashlib, json, re, ssl, time
from datetime import date
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen
from bs4 import BeautifulSoup

BLOCK = re.compile(r"incapsula incident|attention required.*cloudflare|captcha|verify you are human|security challenge", re.I | re.S)
DATE_RE = re.compile(r"(20\d{2})[-/]([01]?\d)[-/]([0-3]?\d)")

def normalized_date(value):
    match = DATE_RE.search(str(value or ""))
    if not match: return ""
    try: return date(*map(int, match.groups())).isoformat()
    except ValueError: return ""

def fetch(url, cache):
    key=hashlib.sha256(url.encode()).hexdigest()+".html"; path=cache/key
    if path.exists() and time.time()-path.stat().st_mtime<86400: return path.read_text(errors="replace"),200,url
    request=Request(url,headers={"User-Agent":"Mozilla/5.0 (compatible; GlobalSouthMonitor/1.0; research)"})
    try:
        try: response=urlopen(request,timeout=12)
        except (ssl.SSLCertVerificationError,URLError) as exc:
            if isinstance(exc,URLError) and not isinstance(exc.reason,ssl.SSLCertVerificationError): raise
            response=urlopen(request,timeout=12,context=ssl._create_unverified_context())
        body=response.read(2_000_000).decode("utf-8","replace"); path.write_text(body)
        return body,response.status,response.geturl()
    except HTTPError as exc: return "",exc.code,url
    except (URLError,TimeoutError,OSError,ValueError): return "",None,url

def jsonld_articles(soup):
    for node in soup.select('script[type="application/ld+json"]'):
        try: value=json.loads(node.string or node.get_text())
        except (json.JSONDecodeError,TypeError): continue
        queue=value if isinstance(value,list) else [value]
        while queue:
            item=queue.pop(0)
            if not isinstance(item,dict): continue
            if isinstance(item.get("@graph"),list): queue.extend(item["@graph"])
            kinds=item.get("@type",[]); kinds=[kinds] if isinstance(kinds,str) else kinds
            if any(kind in {"Article","NewsArticle","Report","PressRelease"} for kind in kinds): yield item

def extract(body,final_url):
    soup=BeautifulSoup(body,"html.parser"); metadata=next(jsonld_articles(soup),{})
    def meta(*keys):
        for key in keys:
            node=soup.find("meta",attrs={"property":key}) or soup.find("meta",attrs={"name":key})
            if node and node.get("content"): return node["content"].strip()
        return ""
    title=metadata.get("headline") or meta("og:title","twitter:title") or (soup.title.get_text(" ",strip=True) if soup.title else "")
    published=normalized_date(metadata.get("datePublished") or meta("article:published_time","date","publish-date","publishdate","parsely-pub-date"))
    if not published:
        for node in soup.find_all("time"):
            published=normalized_date(node.get("datetime") or node.get_text(" ",strip=True))
            if published: break
    canonical=final_url; link=soup.find("link",rel=lambda value:value and "canonical" in value)
    if link and link.get("href"): canonical=urljoin(final_url,link["href"])
    container=soup.find("article") or soup.find("main") or soup.select_one('[itemprop="articleBody"],.article-body,.article-content,.Artical_Content,.field--name-body,.news-content')
    paragraphs=[]
    if container:
        for junk in container.select("script,style,nav,aside,form,button,footer"): junk.decompose()
        paragraphs=[p.get_text(" ",strip=True) for p in container.select("p,li")]
    text="\n".join(p for p in paragraphs if len(p)>=35)
    return {"title":title,"publication_date":published,"description":metadata.get("description") or meta("description","og:description"),"article_text":text,"canonical_url":canonical}

def main():
    parser=argparse.ArgumentParser(); parser.add_argument("input"); parser.add_argument("--output",default="reports/news-verified.json"); parser.add_argument("--start"); parser.add_argument("--end"); args=parser.parse_args()
    cache=Path(".cache/news"); cache.mkdir(parents=True,exist_ok=True); output=[]
    start=date.fromisoformat(args.start) if args.start else None; end=date.fromisoformat(args.end) if args.end else None
    for candidate in json.loads(Path(args.input).read_text()):
        url=candidate.get("resolved_url") or candidate.get("discovered_url"); result={**candidate,"status":"reject","http_status":None,"canonical_url":url,"key_facts":[]}
        if not url or urlparse(url).netloc=="news.google.com": result["status"]="unresolved"
        else:
            body,status,final_url=fetch(url,cache); result.update(http_status=status,resolved_url=final_url,canonical_url=final_url)
            challenge=bool(BLOCK.search(body)) and len(BeautifulSoup(body,"html.parser").get_text(" ",strip=True))<1500
            if status!=200 or not body or challenge: result["status"]="unavailable"
            else:
                article=extract(body,final_url); result.update(article); published=article["publication_date"]
                in_range=bool(published) and (not start or date.fromisoformat(published)>=start) and (not end or date.fromisoformat(published)<=end)
                enough=len(article["article_text"])>=250 and len(article["title"])>=12
                result["status"]="verified" if in_range and enough else "reject"
                if enough: result["key_facts"]=article["article_text"].splitlines()[:5]
        output.append(result); print(f"{result.get('source_domain','')} status={result.get('http_status')} final={result.get('resolved_url','')} result={result['status']}")
    Path(args.output).parent.mkdir(parents=True,exist_ok=True); Path(args.output).write_text(json.dumps(output,ensure_ascii=False,indent=2))
    print(" ".join(f"{key}={sum(x['status']==key for x in output)}" for key in ("verified","unavailable","reject","unresolved"))+f" total={len(output)} -> {args.output}")
if __name__=="__main__": main()
