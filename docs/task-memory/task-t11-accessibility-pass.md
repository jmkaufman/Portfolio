---
name: task-t11-accessibility-pass
description: Build task T-11 — cross-cutting WCAG 2.1 AA accessibility pass
metadata:
  type: project
---

**Task T-11 — Accessibility pass.** Cross-cutting sweep to actually meet WCAG 2.1 AA.

- **Scope:** Skip-to-content link; visible `:focus-visible` indicators; alt text on all images; accessible labels (`aria-label`/visually-hidden text) for inline SVG icons, the theme toggle, and the nav; correct heading order; `aria-current` on the active nav link; verify color contrast of both themes against AA.
- **Implements:** D-12 (WCAG 2.1 AA target), D-29 (the specific a11y requirements).
- **Depends on:** [[task-t05-content-migration]], [[task-t06-component-styling]], [[task-t07-js-enhancements]].
- **Artifacts:** a11y features woven across `index.html`, `styles/*`, `js/*`.
- **Notes:** Cross-cutting — touches output of several tasks. Verified by the axe scan + keyboard traversal in [[task-t14-verification]].
