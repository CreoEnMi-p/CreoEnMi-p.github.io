# Personal Blog

一个基于 Astro 的静态个人博客，采用暖白纸张、中文衬线标题与暗红点睛的编辑部风格。

## 本地开发

需要 Node.js 22.12.0 或更高版本。

```bash
npm ci
npm run dev
```

生产检查：

```bash
npm run build
npm run preview
```

## 修改个人资料

所有站点资料集中在 `src/config/site.ts`：

- 博客名称、简介、作者与头像
- GitHub 地址
- “碎碎念”使用的 Issue 编号
- Giscus 的仓库与分类 ID

头像默认使用 `public/avatar.svg`，替换文件或修改配置即可。

## 写文章

在 `src/content/blog/` 新建 Markdown 或 MDX：

```md
---
title: 文章标题
description: 用于 SEO 的描述
summary: 首页显示的摘要
pubDate: 2026-07-29
tags: [随笔, 开发]
draft: false
---
```

草稿只在开发环境中显示，生产构建会过滤 `draft: true`。

## GitHub 功能

### 碎碎念

1. 在仓库创建一个标题为“碎碎念”的 Issue。
2. 将 Issue 编号写入 `src/config/site.ts` 的 `memoIssueNumber`。
3. 用仓库所有者账号在该 Issue 下发表评论。

页面只展示 `CreoEnMi-p` 的评论。部署工作流会在目标 Issue 评论变化时重新构建。

### Giscus

1. 为仓库启用 Discussions。
2. 创建开放式 `Comments` 分类。
3. 安装 [Giscus GitHub App](https://github.com/apps/giscus)。
4. 在 [giscus.app](https://giscus.app/) 获取 `repoId` 与 `categoryId`。
5. 把参数写入 `src/config/site.ts`。

缺少参数时，文章与留言页会显示配置提示，不会加载无效脚本。

## 部署

`.github/workflows/deploy.yml` 使用 Astro 官方 GitHub Pages 工作流。仓库名称为
`CreoEnMi-p.github.io` 时，站点地址是 `https://creoenmi-p.github.io/`，无需配置 `base`。

## 来源

设计与代码结构改编自 [anghunk/astro-blog](https://github.com/anghunk/astro-blog)，
详见 [NOTICE.md](./NOTICE.md)。
