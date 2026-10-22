import test from 'node:test';
import assert from 'node:assert/strict';
import { classifyLink, trackConversion, initAnalytics } from '../src/services/analytics.js';
import { submitContactMessage } from '../src/services/contact.js';

function browser(url = 'https://kr.verygood-chocolate.com/menu/mochi?email=private@example.com#contact') {
    const events = [];
    return { location: new URL(url), gtag: (...args) => events.push(args), events };
}

test('only the real store phone, map and cake links become conversion intents', () => {
    const cases = [
        ['tel:07078400717', 'phone'],
        ['tel:070-7840-0717', 'phone'],
        ['https://map.naver.com/p/entry/place/1069379954', 'directions'],
        ['https://cake.verygood-chocolate.com/?ref=home', 'cake'],
        ['https://cake.verygood-chocolate.com.evil.example/', null],
        ['https://map.naver.com/p/entry/place/999', null],
        ['tel:01012345678', null],
        ['/#contact', null],
        ['javascript:alert(1)', null],
        ['https://www.instagram.com/verygood_chocolate/', null],
    ];
    for (const [href, expected] of cases) assert.equal(classifyLink(href), expected, href);
});

test('conversion payloads use four distinct names and contain no query, fragment or form data', () => {
    const runtime = browser();
    for (const action of ['phone', 'directions', 'cake', 'contact']) trackConversion(action, 'mochi_visit', runtime);
    assert.deepEqual(runtime.events.map(x => x[1]), ['phone_click', 'directions_click', 'cake_reservation_click', 'generate_lead']);
    assert.deepEqual(runtime.events[0], ['event', 'phone_click', {
        send_to: 'G-TKQQZ2E0DF',
        cta_location: 'mochi_visit',
        page_location: 'https://kr.verygood-chocolate.com/menu/mochi',
    }]);
    assert.doesNotMatch(JSON.stringify(runtime.events), /private@|email=|#contact/);
    trackConversion('phone', 'private@example.com', runtime);
    assert.equal(runtime.events.at(-1)[2].cta_location, 'other');
    trackConversion('unknown', 'footer', runtime);
    assert.equal(runtime.events.length, 5);
});

test('local, preview and admin activity never sends production events, and blocked analytics never breaks actions', () => {
    for (const url of ['http://127.0.0.1:4198/', 'http://localhost:5173/', 'https://preview.verygoodcorp.pages.dev/', 'https://kr.verygood-chocolate.com/admin', 'https://kr.verygood-chocolate.com/admin/edit']) {
        const runtime = browser(url);
        assert.equal(trackConversion('phone', 'footer', runtime), false);
        assert.equal(runtime.events.length, 0);
        assert.equal(initAnalytics(runtime, {}), false);
    }
    assert.equal(trackConversion('phone', 'footer', undefined), false);
    assert.equal(trackConversion('phone', 'footer', { location: browser().location }), false);
    assert.doesNotThrow(() => trackConversion('phone', 'footer', { location: browser().location, gtag() { throw new Error('blocked'); } }));
});

test('one delegated listener records nested or middle clicks once without stopping navigation', () => {
    const runtime = browser();
    const scripts = [];
    const listeners = new Map();
    const document = {
        getElementById: id => scripts.find(x => x.id === id),
        createElement: () => ({}),
        head: { appendChild: script => scripts.push(script) },
        addEventListener: (type, handler) => listeners.set(type, [...(listeners.get(type) || []), handler]),
    };
    assert.equal(initAnalytics(runtime, document), true);
    assert.equal(initAnalytics(runtime, document), false);
    assert.equal(scripts.length, 1);
    assert.equal(scripts[0].src, 'https://www.googletagmanager.com/gtag/js?id=G-TKQQZ2E0DF');
    assert.equal(listeners.get('click').length, 1);
    assert.equal(listeners.get('auxclick').length, 1);
    runtime.events.length = 0;
    const link = {
        getAttribute: name => name === 'href' ? 'https://cake.verygood-chocolate.com/' : null,
        closest: () => ({ dataset: { analyticsLocation: 'footer' } }),
    };
    const target = { closest: () => link };
    let prevented = false;
    const fire = (type, button) => listeners.get(type)[0]({ type, button, target, preventDefault() { prevented = true; } });
    fire('click', 0);
    fire('auxclick', 1);
    fire('auxclick', 2);
    assert.equal(runtime.events.length, 2);
    assert.ok(runtime.events.every(x => x[1] === 'cake_reservation_click' && x[2].cta_location === 'footer'));
    assert.equal(prevented, false);
});

test('an enquiry is counted only after the service accepts it, even if analytics is blocked', async () => {
    const previous = globalThis.window;
    const runtime = browser('https://kr.verygood-chocolate.com/');
    globalThis.window = runtime;
    const fields = { name: 'TEST PRIVATE NAME', email: 'private@example.com', message: 'PRIVATE MESSAGE' };
    try {
        const success = await submitContactMessage(fields, async (url, options) => {
            assert.equal(url, 'https://formspree.io/f/mwvveyoj');
            assert.equal(options.method, 'POST');
            assert.deepEqual(JSON.parse(options.body), fields);
            return new Response('{}', { status: 200 });
        });
        assert.equal(success, true);
        assert.equal(runtime.events.length, 1);
        assert.equal(runtime.events[0][1], 'generate_lead');
        assert.equal(runtime.events[0][2].cta_location, 'contact_form');
        assert.doesNotMatch(JSON.stringify(runtime.events), /PRIVATE|private@example/);
        assert.equal(await submitContactMessage(fields, async () => new Response('{}', { status: 422 })), false);
        await assert.rejects(submitContactMessage(fields, async () => { throw new Error('offline'); }), /offline/);
        assert.equal(runtime.events.length, 1);
        runtime.gtag = () => { throw new Error('blocked'); };
        assert.equal(await submitContactMessage(fields, async () => new Response('{}', { status: 200 })), true);
    } finally {
        if (previous === undefined) delete globalThis.window;
        else globalThis.window = previous;
    }
});
