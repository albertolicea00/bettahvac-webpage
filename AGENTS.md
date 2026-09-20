# AGENTS.md — Engineering guide for BettaHVAC

Operating manual for anyone (human or AI) working in this repo. Pair this with `DESIGN.md` (the visual system). `CLAUDE.md` just points here.

## What this is

`bettahvac-landing` — a single-page marketing site for an HVAC business in Lexington, KY. Static SPA, no backend. Deployed behind Cloudflare (dashboard config, **not** in this repo).

## Stack

- **Svelte 5** (runes mode) — `svelte@^5.45`
- **Vite 7** — dev server + bundler
- **Vanilla CSS** — no Tailwind / UI framework. Global tokens in `src/app.css`, per-component styles scoped in `<style>` blocks.
- **JS + JSDoc** (not TypeScript), but type-checked: `jsconfig.json` sets `checkJs: true`. Keep JSDoc types accurate — they're enforced.
- No test suite, no linter config, no CI in-repo.

## Commands

```bash
npm run dev       # Vite dev server
npm run build     # production build → dist/
npm run preview   # serve the built dist/
npm run check     # svelte-check type check (uses jsconfig.json, checkJs)
```

## Layout

```
index.html                 # entry HTML; pre-paint theme script; meta/OG; Font Awesome CDN
src/
  main.js                  # mounts App into #app (Svelte 5 mount())
  app.css                  # design tokens + global primitives (see DESIGN.md)
  App.svelte               # page composition + <svelte:head> SEO/JSON-LD
  lib/
    clarity.js             # SINGLE SOURCE for Microsoft Clarity analytics
    contact.js             # SINGLE SOURCE for phone/email/WhatsApp — obfuscated (read §Contact)
    socials.js             # SINGLE SOURCE for social/listing URLs + sameAs
    ReviewService.js       # reviews data layer (mock now, API-ready)
    actions/reveal.js      # use:reveal scroll-entrance action
    components/            # Navbar, Hero, About, Reviews, Services, FAQ, Contact, Footer,
                           # FixedSocials, ThemeToggle
public/assets/             # images (hot/cold variants), sprites, patterns, logos, og-image
scripts/                   # local Python image tools (NOT part of the build)
```

## Architecture

`main.js` mounts `App.svelte` into `#app`. `App.svelte` owns the page structure and renders sections in this order inside `<main id="main-content">`:

`Navbar` → (`FixedSocials`) → `Hero` → `About` → `Reviews` → `Services` → `FAQ` → `Contact`, then `Footer` outside `<main>`.

Section anchors used by the navbar: `#about`, `#reviews`, `#services`, `#faq`, `#contact` (Hero is the top). If you rename/reorder a section, update `navLinks` in `Navbar.svelte` and the `sitemap.xml` if relevant.

## Conventions

- **Svelte 5 runes only** — `$state`, `$derived`, etc. No Svelte stores, no Svelte 4 `export let`. Event handlers are attributes (`onclick={...}`), not `on:click`.
- **Single-source modules** — contact details and social URLs each have exactly one module (`contact.js`, `socials.js`). Never inline a phone number, email, or social URL in a component; import the getter.
- **Tokens over literals** — style with `var(--color-*)` etc. so components track the active theme (see DESIGN.md §Theme).
- **Reuse primitives** — `.btn*`, `.glass-panel`, `.section`, `.section-alt`, `use:reveal` before writing new CSS.
- **Accessibility is a requirement, not a nice-to-have** — see DESIGN.md §8. Preserve skip link, focus-visible rings, reduced-motion guards, dialog/radiogroup semantics.
- **Match the surrounding code** — comment density here is high and explains *why* (esp. the anti-scraping and theme-sync notes). Keep that.

## Contact details & anti-scraping (READ BEFORE TOUCHING `contact.js`)

`src/lib/contact.js` is the only place contact data lives. Values are stored **reversed + base64-encoded** and decoded at runtime, so bots grepping the repo or bundle for `mailto:`/`tel:`/phone patterns find nothing.

