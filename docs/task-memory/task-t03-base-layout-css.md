---
name: task-t03-base-layout-css
description: Build task T-03 — base reset/element styles, responsive layout, print stylesheet, reduced-motion
metadata:
  type: project
---

**Task T-03 — Base & layout CSS.** Foundational styling beneath the components.

- **Scope:** `styles/base.css` (modern reset, semantic element defaults, print stylesheet, `prefers-reduced-motion` block) and `styles/layout.css` (responsive scaffolding with flexbox/grid, fluid type via `clamp()`, mobile + desktop equal priority).
- **Implements:** D-08 (plain CSS), D-13 (fully responsive, mobile-first methodology), D-15 (reduced-motion disables animation), D-30 (print stylesheet, graceful degradation).
- **Depends on:** [[task-t02-design-tokens]].
- **Artifacts:** `styles/base.css`, `styles/layout.css`.
- **Notes:** Print stylesheet matters because recruiters print/PDF portfolios (D-30). Reduced-motion is a hard requirement (D-15/WCAG). Pairs with [[task-t06-component-styling]].
