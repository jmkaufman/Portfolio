---
name: task-t13-deploy-config
description: Build task T-13 — GitHub Pages deploy config, CNAME, custom 404
metadata:
  type: project
---

**Task T-13 — Deploy config.** Wire up GitHub Pages hosting at the custom domain.

- **Scope:** Add `CNAME` (jasonkaufman.dev); create a custom `404.html`; configure GitHub Pages to serve from the **root of a dedicated deploy branch**; document the working-branch → deploy-branch flow.
- **Implements:** D-02 (GitHub Pages), D-25 (keep jasonkaufman.dev via CNAME), D-30 (custom 404), D-32 (dedicated deploy branch, root).
- **Depends on:** [[task-t01-scaffold]].
- **Artifacts:** `CNAME`, `404.html`, GitHub Pages settings, deploy-flow note.
- **Notes:** Branch deploy needs no automation itself — push to the deploy branch and Pages publishes. CI checks are separate ([[task-t15-ci-workflow]]). `.dev` is HSTS-preloaded (browser-forced HTTPS), see [[task-t10-security-hardening]].
