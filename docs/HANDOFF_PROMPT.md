# Handoff Prompt — Portfolio Rebuild

> Copy everything in the "PROMPT" block below into a fresh Claude Code session opened at
> the repo root (`D:\Documents\My Web Sites\Portfolio`). It is self-contained: it points
> the new agent at the design doc and plan, lists the tasks in order, embeds the content
> to migrate, and states the conventions to follow.

---

## PROMPT

You are rebuilding the personal portfolio at **jasonkaufman.dev**. The site is currently a
React 18 + TypeScript SPA bundled by Parcel and hosted on AWS. Your job is to replace it
with a **modern, zero-build, framework-free static site** (vanilla JS, native ES modules)
hosted on **GitHub Pages**, per a design process that is already complete.

### Read these first (authoritative — do not re-decide what they settled)
1. `docs/MODERNIZATION_DESIGN.md` — the 36 design decisions (D-01…D-36), their rationale,
   the "modern & bold" guardrails (D-16 detail), and the traceability matrix.
2. `~/.claude/plans/wild-wibbling-orbit.md` — the implementation plan: target architecture,
   the 15 ordered tasks (T-01…T-15), dependencies, and verification steps.

Treat every D-xx decision as binding. If you believe one is wrong, raise it with the owner
before deviating — do not silently change course.

### Core constraints (the non-negotiables)
- **Vanilla JS, no framework** (D-01); **zero-build** — no bundler, no `node_modules` in the
  shipped site, native ES modules organized by responsibility (D-03). Modern browsers only (D-07).
- **Content is hardcoded in semantic HTML** (D-05); JS is **enhancement only** — the site must
  render content and a sensible default theme with JS disabled.
- **Plain CSS with custom properties**; all visual primitives live in `styles/tokens.css` (D-08, D-26).
- **WCAG 2.1 AA** (D-12, D-29); **fully responsive**, mobile + desktop equal (D-13).
- **Dev-only ESLint + Prettier** — never shipped (D-19). Deployed artifact is pure static.
- **Comment convention (D-36):** objective, neutral tone; when a comment explains *why*,
  reference the decision ID, e.g. `/* meta CSP per D-20/D-31 — header CSP unavailable on GitHub Pages */`.
- **Commit discipline:** **each completed task (T-01…T-15) is its own commit.** Do not
  batch multiple tasks into one commit, and do not split one task across unrelated commits.
  Complete a task, verify it, then commit it before starting the next. See "Commit
  discipline" below for message format.

### Target file structure (served from the root of a dedicated GitHub Pages deploy branch)
```
index.html · 404.html · styleguide.html
CNAME · robots.txt · sitemap.xml · manifest.webmanifest
styles/  tokens.css · base.css · layout.css · components.css
js/      main.js · theme.js · nav.js
assets/  favicon.svg · favicon.ico · apple-touch-icon.png · icon-192.png · icon-512.png · og-image.png · img/pong-thumbnail.webp
package.json (devDeps only) · .eslintrc · .prettierrc · .gitignore · .github/workflows/verify.yml
```
Filenames kebab-case; CSS classes light-BEM (`.project-card__title`). Remove the old `src/`
React app, Parcel config, and React/Parcel dependencies.

