# Repository Guide

## Purpose

Static Astro 5 personal blog deployed to `https://creoenmi-p.github.io/`.
The public route set is home, blog, tags, shuoshuo, about, message, and the external GitHub link.
Do not reintroduce the upstream author's content, hotlinked assets, RSS, weekly, categories, friends,
CWD, or LinuxDo integrations.

## Sources of truth

- `src/config/site.ts`: identity and public GitHub/Giscus integration settings.
- `src/content.config.ts`: article frontmatter contract.
- `src/content/blog/`: Markdown/MDX articles.
- `src/styles/global.scss`: editorial visual system and responsive behavior.
- `.github/workflows/deploy.yml`: Pages deployment and memo Issue rebuild trigger.

## Validation

- `npm run check`: Astro/TypeScript diagnostics.
- `npm run build`: diagnostics plus production build to `dist/`.
- `npm run preview`: production-like local preview.

Production builds must exclude drafts. Missing GitHub/Giscus configuration must degrade visibly and safely,
not fail the whole site. Issue comment Markdown must remain sanitized and filtered to the configured owner.
