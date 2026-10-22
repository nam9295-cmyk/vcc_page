const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const meta = (attribute, key, value) => value === undefined ? '' : `<meta data-vg-seo ${attribute}="${key}" content="${escape(value)}">`;

// A single renderer keeps the build output and in-app navigation identical.
export function renderHead(config) {
    return [
        `<title data-vg-seo>${escape(config.title)}</title>`,
        meta('name', 'description', config.description),
        meta('name', 'robots', config.robots),
        config.canonical ? `<link data-vg-seo rel="canonical" href="${escape(config.canonical)}">` : '',
        meta('property', 'og:type', config.ogType),
        meta('property', 'og:locale', 'ko_KR'),
        meta('property', 'og:site_name', '베리굿초콜릿'),
        meta('property', 'og:title', config.title),
        meta('property', 'og:description', config.description),
        meta('property', 'og:url', config.canonical),
        meta('property', 'og:image', config.image),
        meta('property', 'og:image:alt', config.imageAlt),
        meta('property', 'og:image:width', config.imageWidth),
        meta('property', 'og:image:height', config.imageHeight),
        meta('property', 'og:image:type', config.imageType),
        meta('name', 'twitter:card', 'summary_large_image'),
        meta('name', 'twitter:title', config.title),
        meta('name', 'twitter:description', config.description),
        meta('name', 'twitter:image', config.image),
        meta('name', 'twitter:image:alt', config.imageAlt),
        config.structuredData.length ? `<script data-vg-seo type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': config.structuredData }).replaceAll('<', '\\u003c')}</script>` : ''
    ].filter(Boolean).join('\n');
}

export function applySeo(config) {
    document.head.querySelectorAll('[data-vg-seo], title').forEach(node => node.remove());
    const template = document.createElement('template');
    template.innerHTML = renderHead(config);
    document.head.appendChild(template.content);
}
