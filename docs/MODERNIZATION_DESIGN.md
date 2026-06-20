# Portfolio Modernization — Design Document

> Living record of design decisions for refactoring the personal portfolio
> (jasonkaufman.dev) away from React/Parcel/AWS toward a modern, zero-build,
> framework-free static site. Updated as decisions are made.

**Status:** Design complete (D-01…D-36) — build pending (delegated via handoff prompt)
**Started:** 2026-06-19
**Owner:** Jason Kaufman

---

## 1. Goals & Motivation

- Replace the React 18 + TypeScript + Parcel stack with **vanilla JavaScript**, no framework.
- Eliminate dependence on volatile npm packages (dependency rot / security surface).
- Modern best practices in **code, UI, UX, and security**.
- Move off AWS — too complex for simple hobby needs.
- Simple professional portfolio: work experience, contact info, personal projects.

### Non-goals
- No CMS / frequent-update workflow (content changes a few times a year).
- No backend / server-side logic.
- No contact form (mailto only).

---

## 2. Decisions Log

Each decision has a stable ID (`D-NN`) referenced by the traceability matrix.

| ID | Area | Decision | Rationale | Date |
|----|------|----------|-----------|------|
| D-01 | Language/Framework | **Vanilla JS, no framework** (no React) | Avoid npm volatility; longevity; aligns with hobby-scale needs | 2026-06-19 |
| D-02 | Hosting | **GitHub Pages**, branch deploy | Code already on GitHub; simplest possible; true zero-build; opted out of features other hosts add (forms/serverless) | 2026-06-19 |
| D-03 | Build philosophy | **Zero-build + native ES modules** | Pure static files (no npm/node_modules) + clean code organization via native `import`/`export`; longevity + maintainability | 2026-06-19 |
| D-04 | Contact | **mailto + social links** (LinkedIn, GitHub) | Zero backend, never breaks, no spam handling | 2026-06-19 |
| D-05 | Content model | **Hardcoded semantic HTML** | Best SEO, link-preview support, robustness, accessibility; JS becomes enhancement only | 2026-06-19 |
| D-06 | HTTP request strategy | HTTP/2 multiplexing + `<link rel="modulepreload">` + sensible module granularity + inline critical CSS; no bundler | Solves request-count concern without reintroducing a build step | 2026-06-19 |
| D-07 | Browser support | **Modern browsers only** (current evergreen Chrome/Firefox/Safari/Edge) | Enables native ES modules, modern CSS, modern JS without polyfills | 2026-06-19 |
| D-08 | Styling | Plain CSS with custom properties (CSS variables); no preprocessor/CSS-in-JS | No build step; native theming support | 2026-06-19 |
| D-09 | Icons | Inline SVG (replaces `react-icons` dependency) | Removes a dependency; fewer requests | 2026-06-19 |
| D-10 | Sections / IA | **About/Hero, Experience, Projects, Skills/Tech, Contact** | Core portfolio sections; Skills added for recruiter scanning; dedicated Contact section | 2026-06-19 |
| D-11 | Navigation | **Sticky top bar + smooth scroll**, single-page, active-section highlighting | Modern portfolio convention; easy orientation | 2026-06-19 |
| D-12 | Accessibility | **WCAG 2.1 AA** target | Professional standard; correct default | 2026-06-19 |
| D-13 | Responsive | **Fully responsive, equal priority for mobile & desktop**; mobile-first CSS methodology, fluid layouts (flexbox/grid, `clamp()`) | Recruiters browse on both; no compromise on either | 2026-06-19 |
| D-14 | Theming | **Auto (prefers-color-scheme) + manual toggle**, persisted in `localStorage`; inline head script to prevent theme flash | Modern best practice; respects user preference with override | 2026-06-19 |
| D-15 | Motion | **Subtle, purposeful animations** (smooth scroll, gentle scroll-in, hover transitions); fully disabled under `prefers-reduced-motion` | Polished without distraction; accessible | 2026-06-19 |
| D-16 | Aesthetic | **Modern & bold, with discipline guardrails** (see below) | Eye-catching personality without tipping into loud/gimmicky | 2026-06-20 |
| D-17 | Typography | **System font stack** (native OS UI fonts); strict modular type scale | Zero font requests, instant render, no licensing/CDN dependency; bold expression via scale/weight | 2026-06-20 |
| D-18 | Color | **Neutral base + two accents** (one primary, one secondary used sparingly); exact hues TBD at build, defined as CSS variables; all verified WCAG AA in light & dark | Expressive range while keeping surfaces calm and accessible | 2026-06-20 |

