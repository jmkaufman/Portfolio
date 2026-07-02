---
name: task-t07-js-enhancements
description: Build task T-07 — progressive-enhancement JS (theme toggle, nav highlight, smooth scroll)
metadata:
  type: project
---

**Task T-07 — JS enhancements.** Native ES modules adding behavior, strictly as enhancement.

- **Scope:** `js/theme.js` (auto + manual theme toggle, persisted in `localStorage`, coordinated with the inline theme-init from T-04), `js/nav.js` (smooth-scroll + active-section highlighting with `aria-current`), `js/main.js` (entry wiring the modules). All behavior must degrade gracefully (content + default theme work with JS off) and honor `prefers-reduced-motion`.
- **Implements:** D-11 (smooth scroll + active highlight), D-14 (theme toggle + persistence), D-15 (reduced-motion aware).
- **Depends on:** [[task-t04-html-skeleton]].
- **Artifacts:** `js/main.js`, `js/theme.js`, `js/nav.js`.
- **Notes:** Modules are loaded via `modulepreload` (D-06). JS is enhancement only — never required to see content (D-05). Verified for no-JS by [[task-t14-verification]].
