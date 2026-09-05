# Verified news pack ingestion report

- Source pack: `verified-news-pack-2026-08-10-to-2026-09-05.json`
- SHA-256: `4b7041ab4982c79ab1e3e95de59ef8ee0c03df3c48e3df4f5649261ae0d8219d`
- Coverage declared by pack: 2026-08-10 to 2026-09-05
- Pack items: 42
- Existing source URL/title duplicates: 0
- Skipped for single-region schema: 3
- Published: 39
- Visual treatment: existing category/region fallback only; no external images downloaded

## Schema skips

1. `2026年全球粮食系统评估称多数2030目标进展不足`: the item covers 197 countries globally; assigning it only to Sub-Saharan Africa would misstate its scope.
2. `UNFCCC海洋对话呼吁把海洋议题更系统纳入NDC与气候融资`: the item is explicitly cross-regional; assigning it only to Pacific Islands would misstate its scope.
3. `UNFCCC称至少22场NDC同行交流已覆盖六大区域`: the item covers six regions; assigning it only to Latin America and the Caribbean would misstate its scope.

## Category distribution

| Category | Count |
| --- | ---: |
| 中国与全球南方 | 7 |
| 经济 | 7 |
| 金融 | 6 |
| 社会与发展 | 6 |
| 气候问题 | 6 |
| 农业与粮食安全 | 3 |
| 科技与产业 | 2 |
| 全球治理 | 1 |
| 能源问题 | 1 |

## Region distribution

| Region | Count |
| --- | ---: |
| 撒哈拉以南非洲 | 16 |
| 东南亚 | 8 |
| 中东与北非 | 5 |
| 中亚 | 3 |
| 太平洋岛国 | 3 |
| 南亚 | 2 |
| 拉丁美洲与加勒比 | 2 |

## Featured selection

- 2026-09-03 中国总结上合峰会及吉尔吉斯斯坦、埃及访问成果，强调发展与全球治理合作
- 2026-09-03 世界银行提出泰国迈向高收入经济的新增长路线图
- 2026-09-02 AfDB与AXIAN启动数字金融项目，计划支持非洲3.4万家女性主导企业
- 2026-09-01 OPEC基金与塔吉克斯坦签署首个国别伙伴框架，并提供3000万美元道路贷款
- 2026-09-01 资金短缺迫使WFP将西岸粮食援助覆盖人数削减一半
- 2026-09-01 ADB与帕劳讨论财政缓冲和能源转型以降低外部冲击
- 2026-08-31 UNFCCC就喜马拉雅冰川崩塌与洪灾警示高山地区气候风险

## Ingestion boundary

Article summaries and fact bullets come only from `summary_zh` and `verified_facts`. Each pack `cautions` entry is retained in the article as an explicit boundary. No additional web discovery, numerical claims, causal claims, policy effects, or third-party images were added.
