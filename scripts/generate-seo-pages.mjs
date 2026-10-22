import { createServer } from 'vite';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { getSeoConfig, INDEXABLE_PATHS, REDIRECTS, SITE_URL, STATIC_PATHS } from '../src/seo/config.js';
import { renderHead } from '../src/seo/head.js';
import { mochiFlavors } from '../src/data/mochi.js';
import { store, mochiFaq } from '../src/data/store.js';

const dist = resolve('dist');
const template = (await readFile(`${dist}/index.html`, 'utf8')).replace(/<title>[\s\S]*?<\/title>/, '').replace(/[ \t]+\n/g, '\n');
const manifest = JSON.parse(await readFile(`${dist}/.vite/manifest.json`, 'utf8'));
const routes = Object.fromEntries(STATIC_PATHS.map(path => [path, path === '/' ? '/index.html' : `${path}.html`]));
const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
const write = async (path, content) => { await mkdir(dirname(path), { recursive: true }); await writeFile(path, content); };
const xml = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

function cssForModule(key, visited = new Set()) {
    if (visited.has(key)) return [];
    visited.add(key);
    const chunk = manifest[key];
    return chunk ? [...(chunk.css || []), ...(chunk.imports || []).flatMap(x => cssForModule(x, visited))] : [];
}
function pageModule(path) {
    if (path === '/menu/mochi') return 'MochiMenuPage';
    if (path === '/menu/granola') return 'GranolaMenuPage';
    if (path.startsWith('/menu/')) return 'MenuDetailPage';
    return { '/': 'HomePage', '/menu': 'MenuPage', '/about': 'AboutPage', '/business-story': 'BusinessStoryPage', '/blog': 'BlogPage', '/privacy': 'PrivacyPage', '/terms': 'TermsPage', '/admin': 'AdminPage', '/404': 'NotFoundPage' }[path];
}
function withPage(content, config, path) {
    const css = [...new Set(cssForModule(`src/pages/${pageModule(path)}.jsx`))]
        .filter(file => !template.includes(`/${file}`))
        .map(file => `<link rel="stylesheet" href="/${file}">`).join('\n');
    return template.replace('</head>', `${renderHead(config)}\n${css}\n</head>`)
        .replace('<div id="root"></div>', `<div id="root">${content}</div>`);
}

try {
    const { render } = await vite.ssrLoadModule('/src/entry-server.jsx');
    for (const path of STATIC_PATHS) {
        await write(`${dist}${routes[path]}`, withPage(await render(path), getSeoConfig(path), path));
    }
    // Future blog posts must remain available immediately after publication in
    // Firebase. Do not give this pending shell a homepage/blog-index canonical.
    await write(`${dist}/blog-entry.html`, withPage(await render('/blog/pending'), getSeoConfig('/blog/pending'), '/blog'));
    const redirects = [
        ...Object.entries(REDIRECTS).flatMap(([from, to]) => [`${from} ${to} 301`, `${from}/ ${to} 301`]),
        ...STATIC_PATHS.filter(path => path !== '/').map(path => `${path}/ ${path} 301`),
        '/blog/:id/ /blog/:id 301',
        '/blog/:id /blog-entry 200'
    ].join('\n') + '\n';
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${INDEXABLE_PATHS.map(path => {
        const images = path === '/' || path === '/menu/mochi' ? mochiFlavors.filter(x => x.image).map(x => `${SITE_URL}${x.image}`) : [getSeoConfig(path).image];
        return `  <url><loc>${SITE_URL}${path}</loc>${images.map(image => `<image:image><image:loc>${xml(image)}</image:loc></image:image>`).join('')}</url>`;
    }).join('\n')}\n</urlset>\n`;
    const intro = `# 베리굿초콜릿 — 대구 초코모찌\n\n> ${getSeoConfig('/').description}\n\n## 매장 정보\n- 이름: ${store.name} (${store.englishName})\n- 주소: ${store.address}\n- 전화: ${store.phone}\n- 영업시간: ${store.hours}\n- 공식 한국 홈페이지: ${SITE_URL}/\n- 네이버 지도: ${store.naverMap}\n- Google 지도: ${store.googleMap}\n\n## 대표 메뉴: 리얼 가나슈 초코모찌\n${mochiFlavors.map(x => `- ${x.name}: ${x.description}`).join('\n')}\n\n당일 판매 메뉴, 재고와 가격은 매장 또는 이용하는 주문 채널에서 확인해주세요.\n\n## 공식 페이지\n- [초코모찌 5가지 맛](${SITE_URL}/menu/mochi)\n- [전체 메뉴](${SITE_URL}/menu)\n- [매장 소개](${SITE_URL}/about)\n- [케이크 예약](${store.cake})\n- [자주 묻는 질문과 상세 안내](${SITE_URL}/llms-full.txt)\n\n한국 매장 정보입니다. 호주 매장의 가격·메뉴·연락처와 구분해주세요.\n`;
    const full = `${intro}\n## 자주 묻는 질문\n${mochiFaq.map(x => `\n### ${x.question}\n${x.answer}\n`).join('')}\n## 공개 페이지\n${INDEXABLE_PATHS.map(path => `- [${getSeoConfig(path).title}](${SITE_URL}${path})`).join('\n')}\n`;
    for (const [file, content] of Object.entries({ '_redirects': redirects, 'sitemap.xml': sitemap, 'llms.txt': intro, 'llms-full.txt': full })) {
        await write(`${dist}/${file}`, content);
        await write(resolve('public', file), content);
    }
    await write(`${dist}/seo-routes.json`, JSON.stringify({ routes, redirects: REDIRECTS, blogFallback: '/blog-entry.html' }, null, 2));
    console.log(`Generated ${STATIC_PATHS.length} static pages, ${INDEXABLE_PATHS.length} sitemap URLs and a dynamic-blog fallback.`);
} finally {
    await vite.close();
}
