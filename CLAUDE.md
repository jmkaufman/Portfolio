# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio website (jasonkaufman.dev): a **zero-build, framework-free static
site** — hand-authored semantic HTML, plain CSS with custom properties, and vanilla
JavaScript (native ES modules). No bundler and no runtime dependencies; the deployed
artifact is pure static files. Hosted on GitHub Pages. Single page (`index.html`) with
in-page sections.

> This replaced an earlier React 18 + TypeScript + Parcel SPA. The rebuild is recorded
> in `docs/` — design decisions (D-01…D-36) in `docs/MODERNIZATION_DESIGN.md`, the task
> plan in `docs/IMPLEMENTATION_PLAN.md`. Treat those decisions as binding.

## Commands

There is **no build step**. Serve the project root over HTTP (needed for ES modules):

- VS Code **Live Server** ("Go Live"), `npx serve`, or `python -m http.server`
- `npm install` then `npm run lint` (ESLint) / `npm run format` (Prettier, writes) /
  `npm run format:check` (Prettier, verify only) — dev-only tooling in
  `devDependencies`, never shipped (D-19)

CI (`.github/workflows/verify.yml`) runs Lighthouse (config in `.lighthouserc.json`) +
W3C HTML validation + link-check on push/PR. There is no unit-test suite (testing is via
those checks, D-23).

## Architecture

- `index.html` — all content, hardcoded in semantic HTML (D-05). Landmarks + five
  sections (About/Hero, Experience, Projects, Skills, Contact). The `<head>` carries
  meta/OG/Twitter/JSON-LD, inline critical CSS, and an inline theme-init script.
- `styles/` — `tokens.css` (the single source of truth for all visual primitives —
  color, type scale, spacing, radii, shadow, motion; D-26), then `base.css`,
  `layout.css`, `components.css`. Theming uses the native `light-dark()` function
  driven by `color-scheme`; the manual toggle sets `[data-theme]` (D-14).
- `js/` — ES modules: `main.js` (entry), `theme.js` (toggle + localStorage),
  `nav.js` (active-section highlight). JS is **enhancement only** — content and a
  sensible default theme work with JS disabled.
- `assets/` — favicon set, `og-image.png`, `img/pong-thumbnail.webp` (+ png fallback).
- `404.html`, `styleguide.html` (token/component gallery), plus `CNAME`, `robots.txt`,
  `sitemap.xml`, `manifest.webmanifest`, `.nojekyll`.

**To change content** (jobs, projects, skills, contact), edit `index.html` directly.
Repeated blocks (experience entries, project cards) are intentionally duplicated markup
(D-28) — copy a `.role` / `.project-card` block to add one. There is no data file or
templating.

**Image assets** (favicons, OG card, WebP thumbnail) are generated with dev-only Python
+ Pillow scripts; they are not part of the shipped site. See git history for T-08/T-09.

## Conventions

- Filenames kebab-case; CSS classes light-BEM (`.project-card__title`).
- No magic numbers in CSS — every value references a token in `styles/tokens.css`.
- Comments use an objective tone and reference the decision ID when explaining *why*,
  e.g. `/* meta CSP per D-20/D-31 */` (D-36).
- Modern browsers only (D-07): native ES modules, `light-dark()`, `color-mix()`, etc.
- Security: meta CSP (the inline theme-init is allowlisted by a SHA-256 hash — recompute
  it if that script changes; `.gitattributes` pins web assets to LF to keep the hash
  stable). See `docs/SECURITY.md`.

## Deploy

GitHub Pages serves the site directly from the **`master` branch root** — zero-build,
so source == published (D-32, revised). Develop on short-lived feature branches, open a
PR into `master` (the `Verify` CI gates it), and merging auto-publishes. See
`docs/DEPLOY.md` for Pages settings and DNS.
