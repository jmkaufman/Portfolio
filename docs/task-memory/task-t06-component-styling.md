---
name: task-t06-component-styling
description: Build task T-06 — style all components in the modern & bold system, both themes
metadata:
  type: project
---

**Task T-06 — Component styling.** The visual skin for every section.

- **Scope:** Style nav, hero, experience entries, project cards, skills, contact, footer in `styles/components.css`. Apply the "modern & bold" aesthetic bound by the seven D-16 guardrails (one bold move per view; bold type/calm color; strict scale + spacing tokens; generous whitespace; accent discipline ~5–10%; restrained motion; remove/shrink when in doubt). Implement light and dark themes; verify AA contrast.
- **Implements:** D-11 (nav styling), D-13 (responsive), D-16 (modern & bold + guardrails), D-18 (color/accents), D-34 (fresh visual system).
- **Depends on:** [[task-t03-base-layout-css]], [[task-t04-html-skeleton]].
- **Artifacts:** `styles/components.css`.
- **Notes:** All values reference [[task-t02-design-tokens]] — no hardcoded magic numbers. Verified by [[task-t11-accessibility-pass]] (contrast) and showcased in [[task-t12-style-guide]].
