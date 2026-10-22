import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
const read = path => readFile(new URL(`../dist/${path}`, import.meta.url), 'utf8');

test('initial homepage contains the approved three photos and usable content without JavaScript', async () => {
  const html = await read('index.html');
  assert.match(html, /<h1[^>]*>리얼 가나슈 초코 모찌<\/h1>/);
  for (const name of ['chocolate', 'grape', 'mandarin']) assert.match(html, new RegExp(`/mochi/${name}\\.webp`));
  assert.match(html, /070-7840-0717/);
  assert.match(html, /10:00–22:00/);
  assert.match(html, /상록로11길 13/);
  assert.doesNotMatch(html, /평일 오전 8시|주말 및 공휴일은 휴무/);
  assert.match(html, /f381edfee0513a095b3aba6fbe1af95cc27b3b6e/);
  assert.match(html, /GutXtq4RPC6uLHTJ4HZJ_YFwDlGY5pgNmPWpdM4ZNxI/);
});

test('mochi route contains all five descriptions, anchors, FAQ and a single consistent head', async () => {
  let html;
  try { html = await read('menu/mochi.html'); } catch { assert.fail('route-specific mochi HTML must be generated'); }
  for (const flavor of ['오리지널', '두바이', '샤인머스켓', '제주감귤', '앙버터']) assert.ok(html.includes(flavor));
  assert.match(html, /id="original"/);
  assert.match(html, /초콜릿 가나슈/);
  assert.match(html, /자주 묻는 질문/);
  assert.equal((html.match(/<title[ >]/g) || []).length, 1);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
  assert.equal((html.match(/name="description"/g) || []).length, 1);
  assert.match(html, /https:\/\/kr\.verygood-chocolate\.com\/menu\/mochi"/);
  const graph = JSON.parse(html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)[1]);
  assert.ok(graph['@graph'].some(x => x['@type'] === 'Menu'));
  for (const [, path] of html.matchAll(/(?:src|href)="(\/assets\/[^"#?]+)"/g)) await access(new URL(`../dist${path}`, import.meta.url));
  assert.match(html, /<link[^>]*rel="stylesheet"[^>]*MochiMenuPage/);
});

test('robots and text summaries allow search but do not leak outdated business information', async () => {
  const robots = await read('robots.txt');
  assert.match(robots, /User-agent: OAI-SearchBot/);
  assert.match(robots, /Sitemap: https:\/\/kr\.verygood-chocolate\.com\/sitemap.xml/);
  for (const block of robots.split(/\n\s*\n/).filter(x => x.includes('User-agent:'))) assert.match(block, /Disallow: \/admin/);
  for (const file of ['llms.txt', 'llms-full.txt']) {
    const text = await read(file);
    assert.match(text, /초코모찌/);
    assert.match(text, /10:00–22:00/);
    assert.doesNotMatch(text, /08:00|원데이 클래스|평일 영업/);
  }
});
