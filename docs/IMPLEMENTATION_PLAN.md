# Portfolio Modernization — Implementation Plan

> In-repo copy of the approved implementation plan (originally drafted in plan mode).
> Decisions D-29…D-36 referenced below have since been synced into
> [MODERNIZATION_DESIGN.md](MODERNIZATION_DESIGN.md), whose traceability matrix is
> authoritative. This document is the build blueprint the handoff agent executes.

## Context

The portfolio at jasonkaufman.dev is currently a React 18 + TypeScript SPA bundled by
Parcel and hosted on AWS. It was built during a career transition into tech and now
carries unwanted complexity: a framework + npm dependency surface the owner wants to
escape (dependency rot / security), and an AWS hosting setup heavier than a hobby site
needs. This plan rebuilds it as a **zero-build, framework-free static site** on GitHub
Pages, applying modern best practices in code, UI/UX, accessibility, and security.

All design decisions (D-01…D-36) are recorded in
[MODERNIZATION_DESIGN.md](MODERNIZATION_DESIGN.md). This plan turns those decisions into
discrete, traceable build tasks. The intended outcome: a fast, accessible (WCAG 2.1 AA),
SEO-strong, dependency-free single-page portfolio that an outside designer could later
restyle via a token file, deployed from a GitHub Pages branch at the existing custom domain.

## Formalized decisions (D-29…D-36)

- **D-29 — Accessibility specifics (under D-12 WCAG 2.1 AA):** skip-to-content link;
  visible `:focus-visible` indicators; alt-text discipline on all images; accessible
  labels (`aria-label`/visually-hidden text) for inline SVG icons, the theme toggle, and
  the nav; correct heading order; `aria-current` on active nav link.
- **D-30 — UX additions:** custom `404.html`; print stylesheet (recruiters print/PDF
  portfolios); graceful no-JS degradation (content + theme default work without JS).
- **D-31 — Security posture documentation (under D-20):** record that meta-CSP cannot
  express `frame-ancestors`/reporting (clickjacking N/A — no auth/state-changing actions);
  `.dev` TLD provides browser-enforced HSTS via the preload list. **Mailto: plain,
  un-obfuscated** — accepts modest harvesting exposure in exchange for one-click contact
  that works for all users incl. no-JS; relies on provider spam filtering. Hosting stays
  GitHub Pages + meta CSP (D-02 reaffirmed).
- **D-32 — Deploy source:** GitHub Pages serves from the **root of a dedicated deploy
  branch**; development happens on a separate working branch. Clean source/published split.
- **D-33 — Local dev server:** **VS Code Live Server** (click "Go Live", auto-reload on
  save); no project dependency. `npx serve` / `python -m http.server` documented as alternatives.
- **D-34 — Design carry-over:** **clean redesign, migrate content only.** Bring text/links/
  thumbnail forward; drop the old cream `#f8f0e3` background, CSS timeline motif, and
  LinkedIn-blue accent — design fresh per the "modern & bold" system (D-16).
- **D-35 — CI verification:** a **GitHub Actions workflow** runs the D-23 checks
  (Lighthouse, HTML validation, link-check) on each push/PR. Free (unlimited for public
  repos); tools run in the ephemeral runner, adding nothing to the repo/shipped site.
- **D-36 — Code comment style:** comments use an **objective, neutral tone** (no
  first-person, marketing, or editorializing voice). When a comment explains *why* a
  choice was made, it **references the relevant decision ID / traceability matrix** in
  `docs/MODERNIZATION_DESIGN.md` (e.g. `/* meta CSP per D-20/D-31 — header CSP
  unavailable on GitHub Pages */`). Binds both the planning work and the handoff agent.

## Target architecture (zero-build, native ES modules)

Served from the **root of a dedicated GitHub Pages deploy branch** (D-32) over HTTP/2;
development on a separate working branch. Filenames kebab-case; CSS classes light-BEM
(`.project-card__title`); ES modules named by responsibility:

```
index.html              # all content, semantic; inline critical CSS + theme-init; modulepreload
404.html                # custom not-found (D-30)
styleguide.html         # component/token gallery (D-27)
CNAME                   # jasonkaufman.dev (D-25)
robots.txt              # (carry over, add sitemap ref)
sitemap.xml             # (D-21)
manifest.webmanifest    # minimal, no service worker (D-24)
styles/
  tokens.css            # single source of truth: color, type scale, spacing, radii, shadow, motion (D-26)
  base.css              # reset, element defaults, print styles, reduced-motion (D-08/D-30/D-15)
  layout.css            # responsive layout scaffolding, fluid type via clamp() (D-13)
  components.css        # nav, hero, experience, project cards, skills, contact, footer, themes
js/
  main.js               # entry, wires modules
  theme.js              # auto + manual theme toggle, localStorage (D-14)
  nav.js                # smooth-scroll enhancement + active-section highlight (D-11)
assets/
  favicon.svg, favicon.ico, apple-touch-icon.png, icon-192.png, icon-512.png (D-24)
  og-image.png          # social link preview (D-21)
  img/pong-thumbnail.webp (+ .png fallback)   # from public/thumbnails/Pong_Thumbnail.png
package.json            # devDependencies ONLY: eslint, prettier, configs (D-19) — never shipped
.eslintrc / .prettierrc, .gitignore (node_modules)
```

