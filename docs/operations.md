# 常态化运营流程

## 每次发布

1. 运行 `npm run news:add` 创建新闻文件。
2. 编辑正文，复核原始来源、版权、分类、日期和演示标记。
3. 运行 `npm run content:check`、`npm run lint`、`npm run typecheck` 和 `npm run build`。
4. 检查变更列表，确认没有 `.env`、`.vercel`、日志、缓存或个人信息。
5. 提交并推送，由 GitHub Actions 验收；通过后再由 Vercel 自动部署。
6. 打开线上新闻页、原文链接、RSS、站点地图和手机视口做一次抽查。

## 每周

- 检查待处理的内容纠错、来源推荐和网站故障 Issue。
- 复核本周来源链接可访问性，并更新实际使用来源的 `lastCheckedAt`。
- 检查 Dependabot 提示和 GitHub Actions 结果；依赖升级必须经过构建验证。
- 将 Git 仓库推送到远程作为版本备份；不要把本地密钥或 Vercel 配置作为备份内容。

## 每月

- 抽查分类一致性、重复来源、失效链接、结构化数据和搜索收录状态。
- 导出或记录必要的匿名访问趋势；不建立用户画像。
- 确认 Vercel 环境变量 `NEXT_PUBLIC_SITE_URL` 指向正式域名。

## 故障与恢复

部署失败时先查看 GitHub Actions 与 Vercel 构建日志，不绕过类型或内容检查。可从最后一个已验证的 Git 提交重新部署；需要回退时应使用新的回退提交保留审计轨迹。