### D-16 detail — "Modern & bold" discipline guardrails (binding for implementation)
1. **One bold move per view** — a single focal element per section, calm surroundings.
2. **Bold type, calm color** — boldness lives in typography (large heavy hero headline, deliberate scale); color stays mostly neutral.
3. **Strict type scale + spacing tokens** — sizes from a modular scale; spacing from fixed `--space-*` tokens; no arbitrary values.
4. **Generous whitespace** — large sections/margins so bold elements breathe.
5. **Accent discipline** — accents on ~5–10% of surface; primary for interactive/active states, secondary used rarely.
6. **Restrained motion** — per D-15.
7. **Lever when in doubt** — remove/shrink, never add.

### Engineering & Ops decisions

| ID | Area | Decision | Rationale | Date |
|----|------|----------|-----------|------|
| D-19 | Code quality tooling | **ESLint (quality) + Prettier (formatting)**, dev-only in `devDependencies`, gitignored `node_modules`; **never shipped** | ESLint defers formatting to Prettier (its stylistic rules are deprecated); split is best-documented; deployed site stays pure static / zero runtime deps | 2026-06-20 |
| D-20 | Security | **CSP via `<meta>`** (GitHub Pages can't set headers), **`rel="noopener"`** on external `target="_blank"` links, **no third-party scripts/CDNs** (documented dependency-free posture), HTTPS (automatic) + sensible defaults | Defense-in-depth appropriate to a static site; nothing external to compromise | 2026-06-20 |
| D-21 | SEO & metadata | **Full meta + Open Graph + Twitter Card** (rich link previews), **JSON-LD `Person` structured data**, **`sitemap.xml` + `robots.txt`** | High value for a portfolio that gets shared; complete SEO baseline | 2026-06-20 |
| D-22 | Analytics | **None** | Privacy-respecting; no cookie banner; no third-party script; aligns with self-reliance goals | 2026-06-20 |
| D-23 | Testing | **Lighthouse (perf/a11y/SEO/best-practices) + HTML validation + broken-link checking**; no unit-test framework | Fitting checks for a static, near-logic-free site; verifies the things that matter (a11y AA, SEO, perf) without a test-runner dependency | 2026-06-20 |
| D-24 | Favicon / Manifest | **Modern favicon set** (SVG + `.ico` + `apple-touch-icon`) + Apple meta/`theme-color` tags + **minimal `manifest.webmanifest`** (name/icons/theme_color); **no service worker** | iOS covered via favicon set + Apple tags; manifest adds write-once Android home-screen + themed-UI polish at zero maintenance cost | 2026-06-20 |
| D-25 | Custom domain | **Keep `jasonkaufman.dev` on GitHub Pages** via `CNAME` file + DNS; free auto HTTPS | Retains professional URL; no hosting cost | 2026-06-20 |
| D-26 | Design tokens | **Centralized `tokens.css`** as the single source of truth for all visual primitives (colors, spacing scale, type scale, radii, shadows, motion durations, breakpoints), exposed as CSS custom properties | A future graphic designer (or you) restyles the whole site by editing one documented file; maps 1:1 to Figma token thinking; no build tooling needed | 2026-06-20 |
| D-27 | Style guide | **Standalone `styleguide.html`** component & token gallery rendering every component, color, and type style in isolation | Living documentation + low-friction surface for a future designer to review/tweak components without touching the live page; pure static, zero tooling | 2026-06-20 |

> **Designer-handoff posture:** D-26 + D-27 make the codebase friendly to a *code-literate* designer (edit tokens/CSS, refresh — no framework/build to learn). Known limitation: there is **no automated Figma→code pipeline** and no SCSS/Storybook tooling (deliberate, per the zero-build goal D-03). A non-coding designer would hand off mockups for you/an agent to implement; the stack is neutral in that case. Markup *style* changes apply globally via CSS; structural changes to repeated blocks (e.g. project cards in hardcoded HTML, D-05) are manual per-block edits — mitigated by consistent, documented class naming.

| ID | Area | Decision | Rationale | Date |
|----|------|----------|-----------|------|
| D-28 | HTML structural reuse | **Accept markup duplication** for repeated blocks (project cards, experience entries). *Style* reuse via shared CSS classes/tokens; *structural* changes done via find-and-replace across the single HTML file | Only path preserving BOTH zero-build (D-03) and SEO/no-JS robustness (D-05); card count is small & bounded, structural edits are rare; consistent documented class naming makes find-and-replace reliable | 2026-06-20 |

> **HTML reuse — clarification & alternatives considered.** There is **no native browser mechanism** to reuse an HTML *structure* across instances without either runtime JS or a build step (HTML Imports deprecated; SSI unsupported on GitHub Pages; `<iframe>` unsuitable). *Style* reuse is fully handled by CSS (D-08/D-26) with no JS. For *structural* reuse two alternatives were considered and rejected for this site:
> - **Path B — dev-only HTML build step** (author one partial, compile to static HTML): true DRY and still ships static, but reverses zero-build (D-03) and reintroduces a dependency/rot surface. Revisit only if card structure starts changing often.
> - **Path C — native Web Components** (`<slot>`-based, vanilla, not a framework): true DRY and honors "no framework" (D-01), but needs runtime JS and softens SEO/no-JS robustness (D-05) for content. Rejected to avoid recreating the "JS required to see content" problem D-05 was chosen to eliminate.

### Planning-phase decisions (formalized gaps + deferred items)

| ID | Area | Decision | Rationale | Date |
|----|------|----------|-----------|------|
| D-29 | Accessibility specifics | Under D-12: **skip-to-content link, visible `:focus-visible` indicators, alt-text discipline, accessible labels** (`aria-label`/visually-hidden) for inline SVG icons + theme toggle + nav, correct heading order, `aria-current` on active nav link | These are required to actually meet WCAG 2.1 AA; making them explicit lets the traceability matrix verify them rather than hope they're inferred | 2026-06-20 |
| D-30 | UX additions | **Custom `404.html`**, **print stylesheet** (recruiters print/PDF portfolios), **graceful no-JS degradation** (content + default theme work without JS) | Low-cost polish; print + no-JS robustness reinforce D-05 | 2026-06-20 |
| D-31 | Security posture (doc) | Under D-20: record that **meta-CSP cannot express `frame-ancestors`/reporting** (clickjacking N/A — no auth/state-changing actions); **`.dev` TLD gives browser-enforced HSTS** via preload list; **mailto is plain/un-obfuscated** (accepts modest harvesting exposure for one-click contact that works incl. no-JS; relies on provider spam filtering). Hosting stays GitHub Pages + meta CSP (**D-02 reaffirmed**) | meta-CSP gap is the one protection a no-login static portfolio least needs; staying on GH Pages keeps maximum simplicity | 2026-06-20 |
| D-32 | Deploy source | GitHub Pages serves from the **root of a dedicated deploy branch**; development on a separate working branch | Clean source/published split; site files at branch root | 2026-06-20 |
| D-33 | Local dev server | **VS Code Live Server** (Go Live, auto-reload); no project dependency. `npx serve` / `python -m http.server` documented as alternatives | Serves over `http://` (needed for ES modules) with zero shipped dependency | 2026-06-20 |
| D-34 | Design carry-over | **Clean redesign, migrate content only** — bring text/links/thumbnail forward; drop old cream `#f8f0e3` bg, CSS timeline motif, LinkedIn-blue accent; design fresh per D-16 | Existing visual design underuses the chosen "modern & bold" direction | 2026-06-20 |
| D-35 | CI verification | **GitHub Actions workflow** runs the D-23 checks (Lighthouse, HTML validation, link-check) on each push/PR | Free (unlimited for public repos); tools run in the ephemeral runner, adding nothing to the repo/shipped site | 2026-06-20 |
| D-36 | Code comment style | Comments use an **objective, neutral tone** (no first-person/marketing/editorializing); when explaining *why*, **reference the relevant decision ID / traceability matrix** (e.g. `/* meta CSP per D-20/D-31 — header CSP unavailable on GitHub Pages */`) | Keeps rationale traceable to this document; binds both planning work and the handoff agent | 2026-06-20 |

---

## 3. Open Questions / To Be Decided

- [x] ~~Site sections & information architecture~~ → D-10
- [x] ~~Navigation pattern~~ → D-11
- [x] ~~Responsive strategy & breakpoints~~ → D-13
- [x] ~~Accessibility target~~ → D-12 (WCAG 2.1 AA)
- [x] ~~Theming (light/dark/auto, toggle)~~ → D-14
- [x] ~~Visual/aesthetic direction~~ → D-16
- [x] ~~Typography~~ → D-17
- [x] ~~Color palette~~ → D-18 (exact hues at build)
- [x] ~~Motion / animation policy~~ → D-15
- [x] ~~Linting/formatting~~ → D-19
- [x] ~~Testing strategy~~ → D-23
- [x] ~~Security hardening~~ → D-20
- [x] ~~Analytics~~ → D-22 (none)
- [x] ~~SEO & metadata~~ → D-21
- [x] ~~Favicon / manifest~~ → D-24
- [x] ~~Custom domain / DNS handling~~ → D-25

### Deferred to planning — now resolved
- [x] ~~Code/file organization & naming conventions~~ → target architecture in plan; kebab-case files, light-BEM CSS classes
- [x] ~~Local dev workflow (static server choice)~~ → D-33
- [x] ~~Deployment workflow & CI~~ → D-32 (deploy branch) + D-35 (CI Action)
- [x] ~~Migration of existing content & assets~~ → D-34 + content table in plan

> Implementation plan with the full task breakdown (T-01…T-15) and per-decision
> traceability lives at [`IMPLEMENTATION_PLAN.md`](IMPLEMENTATION_PLAN.md). The matrix below mirrors it.

---

## 4. Traceability Matrix

> Ties design decisions → implementation tasks → actual code/artifacts.
> Tasks (T-01…T-15) are defined in the implementation plan. **Status** is updated by the
> build agent as each task completes (replace `Not started` with a commit/PR ref or ✅).

| Decision(s) | Task ID | Task Description | Artifact / File(s) | Status |
|-------------|---------|------------------|--------------------|--------|
| D-01, D-03, D-07, D-19 | T-01 | Scaffold & cleanup; remove React/Parcel; dev-only tooling | repo structure, `package.json`, `.eslintrc`, `.prettierrc`, `.gitignore` | ✅ |
| D-08, D-17, D-18, D-26 | T-02 | Design tokens | `styles/tokens.css` | ✅ |
| D-08, D-13, D-15, D-30 | T-03 | Base & layout CSS (reset, responsive, print, reduced-motion) | `styles/base.css`, `styles/layout.css` | ✅ |
| D-05, D-06, D-10, D-11, D-14, D-21, D-29 | T-04 | Semantic HTML skeleton + head (meta/OG/JSON-LD), modulepreload, theme-init | `index.html` | ✅ |
| D-05, D-28, D-34 | T-05 | Content migration (accept-duplication blocks) | `index.html` content |  Not started |
| D-11, D-13, D-16, D-18, D-34 | T-06 | Component styling; modern & bold; both themes; AA contrast | `styles/components.css` | Not started |
| D-11, D-14, D-15 | T-07 | JS enhancements (theme toggle, nav highlight/smooth-scroll) | `js/main.js`, `js/theme.js`, `js/nav.js` | Not started |
| D-24 | T-08 | Favicon set + minimal manifest | `assets/favicon.*`, `assets/icon-*.png`, `manifest.webmanifest` | Not started |
| D-21 | T-09 | SEO & crawler files | OG/Twitter/JSON-LD, `sitemap.xml`, `robots.txt`, `assets/og-image.png` | Not started |
| D-20, D-31 | T-10 | Security hardening (meta CSP, `rel=noopener`, plain mailto, posture docs) | `index.html` head + links | Not started |
| D-12, D-29 | T-11 | Accessibility pass | skip-link, focus styles, ARIA labels, alt text across HTML/CSS/JS | Not started |
| D-27 | T-12 | Style guide page | `styleguide.html` | Not started |
| D-02, D-25, D-30, D-32 | T-13 | Deploy config (CNAME, 404, deploy-branch root) | `CNAME`, `404.html`, GH Pages settings | Not started |
| D-23, D-33 | T-14 | Verification (local preview, Lighthouse, HTML/link checks) | check results | Not started |
| D-35 | T-15 | CI workflow | `.github/workflows/verify.yml` | Not started |
| D-22 | — | No analytics (absence verified) | (no analytics scripts present) | N/A |
| D-04, D-09 | T-05/T-06/T-08/T-10 | Contact links + inline SVG icons | `index.html`, icon markup | Not started |

---

## 5. Change History

| Date | Change |
|------|--------|
| 2026-06-19 | Document created; foundations (D-01 through D-09) recorded |
| 2026-06-19 | UX & scope round: D-10 through D-15 recorded |
| 2026-06-20 | Visual round (D-16–D-18) + engineering & ops round (D-19–D-25) recorded |
| 2026-06-20 | Designer-friendliness (D-26, D-27) + HTML reuse (D-28) recorded |
| 2026-06-20 | Planning phase: formalized gaps + deferred items (D-29–D-36); matrix populated; design complete |