Dev-only tooling (ESLint + Prettier) stays out of the deployed artifact. The old
`src/` React app, Parcel config, and React/Parcel deps are removed.

## Content to migrate (from current site)

| Item | Value |
|---|---|
| Name | Jason Kaufman |
| Bio | "A versatile software engineer with experience in real-time systems branching out into full-stack technologies. Always excited to learn!" |
| Email | jkaufman217@gmail.com (plain mailto, no obfuscation — D-31) |
| LinkedIn | https://www.linkedin.com/in/jason-m-kaufman/ |
| Employer | Epsilon C5I, Inc |
| Role 1 | Software Engineer, Raytheon GPNTS · 05/2020–07/2022 · C++, Java, Python, C# · Linux, Git, Jenkins, Selenium WebDriver, Google Test |
| Role 2 | Software Engineer, Raytheon SSDS · 07/2018–04/2020 · C++, Java · Linux, Java Swing, Git |
| Project | Pong — "Pong built entirely in React" — https://pong.jasonkaufman.dev — repo https://github.com/jmkaufman/Pong — thumbnail Pong_Thumbnail.png |
| Skills (derive) | C++, Java, Python, C#, Linux, Git, Jenkins, Selenium WebDriver, Google Test, Java Swing |

### Open content items the owner must supply (do NOT block the build; needed before launch)
1. **GitHub profile URL** — D-04 calls for a GitHub social link; current site has none (only the Pong repo). Likely `https://github.com/jmkaufman` — confirm.
2. **Content is sparse** (1 employer, 1 project). Decide whether to add more projects/roles or launch lean.
3. **OG/social image** — needs to be designed/provided (or generated as a simple branded card).
4. **Bio expansion** — optional; current bio is two short lines.

## Task breakdown (ordered, dependency-aware)

| Task | Description | Depends on | Decisions |
|---|---|---|---|
| **T-01 Scaffold & cleanup** | Remove React/Parcel + deps; create dir structure; new dev-only package.json (eslint+prettier) + configs; .gitignore | — | D-01, D-03, D-07, D-19 |
| **T-02 Design tokens** | `tokens.css`: color (neutral + 2 accents, light/dark), modular type scale, spacing, radii, shadow, motion durations | T-01 | D-08, D-17, D-18, D-26 |
| **T-03 Base & layout CSS** | Reset, semantic element defaults, fluid responsive layout (clamp/grid/flex), print stylesheet, reduced-motion block | T-02 | D-08, D-13, D-15, D-30 |
| **T-04 HTML skeleton** | `index.html`: semantic landmarks, all 5 sections, skip-link, `<head>` meta+OG+Twitter+JSON-LD, modulepreload, inline critical CSS + theme-init script | T-02 | D-05, D-06, D-10, D-11, D-14, D-21, D-29 |
| **T-05 Content migration** | Author real content (table above) into the HTML; accept-duplication markup pattern for repeated blocks | T-04 | D-05, D-28, D-34 |
| **T-06 Component styling** | Style nav, hero, experience, project cards, skills, contact, footer; "modern & bold" w/ guardrails; both themes; AA contrast | T-03, T-04 | D-11, D-13, D-16, D-18 |
| **T-07 JS enhancements** | `theme.js` (toggle+persist), `nav.js` (smooth scroll + active highlight), `main.js`; progressive, reduced-motion aware | T-04 | D-11, D-14, D-15 |
| **T-08 Favicon + manifest** | Modern favicon set (svg/ico/apple-touch + 192/512 png), `manifest.webmanifest`, Apple/theme-color meta | T-01 | D-24 |
| **T-09 SEO & crawler files** | OG image wiring, `sitemap.xml`, `robots.txt` (+ sitemap ref), JSON-LD Person | T-04 | D-21 |
| **T-10 Security hardening** | meta CSP, `rel="noopener"` on external links, plain mailto (no obfuscation), document dependency-free posture + D-31 caveats | T-04, T-07 | D-20, D-31 |
| **T-11 Accessibility pass** | skip-link, `:focus-visible`, alt text, ARIA labels (icons/toggle/nav), heading order, `aria-current`, contrast verify | T-05, T-06, T-07 | D-12, D-29 |
| **T-12 Style guide page** | `styleguide.html` rendering all tokens + components in isolation | T-02, T-06 | D-27 |
| **T-13 Deploy config** | `CNAME`, `404.html`, configure GH Pages to serve dedicated deploy-branch root; document working-branch → deploy-branch flow | T-01 | D-02, D-25, D-30, D-32 |
| **T-14 Verification** | Local preview via VS Code Live Server; Lighthouse (perf/a11y/SEO/best-practices), HTML validation, broken-link check; fix to green | all | D-23, D-33 |
| **T-15 CI workflow** | `.github/workflows` Action running Lighthouse + HTML validation + link-check on push/PR | T-04, T-13 | D-35 |

