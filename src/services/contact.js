import { trackConversion } from './analytics.js';

export async function submitContactMessage(formState, fetchImpl = globalThis.fetch) {
    const response = await fetchImpl('https://formspree.io/f/mwvveyoj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
    });
    if (response.ok) trackConversion('contact', 'contact_form');
    return response.ok;
}
