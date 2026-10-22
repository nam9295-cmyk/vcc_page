import test from 'node:test';
import assert from 'node:assert/strict';
import { getSeoConfig, INDEXABLE_PATHS, REDIRECTS, SITE_URL } from '../src/seo/config.js';
import { renderHead } from '../src/seo/head.js';
import { mochiFlavors } from '../src/data/mochi.js';

test('home and mochi have distinct production canonicals and local search copy', () => {
  const home = getSeoConfig('/');
  const mochi = getSeoConfig('/menu/mochi/?utm_source=test');
  assert.equal(home.canonical, `${SITE_URL}/`);
  assert.equal(mochi.canonical, `${SITE_URL}/menu/mochi`);
  assert.match(home.title, /대구 초코모찌/);
  assert.notEqual(home.title, mochi.title);
  assert.match(mochi.description, /다섯 가지/);
  assert.match(home.robots, /max-image-preview:large/);
});

test('business facts are owner-confirmed and connected to the same Korean store', () => {
  const store = getSeoConfig('/').structuredData.find(x => x['@type'] === 'Bakery');
  assert.equal(store.telephone, '+82-70-7840-0717');
  assert.equal(store.address.streetAddress, '상록로11길 13 1층');
  assert.equal(store.address.addressLocality, '수성구');
  assert.equal(store.openingHoursSpecification.opens, '10:00');
  assert.equal(store.openingHoursSpecification.closes, '22:00');
  assert.equal(store.openingHoursSpecification.dayOfWeek.length, 7);
  assert.ok(store.sameAs.some(x => x.includes('1069379954')));
  assert.ok(store.sameAs.some(x => x.includes('0x1d7a49a8c0b84ae1')));
  assert.ok(!store.sameAs.some(x => x.includes('au.')));
});

test('mochi schema describes exactly the visible five flavors without invented offers', () => {
  const graph = getSeoConfig('/menu/mochi').structuredData;
  const menu = graph.find(x => x['@type'] === 'Menu');
  const items = menu.hasMenuSection.hasMenuItem;
  assert.equal(items.length, 5);
  assert.deepEqual(items.map(x => [x.name, x.description]), mochiFlavors.map(x => [x.name, x.description]));
  assert.doesNotMatch(JSON.stringify(graph), /aggregateRating|reviewCount|priceCurrency|availability|"geo"/);
  assert.ok(items.every(x => x.url.startsWith(`${SITE_URL}/menu/mochi#`)));
});

test('aliases resolve to canonical destinations; public sitemap excludes aliases and private routes', () => {
  for (const [alias, target] of Object.entries(REDIRECTS)) {
    assert.equal(getSeoConfig(alias).canonical, target.startsWith('https:') ? target : `${SITE_URL}${target}`);
    assert.ok(!INDEXABLE_PATHS.includes(alias));
  }
  for (const path of INDEXABLE_PATHS) {
    assert.equal(getSeoConfig(path).canonical, `${SITE_URL}${path}`);
    assert.doesNotMatch(getSeoConfig(path).robots, /noindex/);
  }
  assert.match(getSeoConfig('/admin').robots, /noindex/);
  assert.match(getSeoConfig('/nonexistent').robots, /noindex/);
});

test('dynamic blog shell never claims the homepage canonical; loaded and missing posts update correctly', () => {
  assert.equal(getSeoConfig('/blog/abc').canonical, undefined);
  const post = getSeoConfig('/blog/abc', { post: { title: '초콜릿 이야기', summary: '가나슈를 소개합니다.' } });
  assert.equal(post.canonical, `${SITE_URL}/blog/abc`);
  assert.match(post.title, /초콜릿 이야기/);
  assert.equal(post.ogType, 'article');
  assert.match(getSeoConfig('/blog/abc', { missing: true }).robots, /noindex/);
});

test('head rendering escapes content and only emits one canonical and one graph', () => {
  const config = getSeoConfig('/menu/mochi');
  const head = renderHead({ ...config, title: '<script>bad</script> & "title"' });
  assert.match(head, /&lt;script&gt;/);
  assert.doesNotMatch(head, /<script>bad/);
  assert.equal((head.match(/rel="canonical"/g) || []).length, 1);
  assert.equal((head.match(/application\/ld\+json/g) || []).length, 1);
  const unsafe = renderHead({ ...config, structuredData: [{ text: '</script><script>bad</script>' }] });
  assert.doesNotMatch(unsafe, /<script>bad/);
});
