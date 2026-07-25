# BettaHVAC — Design System

The visual language for the BettaHVAC landing page. This is a single-page marketing site whose defining idea is a **climate-responsive UI**: the entire palette, imagery, and mood swap between a warm "hot" mode and a cool "cold" mode. Everything below serves that concept.

All styling is **vanilla CSS** — no Tailwind, no UI framework. Global tokens and primitives live in `src/app.css`; component-specific styles live in each component's `<style>` block (scoped by Svelte).

---

## 1. Theme system (the core mechanic)

Theme is driven by a `data-theme` attribute on `<html>`, with two possible values:

| Value | Mood | When it's the default |
| --- | --- | --- |
| `hot` | Warm — oranges, reds, near-black warm background | Device is in dark mode |
| `cold` | Cool — sky blues, teals, purple, light background | Device is in light mode |

**Resolution order:** saved user choice (`localStorage["hvac-theme"]`) wins; otherwise follow `prefers-color-scheme` (dark → `hot`, light → `cold`).

This logic exists in **two places that must stay in sync**:

1. `index.html` — an inline `<script>` in `<head>` sets `data-theme` **before first paint** to avoid a flash of the wrong theme (FOUC).
2. `src/lib/components/ThemeToggle.svelte` — the runtime toggle. It also listens for live `prefers-color-scheme` changes *until* the user picks a theme manually, then stops following the device.

CSS consumes the theme via three token blocks in `app.css`: `:root` (fallback defaults), `:root[data-theme="hot"]`, and `:root[data-theme="cold"]`. Every component reads tokens, never hardcoded theme colors, so a component automatically looks right in both modes.

---

## 2. Color tokens

Defined per theme. Always reference the variable, never the literal hex.

| Token | `hot` | `cold` | Role |
| --- | --- | --- | --- |
| `--color-primary` | `#ff5e00` | `#0ea5e9` | Headings, primary buttons, links |
| `--color-primary-light` | `#ff8c00` | `#38bdf8` | Gradient partner, hover |
| `--color-secondary` | `#ff1e00` | `#8b5cf6` | Emphasis, emergency badge |
| `--color-secondary-light` | `#ff3a1a` | `#a78bfa` | Gradient partner |
| `--color-accent` | `#ffcc00` | `#59e8ed` | Premium CTAs, brand highlight ("HVAC") |
| `--color-accent-light` | `#ffe600` | `#5eead4` | Accent hover |
| `--color-bg` | `#0f0a08` | `#f0f9ff` | Page background |
| `--color-bg-alt` | `#1a0f0a` | `#e0f2fe` | Alternating section background |
| `--color-text` | `#fff5eb` | `#0c4a6e` | Body text (strong) |
| `--color-text-light` | `#cbd5e1` | `#0369a1` | Muted text, paragraphs |

The base `:root` fallback set (used before a theme resolves) is a deep royal blue / rich red / gold palette.

**Glassmorphism tokens:** `--color-glass-bg`, `--color-glass-border` — tuned per theme so the `.glass-panel` frosted look reads correctly on either background.

---

## 3. Typography

Loaded from Google Fonts (see `@import` at top of `app.css`).

- `--font-heading: "Outfit"` — all `h1`–`h6`, buttons, badges, brand marks. Weights 400/500/700/800.
- `--font-body: "Inter"` — body copy. Weights 300–700.

Headings are `font-weight: 700`, `line-height: 1.2`, colored `--color-primary` by default. Body copy is `line-height: 1.6`, colored `--color-text-light`.

**Type scale utilities:** `.section-title` (2.5rem), `.section-subtitle` (1.25rem, muted, centered, max 600px). Hero titles use `clamp()` for fluid sizing.

---

## 4. Spacing, radius, shadows

**Radius:** `--radius-sm` 4px · `--radius-md` 8px · `--radius-lg` 16px · `--radius-xl` 24px. Pills use `9999px`.

**Shadows:** `--shadow-sm` / `--shadow-md` / `--shadow-lg` for elevation, plus `--shadow-premium` — a colored, theme-tinted glow used on hover for primary/accent buttons and glass panels.

**Section rhythm:** `.section` = `5rem 0` vertical padding. `.container` = max-width 1200px, `0 2rem` side padding, centered.

---

## 5. Component primitives (global classes in `app.css`)

