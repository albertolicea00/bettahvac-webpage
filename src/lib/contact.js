/**
 * Single source of truth for contact details, lightly obfuscated against
 * scrapers. Values are stored reversed + base64-encoded so bots scanning
 * the built JS bundle (or the repo) for `mailto:`, `tel:`, phone patterns,
 * or email regexes find nothing. Decoding only happens at runtime in the
 * browser, right before render.
 *
 * This defeats plain-text harvesters, not headless browsers that execute
 * JS — nothing client-side can. To update a value, run:
 *   node -e 'console.log(Buffer.from("NEW VALUE".split("").reverse().join("")).toString("base64"))'
 */

/** @param {string} encoded */
const decode = (encoded) => atob(encoded).split("").reverse().join("");

// "fake@bettahvac.com"
const EMAIL = "bW9jLmNhdmhhdHRlYkBla2Fm";
// "(555) 123-4567" — display format
const PHONE_DISPLAY = "NzY1NC0zMjEgKTU1NSg=";
// "1-800-911-HVAC" — tel: href format
const PHONE_TEL = "Q0FWSC0xMTktMDA4LTE=";
// "15551234567" — WhatsApp number (country code + number, digits only)
const WHATSAPP = "NzY1NDMyMTU1NTE=";

export const getEmail = () => decode(EMAIL);
export const getEmailHref = () => `mailto:${decode(EMAIL)}`;
export const getPhoneDisplay = () => decode(PHONE_DISPLAY);
export const getPhoneHref = () => `tel:${decode(PHONE_TEL)}`;
export const getWhatsAppHref = () => `https://wa.me/${decode(WHATSAPP)}`;
