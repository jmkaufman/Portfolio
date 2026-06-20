---
name: task-t02-design-tokens
description: Build task T-02 — author tokens.css, the single source of truth for the visual system
metadata:
  type: project
---

**Task T-02 — Design tokens.** Create `styles/tokens.css` as the one documented file that controls the entire visual system.

- **Scope:** Define CSS custom properties for color (neutral base + two accents, with light/dark values), a strict modular type scale, spacing scale (`--space-*`), radii, shadows, motion durations, and breakpoints. Exact accent hues chosen here, verified WCAG AA in both themes.
- **Implements:** D-08 (plain CSS custom properties), D-17 (system font stack + modular scale), D-18 (neutral + two accents, AA-verified), D-26 (centralized tokens as single source of truth).
- **Depends on:** [[task-t01-scaffold]].
- **Artifacts:** `styles/tokens.css`.
- **Notes:** This is the dial a future designer turns ([[task-t12-style-guide]] showcases it). No arbitrary values anywhere else — everything references tokens (supports the D-16 guardrails). Feeds [[task-t03-base-layout-css]] and [[task-t06-component-styling]].