Parallelizable once T-04 lands: T-06/T-07/T-08/T-09 can proceed concurrently; T-10/T-11
are cross-cutting passes; T-12/T-14/T-15 last.

### Commit discipline (one commit per task)
- **Make exactly one commit per task (T-01…T-15)**, committed only after that task is complete and verified.
- **Commit message format:** subject begins with the task ID + decision IDs, e.g.
  `T-02: add design tokens (D-08, D-17, D-18, D-26)`.
- After each commit, update the **Status** column for that task's row in the traceability
  matrix in `MODERNIZATION_DESIGN.md` with the commit hash (or ✅).
- The cross-cutting passes (T-10, T-11) still get their own commit each.

## Traceability matrix (decision → task → artifact)

| Decision(s) | Task(s) | Artifact(s) |
|---|---|---|
| D-01, D-03, D-07 | T-01 | repo structure, removal of `src/`+Parcel, `package.json` |
| D-02, D-25 | T-13 | `CNAME`, GH Pages branch config |
| D-04 | T-05, T-10 | mailto + LinkedIn/GitHub links in `index.html` |
| D-05, D-28 | T-04, T-05 | semantic `index.html`, duplicated card blocks |
| D-06 | T-04 | `modulepreload`, inline critical CSS |
| D-08, D-26 | T-02, T-03 | `tokens.css`, `base.css` |
| D-09 | T-06, T-08 | inline SVG icons |
| D-10 | T-04, T-05 | section structure (About/Exp/Projects/Skills/Contact) |
| D-11 | T-04, T-06, T-07 | nav markup + `nav.js` |
| D-12, D-29 | T-11 | a11y features across HTML/CSS/JS |
| D-13 | T-03, T-06 | responsive `layout.css` |
| D-14 | T-04, T-07 | theme-init script + `theme.js` |
| D-15 | T-03, T-07 | reduced-motion CSS, animation logic |
| D-16, D-18 | T-02, T-06 | tokens + `components.css` |
| D-17 | T-02 | system font stack in tokens |
| D-19 | T-01 | `package.json` devDeps, eslint/prettier configs |
| D-20, D-31 | T-10 | meta CSP, `rel=noopener`, posture docs |
| D-21 | T-04, T-09 | OG/Twitter/JSON-LD, `sitemap.xml`, `robots.txt`, `og-image.png` |
| D-22 | (none — absence verified) | no analytics scripts |
| D-23, D-33 | T-14 | local preview, Lighthouse/HTML/link check results |
| D-24 | T-08 | favicon set + `manifest.webmanifest` |
| D-27 | T-12 | `styleguide.html` |
| D-30 | T-03, T-13 | print stylesheet, `404.html`, no-JS degradation |
| D-32 | T-13 | dedicated deploy branch (root) |
| D-34 | T-05, T-06 | content-only migration, fresh visual system |
| D-35 | T-15 | `.github/workflows` CI Action |
| D-36 | all | objective comments referencing decision IDs |

## Verification

End-to-end checks (D-23), run after the build:
1. **Serve locally** with VS Code Live Server (or `npx serve`) and manually exercise: nav
   smooth-scroll + active highlight, theme toggle persistence + no-flash on reload,
   responsive layout at mobile/desktop widths, and JS-disabled rendering (content +
   default theme still present).
2. **Lighthouse** (Chrome DevTools or `lighthouse` CLI) on the built page — target ≥95
   for Performance, Accessibility, Best Practices, SEO.
3. **HTML validation** via the W3C validator (Nu) — zero errors.
4. **Broken-link check** across all internal anchors and external links.
5. **Accessibility spot-checks**: keyboard-only traversal (skip-link, focus order,
   visible focus), screen-reader landmark/heading sanity, axe DevTools scan, contrast
   verification of both themes against AA.
6. **Social preview**: validate OG/Twitter tags render a correct card.

## Definition of done

All 15 tasks complete, **each landed as its own commit** (subject prefixed with the task ID
+ decision IDs); verification (T-14) green; CI (T-15) passing; the traceability-matrix
**Status** column in `MODERNIZATION_DESIGN.md` updated per task with the commit ref; open
content items above surfaced to the owner.

## Related artifacts
- [MODERNIZATION_DESIGN.md](MODERNIZATION_DESIGN.md) — the 36 decisions + authoritative traceability matrix
- [HANDOFF_PROMPT.md](HANDOFF_PROMPT.md) — self-contained prompt to drive the build in a fresh session
- [task-memory/](task-memory/) — per-task memory artifacts
- [sessions/2026-06-20-modernization-design.md](sessions/2026-06-20-modernization-design.md) — verbatim design-session record
