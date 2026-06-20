---
name: task-t08-favicon-manifest
description: Build task T-08 — modern favicon set and minimal web manifest (no service worker)
metadata:
  type: project
---

**Task T-08 — Favicon + manifest.** Cross-platform icon coverage with zero maintenance.

- **Scope:** Modern favicon set (`favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`), a minimal `manifest.webmanifest` (name/short_name/icons/theme_color/background_color/display), and the Apple meta + `theme-color` tags in the head. NO service worker.
- **Implements:** D-24 (favicon set + minimal manifest, no service worker).
- **Depends on:** [[task-t01-scaffold]].
- **Artifacts:** `assets/favicon.svg`, `assets/favicon.ico`, `assets/apple-touch-icon.png`, `assets/icon-192.png`, `assets/icon-512.png`, `manifest.webmanifest`.
- **Notes:** iOS coverage comes from the apple-touch-icon + Apple meta tags; the manifest mainly adds Android home-screen + themed-UI polish. Existing `public/favicon.ico` can be a starting point but a modern SVG-first set is preferred.