### Tasks — execute in this order (see the plan for full detail and the traceability matrix)
1. **T-01 Scaffold & cleanup** — remove React/Parcel; create structure; dev-only package.json + eslint/prettier + .gitignore.
2. **T-02 Design tokens** — `styles/tokens.css` (color w/ light+dark, type scale, spacing, radii, shadow, motion). Pick accent hues; verify AA both themes.
3. **T-03 Base & layout CSS** — reset, element defaults, responsive layout (clamp/grid/flex), **print stylesheet**, reduced-motion block.
4. **T-04 HTML skeleton** — semantic landmarks + 5 sections, skip-link, head (meta/OG/Twitter/JSON-LD), modulepreload, inline critical CSS + inline theme-init (no-flash).
5. **T-05 Content migration** — author the content table below; accept-duplication for repeated blocks; content-only (no old visual carryover).
6. **T-06 Component styling** — `styles/components.css`; modern & bold within the D-16 guardrails; both themes; AA contrast.
7. **T-07 JS enhancements** — `theme.js` (toggle + localStorage), `nav.js` (smooth scroll + active highlight + aria-current), `main.js`; reduced-motion aware; degrade gracefully.
8. **T-08 Favicon + manifest** — modern favicon set + `manifest.webmanifest` (no service worker) + Apple/theme-color meta.
9. **T-09 SEO & crawler files** — OG image wiring, `sitemap.xml`, `robots.txt`, JSON-LD Person.
10. **T-10 Security hardening** — `<meta>` CSP, `rel="noopener"` on external links, plain mailto, document dependency-free posture + D-31 caveats. Ensure CSP permits the inline critical CSS + theme-init script (document the choice).
11. **T-11 Accessibility pass** — skip-link, `:focus-visible`, alt text, ARIA labels (icons/toggle/nav), heading order, `aria-current`, contrast verification.
12. **T-12 Style guide** — `styleguide.html` rendering all tokens + components in isolation, both themes.
13. **T-13 Deploy config** — `CNAME` (jasonkaufman.dev), `404.html`, configure Pages to serve the deploy-branch root; document the working-branch → deploy-branch flow.
14. **T-14 Verification** — preview via VS Code Live Server; Lighthouse (≥95 perf/a11y/best-practices/SEO), W3C HTML validation (0 errors), broken-link check, axe + keyboard traversal, social-preview check. Fix to green.
15. **T-15 CI workflow** — `.github/workflows/verify.yml` running Lighthouse + HTML validation + link-check on push/PR.

T-06/T-07/T-08/T-09 can proceed in parallel once T-04 lands. T-10/T-11 are cross-cutting passes. T-12/T-14/T-15 last.

### Commit discipline (one commit per task)
- **Make exactly one commit per task (T-01…T-15)**, committed only after that task is complete and verified. Even where tasks may be developed in parallel, land them as separate, ordered commits.
- **Commit message format:** start the subject with the task ID, e.g.
  `T-02: add design tokens (D-08, D-17, D-18, D-26)` — include the decision IDs the task implements so history stays traceable to the design doc (consistent with the D-36 convention).
- After each commit, update the **Status** column for that task's row in the traceability matrix in `docs/MODERNIZATION_DESIGN.md` with the commit hash (or ✅).
- The cross-cutting passes (T-10, T-11) still get their own commit each, scoped to the hardening/accessibility changes they introduce.

### Content to migrate (faithful — preserve names, dates, URLs verbatim)
| Item | Value |
|---|---|
| Name | Jason Kaufman |
| Bio | "A versatile software engineer with experience in real-time systems branching out into full-stack technologies. Always excited to learn!" |
| Email (plain mailto) | jkaufman217@gmail.com |
| LinkedIn | https://www.linkedin.com/in/jason-m-kaufman/ |
| Employer | Epsilon C5I, Inc |
| Role 1 | Software Engineer, Raytheon GPNTS · 05/2020–07/2022 · Languages: C++, Java, Python, C# · Tools: Linux, Git, Jenkins, Selenium WebDriver, Google Test |
| Role 2 | Software Engineer, Raytheon SSDS · 07/2018–04/2020 · Languages: C++, Java · Tools: Linux, Java Swing, Git |
| Project | Pong — "Pong built entirely in React" — live: https://pong.jasonkaufman.dev — repo: https://github.com/jmkaufman/Pong — thumbnail: existing `public/thumbnails/Pong_Thumbnail.png` (convert to WebP) |
| Skills/Tech (derive from above) | C++, Java, Python, C#, Linux, Git, Jenkins, Selenium WebDriver, Google Test, Java Swing |

### Open items to confirm with the owner BEFORE launch (do not block the build)
1. **GitHub profile URL** — D-04 wants a GitHub social link; the old site had none (only the Pong repo). Likely `https://github.com/jmkaufman` — confirm.
2. **Sparse content** — only one employer and one project. Ask whether to add more or launch lean.
3. **OG / social preview image** — must be designed/provided (or generate a simple branded card).
4. **Bio expansion** — optional; current bio is two short lines.

### Definition of done
All 15 tasks complete, **each landed as its own commit** (subject prefixed with the task ID
+ decision IDs); verification (T-14) green; CI (T-15) passing; the traceability-matrix
**Status** column in `docs/MODERNIZATION_DESIGN.md` updated per task with the commit ref;
open items above surfaced to the owner.

## END PROMPT