**Critical rule:** the human-readable comments next to each constant (`fake@`, `555` numbers) are **deliberate decoys**. Do **not** "fix" them to match the live values — that defeats the entire mechanism and leaks the real data into git.

To inspect or update a constant, use the commands documented in the file header:

```bash
# decode (verify) a constant
node -e 'console.log(atob("PASTE_THE_CONSTANT").split("").reverse().join(""))'
# encode a new value
node -e 'console.log(Buffer.from("NEW VALUE".split("").reverse().join("")).toString("base64"))'
```

Consumed by `Contact.svelte` and `Footer.svelte`. Those blocks are wrapped in `<!--sse-->…<!--/sse-->` as an intent marker for Cloudflare Server-Side Excludes — note the Svelte compiler strips template comments, so it's a marker, not a live feature in this client-rendered SPA. This defeats plain-text harvesters, **not** headless browsers that execute JS — that limit is accepted by design. See the `contact.js` header and `README.md` for the full Cloudflare edge-hardening context.

## Reviews data layer

`ReviewService.js` exposes `fetchReviews()` and `postReview()`. Today `API_ENDPOINT = null`, so both use bundled mock data with a simulated delay. To go live, set `API_ENDPOINT` — the fetch/POST paths are already written and fall back to local on error. `Reviews.svelte` does optimistic prepend on submit and has a honeypot (`oh-no-bots` off-screen field) for spam; keep both when editing.

## Theme handling

Two-place logic that MUST stay identical (see DESIGN.md §1): the pre-paint script in `index.html` and `ThemeToggle.svelte`. Both resolve `localStorage["hvac-theme"]` → else `prefers-color-scheme`. When adding themed assets or tokens, add **both** `hot` and `cold` variants.

## Assets & image scripts

Art ships as hot/cold pairs in `public/assets/` (see DESIGN.md §7). The Python tools in `scripts/` are **local dev utilities, not part of `npm run build`**:

- `convert_to_webp.py` — optimize images to WebP (needs Pillow). Defaults: quality 78, lossy, method 6.
- `normalize_sprites.py` — pads hot/cold sprite variants onto a common 700×700 canvas so they render at equal size under `object-fit: contain`. Run after regenerating sprites. Note it has a **hardcoded absolute path** to `public/assets/generated` — update it if the repo moves.
- `og-image.src.svg` — source for the Open Graph image.

## SEO

- `App.svelte` `<svelte:head>` holds title, description, canonical, Open Graph / Twitter meta, and two JSON-LD blocks (`HVACBusiness` LocalBusiness + `FAQPage`), injected via `{@html}`. The `sameAs` array is fed from `socials.js` `getSameAs()` — add real profiles there, not inline.
- `index.html` `<head>` carries the OG image meta and favicons.
- `public/robots.txt` + `public/sitemap.xml` — bump `<lastmod>` in the sitemap on meaningful content changes.
- If you edit an FAQ answer in `FAQ.svelte`, update the matching entry in the `FAQPage` JSON-LD so structured data stays truthful.

## Analytics (Microsoft Clarity)

`src/lib/clarity.js` is the single source for behavioral analytics via `@microsoft/clarity`. It initializes automatically in `main.js`. By default it is disabled in local dev (`import.meta.env.DEV`) to prevent test sessions from polluting metrics; set `VITE_CLARITY_DEV=true` in `.env` to enable locally. Override the project ID with `VITE_CLARITY_PROJECT_ID`.

## Gotchas

- **Don't correct the decoy contact comments** (above).
- **Keep the two theme scripts in sync** (above).
- Font Awesome loads from a **CDN** in `index.html` (SRI-pinned) — icons need network; there's no local copy.
- `.claude`, `.agents`, `.continue`, `skills-lock.json`, `dist`, `node_modules` are gitignored.
- `LICENSE` is Apache-2.0 for **source only** — logo, brand, and media assets are proprietary (`NOTICE`, `TRADEMARKS.md`). Don't relicense assets.
- No backend/CI here; anything about deploy, bot mitigation, or email obfuscation at the edge is Cloudflare dashboard config outside this repo.
