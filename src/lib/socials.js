/**
 * Single source of truth for social / listing profile URLs.
 *
 * These are public marketing links — no obfuscation needed. Keeping them here
 * centralizes handle updates and feeds the JSON-LD `sameAs` array.
 *
 * All outbound profile URLs include a shared UTM parameter (`utm_source=website`)
 * so traffic from the site is consistently tagged in analytics.
 *
 * `sameAs` ties the site to the business’s profiles. SOCIALS contains every
 * real profile; GOOGLE_BUSINESS is the listing itself, not a profile pointing back.
 */

const UTM_SOURCE = "website";

export const SOCIALS = [
  {
    platform: "facebook",
    name: "Facebook",
    url: `https://www.facebook.com/profile.php?id=100087412164195&utm_source=${UTM_SOURCE}`,
    icon: "fa-brands fa-facebook-f",
    label: "Follow bettaHVAC on Facebook",
  },
  {
    platform: "instagram",
    name: "Instagram",
    url: `https://www.instagram.com/bettahvacllc?utm_source=${UTM_SOURCE}`,
    icon: "fa-brands fa-instagram",
    label: "Follow bettaHVAC on Instagram",
  },
  {
    platform: "tiktok",
    name: "TikTok",
    url: `https://www.tiktok.com/@bettahvac?utm_source=${UTM_SOURCE}`,
    icon: "fa-brands fa-tiktok",
    label: "Follow bettaHVAC on TikTok",
  },
];

export const GOOGLE_BUSINESS = {
  url: `https://g.page/bettahvac?utm_source=${UTM_SOURCE}`,
  icon: "fa-brands fa-google",
  label: "Find bettaHVAC on Google Business",
  text: "Catch us on Google",
};

/** URLs for the schema.org `sameAs` array. */
export const getSameAs = () => SOCIALS.map((s) => s.url);
