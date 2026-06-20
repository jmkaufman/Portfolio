# Verification (T-14)

Records the D-23 verification pass. Two tiers: checks run locally against the site
served on `http://localhost:5173`, and the automated tool suite (Lighthouse, W3C HTML
validation, link-check) which runs in CI (`.github/workflows/verify.yml`, T-15) — the
authoritative source for the numeric scores, since the local environment has no
Node/Chrome-CLI or validator network access.

## Local checks — PASS

### Functional (driven through the preview browser)
- **Theme toggle** — toggles light/dark, persists to `localStorage`, updates the
  action `aria-label`; the inline bootstrap applies the stored theme before paint
  (no flash) via `color-scheme` + system `Canvas`/`CanvasText`.
- **Active-section nav** — `aria-current` tracks the in-view section (About /
  Experience / Projects / Contact), pinned to the last section at the page bottom.
- **Responsive** — verified at mobile (375px) and desktop; the header wraps the nav
  below the brand on narrow viewports.
- **No-JS degradation** — content is hardcoded in HTML; with JS off the page renders
  fully, theme follows the OS via `color-scheme: light dark`, and the theme toggle is
  hidden (`.no-js .theme-toggle`). JS is enhancement only (D-05/D-30).
- **Console** — zero errors or warnings on the home page; zero CSP violations.

### SEO — PASS
- `<title>` (33 chars), meta description (138 chars), canonical, viewport, `lang="en"`.
- Open Graph and Twitter Card tag sets complete; JSON-LD `Person` parses.
- Home page is indexable; `404.html` and `styleguide.html` are `noindex`.

### Best practices — PASS
- Meta CSP present; the only inline script is allowlisted by SHA-256 hash; zero CSP
  violations at runtime.
- `<!doctype html>`, charset, all `<img>` carry explicit `width`/`height` (no CLS).
- Every resource is same-origin/relative — no third-party requests, no mixed content.

### Accessibility — PASS (see also T-11)
- Single `h1`; heading order `1 > 2 > 3 > 4` with no skips; landmarks present.
- All images have alt text; decorative SVGs are `aria-hidden`; every control has an
  accessible name; sections are labelled by their headings.
- Skip-link moves focus to `<main tabindex="-1">`; `:focus-visible` styling present
  (renders in a focused browser — not in the headless preview, which lacks OS focus).
- Contrast: every text/accent pair verified ≥ AA in both themes at the token level (T-02).

### Performance heuristics — PASS
- 9 requests, system font stack (0 web-font requests), 1 lazy image, `modulepreload`
  for the 3 JS modules, deferred ES modules (non-render-blocking), WebP thumbnail.

### Links — PASS
- All internal anchors resolve to existing section ids.
- External links reachable: `github.com/jmkaufman`, `github.com/jmkaufman/Pong`,
  `pong.jasonkaufman.dev`. LinkedIn is bot-protected (not auto-fetchable) but is the
  owner's verbatim URL.

## Automated tool suite — runs in CI (T-15)
Lighthouse (target ≥ 95 performance / accessibility / best-practices / SEO), the W3C
Nu HTML validator (0 errors), and a broken-link crawl run on every push/PR via
`.github/workflows/verify.yml`. They execute in the GitHub-hosted runner and are the
authoritative check for the scores; nothing tool-related ships with the site (D-19).
