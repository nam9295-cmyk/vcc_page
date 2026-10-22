import { PassThrough } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppRoutes } from './App';

// Rendering the actual route tree keeps the initial HTML identical for people
// and crawlers. Effects (Firebase reads, contact submission) stay client-side.
export function render(pathname) {
    return new Promise((resolve, reject) => {
        let html = '';
        const output = new PassThrough();
        output.on('data', chunk => { html += chunk.toString(); });
        output.on('end', () => resolve(html));
        output.on('error', reject);
        const stream = renderToPipeableStream(
            <StaticRouter location={pathname}><AppRoutes /></StaticRouter>,
            { onAllReady() { stream.pipe(output); }, onError: reject }
        );
    });
}
