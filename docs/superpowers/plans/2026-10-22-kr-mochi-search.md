# KR Mochi Search Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Finalize the approved three-photo homepage and make the KR store discoverable for 대구 초코모찌 through accurate, crawlable content.
**Architecture:** Render existing React routes to static HTML at build time, using one shared SEO configuration for initial HTML and browser navigation. Cloudflare serves canonical static routes, explicit aliases and a narrowly scoped client-rendered blog fallback; Firebase and contact submission stay unchanged.
**Tech Stack:** React 19, Vite 7, Node tests, Cloudflare Pages.
**Spec:** User instructions in this conversation: approved mochi trio; focus on 초코모찌; same SEO approach as cake; existing other menus/backend preserved. Owner confirmed store identity and daily 10:00–22:00 on 2026-10-22.

## Global Constraints
- Canonical origin: https://kr.verygood-chocolate.com.
- Five verified mochi flavors only; no fabricated prices, reviews, stock, allergen claims or geographic coordinates.
- Store: 대구광역시 수성구 상록로11길 13 1층 베리굿초콜릿; 070-7840-0717; daily 10:00–22:00.
- Preserve Google/Naver verification, GA, Firebase, Formspree and approved visual design.
- Existing dynamic blog remains client rendered; do not add backend functions or build-time database dependencies.
- Sitemap includes canonical public static pages only, not aliases/admin/404 or unverified blog IDs.

## Review Focus
- Slash/alias URLs redirect without loops and preserve query strings.
- Unknown static routes return actual 404; blog deep links keep working.
- Page navigation replaces canonical, robots and schema without stale mochi metadata.
- Important body text exists without JavaScript; all required route CSS is loaded.
- Search summaries, schema and visible business facts agree; no duplicate/invented offers.

### Task 1: Shared facts and SEO model
**Files:** src/data/store.js, src/data/mochi.js, src/seo/config.js, src/seo/head.js, src/components/sections/FAQSection.jsx, src/pages/MochiMenuPage.jsx, tests/seo.test.mjs.
**Interfaces:** getSeoConfig(pathname, options?) returns title/description/canonical/robots/image/structuredData; renderHead(config) returns safe HTML; applySeo(config) updates browser head.
- [x] Write tests for canonical routes, five-flavor Menu schema, verified daily hours/address/phone, no fabricated offers/reviews, private/missing/blog metadata, escaping.
- [x] Run node --test tests/seo.test.mjs; confirm missing functionality fails.
- [x] Implement shared identity, FAQ, metadata and client updates; remove conflicting per-page Helmet tags.
- [x] Run tests and lint; commit source changes with task 2 build outputs.

### Task 2: Crawlable build and routing
**Files:** src/entry-server.jsx, src/App.jsx, scripts/generate-seo-pages.mjs, scripts/preview-seo-pages.mjs, package.json, vite.config.js, public/robots.txt, generated sitemap/llms/redirects, tests/rendering.test.mjs, tests/routing.test.mjs.
**Interfaces:** generator uses task 1 config/head and the existing AppRoutes; preview serves the same route/redirect manifest as deployment.
- [x] Write integration tests requiring nonempty route HTML, unique head fields, five flavor descriptions, correct asset references and preservation of verification tags; route tests cover 200/301/404/blog fallback.
- [x] Run tests against old dist and confirm failures.
- [x] Generate route-specific HTML and CSS references, canonical redirects, image sitemap and factual llms summaries. Preserve narrowly scoped blog fallback.
- [x] Run npm run build, npm test, npm run lint; inspect desktop/mobile and browser navigation.

### Task 3: Review, publish and search registration
**Files:** README.md, tracked dist, ignored qa.local/search-registration.local evidence.
- [x] Request one independent whole-branch review and resolve material findings.
- [x] Verify approved design and production build; commit and push preview.
- [x] Verify Cloudflare preview HTTP status/head/body; finalize on main and inspect live domain.
- [x] Register/refresh KR sitemap and request home/mochi crawling in available Google/Naver/Bing consoles. Verify business profile homepage link where available; preserve cake reservation links.
- [x] Record exact completed vs pending status and leave local Git synchronized.
