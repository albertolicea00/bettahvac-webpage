/**
 * Single source of truth for social / listing profile URLs.
 *
 * Unlike contact.js these are public marketing links — no obfuscation needed,
 * scraping them costs us nothing. The point here is one place to edit when a
 * handle changes, and one list to feed the JSON-LD `sameAs` array.
 *
 * `sameAs` is what Google uses to tie the site to the business's profiles, so
 * every real profile belongs in SOCIALS. GOOGLE_BUSINESS is kept separate: it
 * is the listing itself, not a profile that points back at us.
 */

export const SOCIALS = [
  {
    platform: "facebook",
    name: "Facebook",
    url: "https://facebook.com/bettahvac",
    icon: "fa-brands fa-facebook-f",
    label: "Follow bettaHVAC on Facebook",
  },
  {
    platform: "instagram",
    name: "Instagram",
    url: "https://instagram.com/bettahvac",
    icon: "fa-brands fa-instagram",
    label: "Follow bettaHVAC on Instagram",
  },
  {
    platform: "tiktok",
    name: "TikTok",
    url: "https://www.tiktok.com/@bettahvac",
    icon: "fa-brands fa-tiktok",
    label: "Follow bettaHVAC on TikTok",
  },
];

export const GOOGLE_BUSINESS = {
  url: "https://g.page/bettahvac",
  icon: "fa-brands fa-google",
  label: "Find bettaHVAC on Google Business",
  text: "Catch us on Google",
};

/** URLs for the schema.org `sameAs` array. */
export const getSameAs = () => SOCIALS.map((s) => s.url);
