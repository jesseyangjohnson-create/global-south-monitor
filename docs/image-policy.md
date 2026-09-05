# 新闻图片版权与许可政策

Global South Monitor 只使用版权、许可和署名要求能够明确核验的图片。新闻能否发布不依赖真实新闻摄影；找不到合规图片时，使用网站自有的地区、栏目或抽象视觉。

## 可接受的图片

- Public Domain 或 CC0。
- CC BY、CC BY-SA，并按具体版本保留作者、来源、许可名称和原始文件页链接。
- Wikimedia Commons 中许可信息完整、可用于本站用途的具体文件。必须核对文件页，不得仅依据缩略图或搜索结果。
- Unsplash License、Pexels License 等明确允许下载和本站使用的图片。
- 联合国、国际组织或政府明确允许新闻或编辑用途的图片，且本站能够满足其署名、用途和修改限制。
- Global South Monitor 自行制作、委托制作或明确拥有使用权的原创视觉。

公开可访问、可以右键保存或出现在搜索结果中，不等于允许转载。许可必须在图片的原始文件页、机构版权政策或书面授权中得到确认。

## 禁止来源

不得自动下载或使用 Reuters、AP、AFP、Getty Images、Bloomberg、Financial Times 的新闻摄影，也不得使用 Google 图片搜索结果、媒体首图、社交媒体图片或来源与许可不明的图片。只有具体图片页面明确给出与本站用途兼容的可复用许可时，才可重新评估。

## 联合国、国际组织和政府图片

使用前必须阅读机构的图片或版权政策，并确认该具体图片允许新闻或编辑用途及本地复制。下载后保存至 `public/images/news/`，进行合理的 Web 压缩；不得热链。front matter 必须记录图片说明、完整署名、机构名称、原始图片或许可页面 URL，以及准确的许可表述。

## Wikimedia Commons 与 Creative Commons

Wikimedia Commons 图片必须链接具体文件页，而不是分类页或搜索页。CC BY 和 CC BY-SA 图片须保留作者、作品来源、许可名称及版本；如有修改，应按许可要求注明。CC BY-SA 的衍生处理还须遵守相同方式共享要求。

## 内容字段

使用图片时必须同时填写：`image`、`imageAlt`、`imageCredit`、`imageSource`、`imageSourceUrl` 和 `imageLicense`。`image` 只能指向 `public/images/news/` 下的本地文件。任何字段缺失、许可为 `unknown`、`unspecified` 或不在允许范围内，`content:check` 都会失败。

## 删除与更正

收到权利人通知、发现许可不兼容或署名错误时，应立即停止展示并保留问题记录。确认后删除或替换本地图片，更新 front matter、署名和许可信息，运行完整内容检查并发布更正。无法及时确认时，先移除图片并恢复网站默认视觉，不影响新闻正文继续发布。
