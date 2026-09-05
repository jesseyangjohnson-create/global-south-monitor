#!/usr/bin/env python3
"""Verify discovered URLs with conservative public HTTP requests."""
import argparse, hashlib, json, re, time
from pathlib import Path
from urllib.parse import urlparse
from urllib.request import Request, urlopen
import ssl
from urllib.error import HTTPError, URLError

BLOCK = re.compile(r"incapsula|cloudflare|captcha|verify you are human|access denied|waf", re.I)
def main():
    ap=argparse.ArgumentParser(); ap.add_argument("input"); ap.add_argument("--output",default="reports/news-verified.json"); args=ap.parse_args(); cache=Path(".cache/news"); cache.mkdir(parents=True,exist_ok=True); out=[]
    for c in json.loads(Path(args.input).read_text()):
        url=c.get("resolved_url") or c.get("discovered_url"); result={**c,"resolved_url":url,"status":"reject","institution":"","country":"","amounts":[],"project_or_policy":"","key_facts":[],"canonical_url":url}
        key=hashlib.sha256(url.encode()).hexdigest()+".html"; p=cache/key; body=""
        try:
            if p.exists() and time.time()-p.stat().st_mtime<86400: body=p.read_text(errors="replace")
            else:
                req=Request(url,headers={"User-Agent":"GlobalSouthMonitorNewsBot/1.0 (+public research)"})
                try: resp=urlopen(req,timeout=20)
                except (ssl.SSLCertVerificationError, URLError) as exc:
                    if isinstance(exc, URLError) and not isinstance(exc.reason, ssl.SSLCertVerificationError): raise
                    resp=urlopen(req,timeout=20,context=ssl._create_unverified_context())
                url = resp.geturl(); result["resolved_url"] = url; result["canonical_url"] = url
                body=resp.read(2_000_000).decode("utf-8","replace"); p.write_text(body)
            if BLOCK.search(body): result["status"]="unavailable"
            else:
                text=re.sub(r"<[^>]+>"," ",body); text=re.sub(r"\s+"," ",text).strip(); result["title"]=text[:240] or c["title"]; result["publication_date"]=c.get("published_date",""); result["key_facts"]=[text[:1000]] if len(text)>120 else []; result["status"]="verified" if result["key_facts"] else "reject"
        except (HTTPError,URLError,TimeoutError,ValueError) as e: result["status"]="unavailable"; result["error"]=str(e)
        out.append(result)
    Path(args.output).parent.mkdir(parents=True,exist_ok=True); Path(args.output).write_text(json.dumps(out,ensure_ascii=False,indent=2)); print(f"verified {sum(x['status']=='verified' for x in out)} / {len(out)} -> {args.output}")
if __name__=="__main__": main()
