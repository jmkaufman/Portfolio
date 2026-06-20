---
name: task-t14-verification
description: Build task T-14 — local preview and the D-23 verification checks
metadata:
  type: project
---

**Task T-14 — Verification.** Confirm the build meets the quality bar before launch.

- **Scope:** Serve locally via VS Code Live Server and manually exercise nav highlight/smooth-scroll, theme toggle persistence + no-flash, responsive layout at mobile/desktop, and JS-disabled rendering. Run Lighthouse (target ≥95 perf/a11y/best-practices/SEO), W3C HTML validation (zero errors), broken-link check, axe DevTools scan + keyboard traversal, and validate the social preview.
- **Implements:** D-23 (Lighthouse + HTML validation + link check), D-33 (VS Code Live Server local preview).
- **Depends on:** all build tasks (T-01…T-13).
- **Artifacts:** check results; fixes applied to reach green.
- **Notes:** The automated subset of these checks is run continuously by [[task-t15-ci-workflow]]. Confirms no-JS degradation from [[task-t07-js-enhancements]] and AA from [[task-t11-accessibility-pass]].