- **Buttons** — `.btn` base + variant `.btn-primary` (primary gradient), `.btn-accent` (gold gradient, dark text), `.btn-secondary`. All lift `translateY(-2px)` on hover and swap to `--shadow-premium`. Hero uses its own `.btn-premium` (accent-filled, uppercase).
- **`.glass-panel`** — frosted glass: `backdrop-filter: blur(12px)`, glass bg/border tokens, `--radius-lg`, premium shadow. Base for cards, dialogs, panels.
- **`.badge`** / **`.badge-emergency`** — pills. Emergency variant pulses (`pulseGlow`).
- **`.section-alt`** — alternating background (`--color-bg-alt`) tiled with a theme-specific "WhatsApp-style HVAC doodle" pattern via `--doodle-pattern` (`pattern-hot.svg` / `pattern-cold.svg`), sized `440px auto`.
- **`.text-gradient`** — primary→secondary gradient clipped to text.
- **Social icons** — `.social-links` / `.social-icon` circular icon buttons with hover lift+scale.
- **Text utilities** — `.text-center`, `.text-primary`, `.text-secondary`, `.text-accent`.

---

## 6. Motion

Motion is deliberate and always respects `prefers-reduced-motion` (globally clamped to ~0ms in `app.css`, and guarded again in JS where needed).

**Scroll reveal** — the `use:reveal` Svelte action (`src/lib/actions/reveal.js`) is the standard entrance pattern. Elements start hidden and animate in once when they enter the viewport (IntersectionObserver, one-shot). Variants via the `from` option: `up` (default), `left`, `right`, `scale`; optional `delay` (used for staggering grids, e.g. `delay: i * 110`). The action **removes** its classes after the animation ends so later hover transforms / 3D tilts aren't overridden. Reduced-motion or no-IO → elements just show.

**Named keyframes / helpers:** `float` (`.animate-float`, gentle bob), `pulseGlow` (`.animate-pulse-glow`, expanding ring — CTAs / emergency badge), `revealIn` (the reveal action), plus component-local ones (Hero typing caret blink, scroll-line sweep, dialog entrance, star twinkle).

**Signature interactions:** Hero has a typewriter effect cycling "Heating / Ventilation / Air Conditioning" (static first word under reduced motion). Service cards and the Kentucky map do a cursor-driven 3D tilt.

---

## 7. Imagery & assets

All under `public/assets/`. Most visuals come in **hot and cold variants** selected by theme.

- **Hero backgrounds** — `img/hero_hot.{avif,webp}` / `img/hero_cold.{avif,webp}`, wired through `--hero-bg` + `--hero-overlay` gradients per theme.
- **Service sprites** — `generated/sprite-{ac|panel|car}-{hot|cold}.{webp,png}`. Chosen at runtime in `Services.svelte` as `/assets/generated/sprite-${name}-${theme}.webp`. Hot/cold variants are canvas-normalized so they render at the same on-screen size (see §Assets in AGENTS.md).
- **Doodle patterns** — `pattern-hot.svg` / `pattern-cold.svg` for `.section-alt`.
- **Brand / icons** — `betta-logo.svg`, `favicon.svg`, `apple-touch-icon.png`, `og-image.png` (1200×630), `kentucky-map.{png,webp}`.

Prefer modern formats (AVIF/WebP) with fallbacks. Decorative images use empty `alt=""` + `aria-hidden`; meaningful images get real alt text.

---

## 8. Accessibility conventions

Baked into the design, not bolted on:

- **Skip link** (`.skip-link`) to `#main-content`, visible on focus.
- **Focus rings** — `:focus-visible` gets a 3px `--color-primary` outline; `:focus` alone is suppressed (keyboard-only rings).
- **Reduced motion** — globally honored (§6).
- **Semantics** — landmark `<nav aria-label>`, `<main>`, real `<dialog>` for the review modal, `role="radiogroup"`/`radio` for the star picker, honeypot field marked `aria-hidden`, `.visually-hidden` utility for SR-only text.
- **Hit targets** — interactive controls target ≥44px (e.g. theme toggle `min-height/width: 44px`).
- **Anchor offset** — `:target { scroll-margin-top: 80px }` keeps section tops clear of the fixed navbar.

---

## 9. Responsive strategy

Mobile-first intent, refined with `max-width` breakpoints. Common stops seen across components: **1024px** (grids 4→2 col), **768px** (stack buttons, hide toggle label, hamburger nav), **600px** (grids →1 col), **480px** and **360px** (small-phone type/padding tuning), plus **`max-height: 520px`** landscape handling in the Hero. Hero uses `100dvh` to stay clear of mobile browser chrome and `clamp()` for fluid type.

---

## 10. Do / don't

- **Do** reference tokens (`var(--color-*)`, `var(--radius-*)`, etc.) so components track the active theme automatically.
- **Do** reuse primitives (`.btn`, `.glass-panel`, `.section`, `.section-alt`, `use:reveal`) before inventing new ones.
- **Do** provide hot **and** cold variants for any new themed art, and normalize their sizes.
- **Don't** hardcode theme colors in component styles.
- **Don't** add motion without a reduced-motion fallback.
- **Don't** change `data-theme` logic in only one of the two places (`index.html` + `ThemeToggle.svelte`) — keep them identical.
