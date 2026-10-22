import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' };
export async function createSeoPreviewServer({ distDir = resolve('dist') } = {}) {
    const manifest = JSON.parse(await readFile(join(distDir, 'seo-routes.json'), 'utf8'));
    return createServer(async (request, response) => {
        const url = new URL(request.url, 'http://localhost');
        const path = url.pathname;
        const normal = path.replace(/\/+$/, '') || '/';
        const htmlRoute = path.endsWith('.html') ? path.slice(0, -5) : null;
        const destination = (htmlRoute && manifest.routes[htmlRoute] ? htmlRoute : null) || manifest.redirects[normal] || (normal !== path && (manifest.routes[normal] || /^\/blog\/[^/]+$/.test(normal)) ? normal : null);
        if (destination) { response.writeHead(301, { location: `${destination}${url.search}` }); response.end(); return; }
        const send = async (file, status = 200) => {
            const body = await readFile(file);
            response.writeHead(status, { 'content-type': MIME[extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' });
            response.end(body);
        };
        try {
            if (manifest.routes[path]) return await send(join(distDir, manifest.routes[path].slice(1)), path === '/404' ? 404 : 200);
            if (/^\/blog\/[^/]+$/.test(path)) return await send(join(distDir, manifest.blogFallback.slice(1)));
            const candidate = resolve(distDir, `.${path}`);
            if (candidate.startsWith(`${resolve(distDir)}/`)) {
                try { return await send(candidate); } catch (error) { if (!['ENOENT', 'EISDIR'].includes(error.code)) throw error; }
            }
            await send(join(distDir, '404.html'), 404);
        } catch { response.writeHead(500); response.end('Preview server error'); }
    });
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    const server = await createSeoPreviewServer();
    const port = Number(process.env.PORT || 4197);
    server.listen(port, '127.0.0.1', () => console.log(`SEO preview: http://127.0.0.1:${port}`));
}
