import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createSeoPreviewServer } from '../scripts/preview-seo-pages.mjs';
import { INDEXABLE_PATHS, REDIRECTS } from '../src/seo/config.js';

test('canonical pages are HTTP 200 and sitemap entries match generated indexable routes', async () => {
    const server = await createSeoPreviewServer();
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    try {
        const origin = `http://127.0.0.1:${server.address().port}`;
        const sitemap = await readFile(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
        assert.equal((sitemap.match(/<url>/g) || []).length, INDEXABLE_PATHS.length);
        for (const path of INDEXABLE_PATHS) {
            const response = await fetch(`${origin}${path}`);
            assert.equal(response.status, 200, path);
            const html = await response.text();
            assert.match(html, /<h1[ >]/, path);
            assert.ok(sitemap.includes(`<loc>https://kr.verygood-chocolate.com${path}</loc>`), path);
            assert.ok(html.includes(`rel="canonical" href="https://kr.verygood-chocolate.com${path}"`), path);
        }
        assert.doesNotMatch(sitemap, /<loc>[^<]*(?:\/admin|\/404|\/privacy|\/terms|\/hot-chocolate)/);
    } finally { await new Promise(resolve => server.close(resolve)); }
});

test('trailing slashes, legacy menu aliases and html URLs redirect to a single canonical', async () => {
    const server = await createSeoPreviewServer();
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    try {
        const origin = `http://127.0.0.1:${server.address().port}`;
        for (const [path, target] of [...Object.entries(REDIRECTS), ['/menu/mochi/', '/menu/mochi'], ['/menu/mochi.html', '/menu/mochi']]) {
            const response = await fetch(`${origin}${path}?ref=test`, { redirect: 'manual' });
            assert.equal(response.status, 301, path);
            assert.equal(response.headers.get('location'), `${target}?ref=test`, path);
        }
    } finally { await new Promise(resolve => server.close(resolve)); }
});

test('unknown static routes return 404; published or future blog IDs retain client routing', async () => {
    const server = await createSeoPreviewServer();
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    try {
        const origin = `http://127.0.0.1:${server.address().port}`;
        for (const path of ['/missing', '/menu/missing', '/blog/too/many/segments']) {
            const response = await fetch(`${origin}${path}`);
            assert.equal(response.status, 404, path);
            assert.match(await response.text(), /noindex, follow/);
        }
        const explicit404 = await fetch(`${origin}/404`);
        assert.equal(explicit404.status, 200, 'the explicit 404 file follows Cloudflare static-file behavior');
        assert.match(await explicit404.text(), /noindex, follow/);
        const blog = await fetch(`${origin}/blog/future-post`);
        assert.equal(blog.status, 200);
        assert.doesNotMatch(await blog.text(), /rel="canonical"/);
        const admin = await fetch(`${origin}/admin`);
        assert.equal(admin.status, 200);
        assert.match(await admin.text(), /noindex, follow/);
    } finally { await new Promise(resolve => server.close(resolve)); }
});
