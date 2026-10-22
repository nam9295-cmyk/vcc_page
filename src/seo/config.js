import { mochiDescription, mochiFlavors } from '../data/mochi.js';
import { store } from '../data/store.js';
import { menuGroups } from '../data/menuGroups.js';

export const SITE_URL = 'https://kr.verygood-chocolate.com';
const STORE_ID = `${SITE_URL}/#store`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const DEFAULT_IMAGE = `${SITE_URL}/mochi/chocolate.webp`;
const INDEX = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
const NOINDEX = 'noindex, follow';

const menuNames = { chocolate: '초콜릿 음료', ade: '에이드', detox: '카카오 티', noncoffee: '논커피', tiramisu: '티라미수', bread: '베이커리', dubai: '두바이 디저트', granola: '카카오 그래놀라바' };
const staticPages = {
    '/': { title: '대구 초코모찌 · 수성구 베리굿초콜릿', description: '대구 수성구 베리굿초콜릿의 리얼 가나슈 초코모찌. 오리지널, 두바이, 샤인머스켓, 제주감귤, 앙버터 5종을 만나보세요. 상록로11길 13, 매일 10:00–22:00.' },
    '/menu': { title: '초코모찌·음료·디저트 메뉴 | 대구 베리굿초콜릿', description: '베리굿초콜릿의 초코모찌 5종부터 초콜릿 음료, 에이드, 논커피, 티라미수, 베이커리와 그래놀라까지 메뉴를 확인하세요.' },
    '/menu/mochi': { title: '초코모찌 5가지 맛 | 대구 수성구 베리굿초콜릿', description: mochiDescription },
    '/about': { title: '회사소개 | 베리굿초콜릿', description: '대구 베리굿초콜릿의 브랜드와 회사 정보를 소개합니다.' },
    '/business-story': { title: '브랜드 스토리 | 베리굿초콜릿', description: '베리굿초콜릿의 시작과 초콜릿에 담은 이야기를 만나보세요.' },
    '/blog': { title: '초콜릿 이야기 | 베리굿초콜릿 블로그', description: '베리굿초콜릿의 초콜릿 이야기, 레시피와 새로운 소식을 확인하세요.' },
    '/privacy': { title: '개인정보처리방침 | 베리굿초콜릿', description: '베리굿초콜릿의 개인정보처리방침입니다.', noindex: true },
    '/terms': { title: '이용약관 | 베리굿초콜릿', description: '베리굿초콜릿 웹사이트의 이용약관입니다.', noindex: true },
    '/admin': { title: '관리자 | 베리굿초콜릿', description: '베리굿초콜릿 관리자 페이지입니다.', noindex: true },
    '/404': { title: '페이지를 찾을 수 없습니다 | 베리굿초콜릿', description: '요청하신 페이지를 찾을 수 없습니다.', noindex: true }
};
for (const group of menuGroups.filter(x => x.id !== 'mochi' && !x.href)) {
    staticPages[`/menu/${group.id}`] = {
        title: `${menuNames[group.id]} | 대구 베리굿초콜릿`,
        description: group.id === 'granola' ? '오트밀, 견과류, 카카오닙, 다크초콜릿을 한 조각에 담은 베리굿의 수제 카카오 그래놀라바.' : group.desc,
        image: `${SITE_URL}${group.repImage}`
    };
}
export const REDIRECTS = {
    '/granola': '/menu/granola',
    ...Object.fromEntries(menuGroups.flatMap(group => group.aliases.map(alias => [`/menu/${alias}`, `/menu/${group.id}`]))),
    '/menu/cake': store.cake
};
export const STATIC_PATHS = Object.keys(staticPages);
export const INDEXABLE_PATHS = STATIC_PATHS.filter(path => !staticPages[path].noindex);
export function normalizePath(pathname) {
    return (pathname.split(/[?#]/)[0] || '/').replace(/\/+$/, '') || '/';
}

function businessSchema() {
    return {
        '@type': 'Bakery', '@id': STORE_ID,
        name: store.name, alternateName: [store.englishName, '베리굿 초콜릿'],
        url: `${SITE_URL}/`, image: DEFAULT_IMAGE,
        description: mochiDescription,
        telephone: store.internationalPhone,
        address: { '@type': 'PostalAddress', streetAddress: store.streetAddress, addressLocality: '수성구', addressRegion: '대구광역시', addressCountry: 'KR' },
        areaServed: { '@type': 'City', name: '대구광역시' },
        openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => `https://schema.org/${day}`), opens: store.opens, closes: store.closes },
        hasMap: store.googleMap,
        hasMenu: `${SITE_URL}/menu`,
        sameAs: [store.naverMap, store.googleMap, store.instagram, store.cake]
    };
}

function menuSchema() {
    return {
        '@type': 'Menu', '@id': `${SITE_URL}/menu/mochi#menu`,
        name: '베리굿초콜릿 리얼 가나슈 초코모찌', description: mochiDescription,
        url: `${SITE_URL}/menu/mochi`, inLanguage: 'ko-KR', image: DEFAULT_IMAGE,
        provider: { '@id': STORE_ID },
        hasMenuSection: { '@type': 'MenuSection', name: '초코 모찌 5종', hasMenuItem: mochiFlavors.map(flavor => ({
            '@type': 'MenuItem', '@id': `${SITE_URL}/menu/mochi#${flavor.id}`,
            name: flavor.name, description: flavor.description, url: `${SITE_URL}/menu/mochi#${flavor.id}`,
            ...(flavor.image ? { image: `${SITE_URL}${flavor.image}` } : {})
        })) }
    };
}

function breadcrumbs(path, title) {
    const items = [{ name: '홈', item: `${SITE_URL}/` }];
    if (path.startsWith('/menu/')) items.push({ name: '메뉴', item: `${SITE_URL}/menu` });
    items.push({ name: title.split(' | ')[0], item: `${SITE_URL}${path}` });
    return { '@type': 'BreadcrumbList', '@id': `${SITE_URL}${path}#breadcrumb`, itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, ...item })) };
}

