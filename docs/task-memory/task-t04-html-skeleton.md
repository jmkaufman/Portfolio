---
name: task-t04-html-skeleton
description: Build task T-04 — semantic index.html skeleton, head metadata, modulepreload, theme-init
metadata:
  type: project
---

**Task T-04 — HTML skeleton.** The structural and `<head>` backbone of `index.html`.

- **Scope:** Semantic landmarks (`header`/`nav`/`main`/`footer`), all five sections (About/Hero, Experience, Projects, Skills/Tech, Contact), skip-to-content link, heading order. `<head>`: meta + Open Graph + Twitter Card + JSON-LD `Person`, `<link rel="modulepreload">` for JS modules, inline critical CSS, and the inline theme-init script that prevents flash-of-wrong-theme.
- **Implements:** D-05 (hardcoded semantic HTML), D-06 (modulepreload + inline critical CSS), D-10 (sections/IA), D-11 (nav markup), D-14 (theme-init script), D-21 (meta/OG/JSON-LD), D-29 (skip-link, heading order, a11y scaffolding).
- **Depends on:** [[task-t02-design-tokens]].
- **Artifacts:** `index.html` (structure + head).
- **Notes:** Content text comes next in [[task-t05-content-migration]]. Styling in [[task-t06-component-styling]]; behavior in [[task-t07-js-enhancements]]. Core task that unblocks the parallelizable group.
