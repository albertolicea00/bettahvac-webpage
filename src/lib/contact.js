/**
 * Single source of truth for contact details, lightly obfuscated against
 * scrapers. Values are stored reversed + base64-encoded so bots scanning
 * the built JS bundle (or the repo) for `mailto:`, `tel:`, phone patterns,
 * or email regexes find nothing. Decoding only happens at runtime in the
 * browser, right before render.
 *
 * This defeats plain-text harvesters, not headless browsers that execute
 * JS — nothing client-side can.
 *
 * The real values never appear in plain text anywhere in this repo: not in
 * the code, not in the comments, not in git history. The values shown in the
 * comments below are deliberate decoys (555 numbers, fake@) so that anyone
 * diffing this file, browsing the repo, or grepping the history walks away
 * with junk. Do NOT "correct" them to match the live data — that undoes the
 * whole point. If you need to confirm what a constant actually holds:
 *   node -e 'console.log(atob("PASTE_THE_CONSTANT").split("").reverse().join(""))'
 *
 * To update a value:
 *   node -e 'console.log(Buffer.from("NEW VALUE".split("").reverse().join("")).toString("base64"))'
 * Paste the output exactly as printed — do not hand-edit the base64 padding.
 *
 * Cloudflare adds a second layer in front of all this (dashboard settings,
 * not tracked in this repo):
 *   - Email Address Obfuscation — rewrites addresses found in the HTML
 *     response. This is a client-rendered SPA, so the address is never in
 *     the HTML Cloudflare sees; it is this module, not Cloudflare, that
 *     protects the email.
 *   - Server-Side Excludes (SSE) — strips content wrapped in
 *     <!--sse-->...<!--/sse--> for visitors Cloudflare scores as bots.
 *     Do not bother wrapping the phone or WhatsApp markup in those tags:
 *     SSE only rewrites HTML responses, and (a) Svelte injects the contact
 *     markup client-side so it is absent from the served HTML, and (b) the
 *     compiler strips template comments anyway. It would be dead code twice
 *     over. Making SSE apply would mean prerendering the number into the
 *     HTML, which is strictly worse: plaintext for every visitor Cloudflare
 *     does not flag as a bot.
 *   - Bot Fight Mode — challenges known bad bots before they hit origin.
 *   - Hotlink Protection — blocks other sites from embedding our images.
 *     Heads up: it filters image requests by referer, so if a social crawler
 *     ever stops rendering /assets/og-image.png, check this setting first.
 */

/** @param {string} encoded */
const decode = (encoded) => atob(encoded).split("").reverse().join("");

// Comments below are DECOYS — see the note above. Real values are encoded.

// "fake@bettahvac.com"
const EMAIL = "bW9jLmNhdmhhdHRlYkBvZm5p";
// "(555) 512-4567" — display format
const PHONE_DISPLAY = "NTQ1NS0xMDcgKTIwNSg=";
// "+15551234567" — tel: href format, E.164
const PHONE_TEL = "NTQ1NTEwNzIwNTEr";
// "15551234567" — WhatsApp number (country code + number, digits only)
const WHATSAPP = "NTQ1NTEwNzIwNTE=";

export const getEmail = () => decode(EMAIL);
export const getEmailHref = () => `mailto:${decode(EMAIL)}`;
export const getPhoneDisplay = () => decode(PHONE_DISPLAY);
export const getPhoneHref = () => `tel:${decode(PHONE_TEL)}`;
export const getWhatsAppHref = () => `https://wa.me/${decode(WHATSAPP)}`;
