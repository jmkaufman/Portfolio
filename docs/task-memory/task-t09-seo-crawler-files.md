---
name: task-t09-seo-crawler-files
description: Build task T-09 — SEO metadata, social preview image, sitemap and robots
metadata:
  type: project
---

**Task T-09 — SEO & crawler files.** Make the site discoverable and shareable.

- **Scope:** Wire Open Graph + Twitter Card tags to an `assets/og-image.png` social preview; add JSON-LD `Person` structured data; create `sitemap.xml` and `robots.txt` (with a sitemap reference).
- **Implements:** D-21 (full meta + OG + Twitter Card, JSON-LD Person, sitemap + robots).
- **Depends on:** [[task-t04-html-skeleton]] (head tags land there; this task completes/validates them).
- **Artifacts:** `sitemap.xml`, `robots.txt`, `assets/og-image.png`, JSON-LD + OG/Twitter tags in `index.html`.
- **Open item:** the OG social image must be designed/provided by the owner (see [[portfolio-open-content-items]]). Existing `public/robots.txt` exists (allow-all) and can be extended.
