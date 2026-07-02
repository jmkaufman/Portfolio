---
name: task-t12-style-guide
description: Build task T-12 — standalone styleguide.html token and component gallery
metadata:
  type: project
---

**Task T-12 — Style guide page.** Living documentation of the design system.

- **Scope:** Build `styleguide.html` rendering every token (colors, type scale, spacing, radii, shadows) and every component (nav, cards, buttons, links, section headers) in isolation, in both themes.
- **Implements:** D-27 (standalone style-guide gallery).
- **Depends on:** [[task-t02-design-tokens]], [[task-t06-component-styling]].
- **Artifacts:** `styleguide.html`.
- **Notes:** This is the low-friction surface for a future graphic designer to review/tweak components without touching the live page (supports the designer-handoff posture alongside [[task-t02-design-tokens]]). Pure static, zero tooling.
