---
name: task-t10-security-hardening
description: Build task T-10 — meta CSP, rel=noopener, plain mailto, documented dependency-free posture
metadata:
  type: project
---

**Task T-10 — Security hardening.** Static-site-appropriate defense-in-depth.

- **Scope:** Add a `<meta>` Content-Security-Policy (GitHub Pages cannot set headers); `rel="noopener"` on all external `target="_blank"` links; keep mailto plain/un-obfuscated; document the dependency-free posture and the D-31 caveats (meta-CSP cannot express `frame-ancestors`/reporting — clickjacking N/A for a no-login static site; `.dev` gives browser-enforced HSTS via preload).
- **Implements:** D-20 (CSP, rel=noopener, dependency-free, HTTPS), D-31 (security posture documentation; plain mailto).
- **Depends on:** [[task-t04-html-skeleton]], [[task-t07-js-enhancements]] (CSP must allow the inline theme-init + module scripts).
- **Artifacts:** meta CSP + link attributes in `index.html`; posture note (in `docs/` or a comment).
- **Notes:** CSP must accommodate the inline critical CSS and inline theme-init script from T-04 (use hashes/nonces or `'unsafe-inline'` deliberately, documented per [[comment-convention]]).