export function getSeoConfig(pathname, { post, missing = false } = {}) {
    const requested = normalizePath(pathname);
    const path = REDIRECTS[requested] || requested;
    const blogDetail = /^\/blog\/[^/]+$/.test(path);
    const page = missing ? staticPages['/404'] : post && blogDetail ? {
        title: `${post.title} | 베리굿초콜릿 블로그`, description: post.summary || '베리굿초콜릿의 초콜릿 이야기를 만나보세요.', image: post.imageUrl, ogType: 'article'
    } : staticPages[path] || (blogDetail ? staticPages['/blog'] : staticPages['/404']);
    const canonical = path.startsWith('https:') ? path : blogDetail && !post || page === staticPages['/404'] ? undefined : `${SITE_URL}${path}`;
    const config = {
        title: page.title, description: page.description, canonical,
        robots: page.noindex ? NOINDEX : INDEX,
        image: page.image || DEFAULT_IMAGE,
        imageAlt: page.image ? page.title.split(' | ')[0] : mochiFlavors[0].imageAlt,
        ...(!page.image ? { imageWidth: 1080, imageHeight: 1012, imageType: 'image/webp' } : {}),
        ogType: page.ogType || 'website', structuredData: []
    };
    if (!canonical || page.noindex || path.startsWith('https:')) return config;
    config.structuredData = [businessSchema(), { '@type': 'WebSite', '@id': WEBSITE_ID, name: store.name, alternateName: store.englishName, url: `${SITE_URL}/`, inLanguage: 'ko-KR', publisher: { '@id': STORE_ID } }, {
        '@type': path === '/menu' || path === '/menu/mochi' ? 'CollectionPage' : 'WebPage', '@id': `${canonical}#webpage`, url: canonical, name: page.title, description: page.description, inLanguage: 'ko-KR', isPartOf: { '@id': WEBSITE_ID }, about: { '@id': STORE_ID }, ...(path === '/menu/mochi' ? { mainEntity: { '@id': `${canonical}#menu` } } : {})
    }];
    if (path !== '/') config.structuredData.push(breadcrumbs(path, page.title));
    if (path === '/menu/mochi') config.structuredData.push(menuSchema());
    return config;
}
