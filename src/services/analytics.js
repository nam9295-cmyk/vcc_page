import { store } from '../data/store.js';

const ORIGIN = 'https://kr.verygood-chocolate.com';
const MEASUREMENT_ID = 'G-TKQQZ2E0DF';
const SCRIPT_ID = 'vg-analytics';
const EVENTS = { phone: 'phone_click', directions: 'directions_click', cake: 'cake_reservation_click', contact: 'generate_lead' };
const LOCATIONS = new Set(['home_location', 'home_cake', 'mochi_visit', 'menu', 'footer', 'contact_form']);

function isProduction(runtime) {
    return runtime?.location?.origin === ORIGIN && !/^\/admin(?:\/|$)/.test(runtime.location.pathname);
}

export function classifyLink(href) {
    try {
        const url = new URL(href, ORIGIN);
        if (url.protocol === 'tel:' && url.pathname.replace(/[\s()-]/g, '') === '07078400717') return 'phone';
        if (url.origin === new URL(store.cake).origin) return 'cake';
        for (const map of [store.naverMap, store.googleMap]) {
            const target = new URL(map);
            if (url.origin === target.origin && url.pathname === target.pathname) return 'directions';
        }
    } catch { /* Unrelated or malformed links are not measured. */ }
    return null;
}

export function trackConversion(action, placement, runtime = globalThis.window) {
    if (!Object.hasOwn(EVENTS, action) || !isProduction(runtime) || typeof runtime.gtag !== 'function') return false;
    try {
        runtime.gtag('event', EVENTS[action], {
            send_to: MEASUREMENT_ID,
            cta_location: LOCATIONS.has(placement) ? placement : 'other',
            // Never include input values, URL queries or fragments in custom events.
            page_location: ORIGIN + runtime.location.pathname,
        });
        return true;
    } catch {
        // Analytics must never prevent a phone link, navigation or successful enquiry.
        return false;
    }
}

export function initAnalytics(runtime = globalThis.window, document = globalThis.document) {
    if (!isProduction(runtime) || !document || document.getElementById(SCRIPT_ID)) return false;
    try {
        runtime.dataLayer = runtime.dataLayer || [];
        runtime.gtag = runtime.gtag || function () { runtime.dataLayer.push(arguments); };
        runtime.gtag('js', new Date());
        runtime.gtag('config', MEASUREMENT_ID);
        const script = document.createElement('script');
        script.id = SCRIPT_ID;
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
        document.head.appendChild(script);

        const handleClick = event => {
            if (event.type === 'auxclick' && event.button !== 1) return;
            const link = event.target?.closest?.('a[href]');
            if (!link) return;
            const action = classifyLink(link.getAttribute('href'));
            if (!action) return;
            const placement = link.closest('[data-analytics-location]')?.dataset.analyticsLocation;
            trackConversion(action, placement, runtime);
        };
        // One listener survives React navigation and is outside StrictMode effects.
        document.addEventListener('click', handleClick, true);
        document.addEventListener('auxclick', handleClick, true);
        return true;
    } catch {
        return false;
    }
}
