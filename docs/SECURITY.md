# Security posture

This portfolio is a static, dependency-free site on GitHub Pages. The notes below
record the defensive posture and its deliberate limitations (D-20, D-31).

## Dependency-free by design
- No runtime dependencies ship: hand-authored HTML/CSS and vanilla ES modules only.
- No third-party scripts, CDNs, web fonts, trackers, or analytics (D-22). There is
  no external code to compromise and nothing that phones home.
- ESLint/Prettier are dev-only (`devDependencies`) and never deployed (D-19).

## Content-Security-Policy (via `<meta>`)
GitHub Pages cannot set HTTP response headers, so the CSP is delivered with a
`<meta http-equiv="Content-Security-Policy">` tag in `index.html` (D-20).

- `default-src 'self'` — everything is same-origin.
- `script-src 'self' 'sha256-…'` — the only inline script (the no-flash theme
  bootstrap) is allowlisted by its SHA-256 hash; all other scripts are same-origin
  ES modules. No `'unsafe-inline'` for scripts.
- `style-src 'self' 'unsafe-inline'` — the inline critical CSS is allowed via
  `'unsafe-inline'`. Style injection is low-risk here: the site takes no user input
  and stores no state, so the simpler policy is an accepted trade-off.
- `object-src 'none'`, `base-uri 'self'`, `form-action 'none'` — hardening defaults.

**Hash stability:** the script hash is byte-sensitive. `.gitattributes` pins web
assets to LF so a CRLF checkout cannot change the inline-script bytes and silently
break the policy. If the inline theme-init script is edited, recompute the hash.

## Known limitations (acceptable for this site) — D-31
- A `<meta>` CSP **cannot** express `frame-ancestors` or `report-uri`/`report-to`.
  Clickjacking is not a concern: the site has no authentication and no
  state-changing actions, so there is nothing to frame and trick a user into.
- **HTTPS / HSTS:** the `.dev` TLD is on the HSTS preload list, so browsers force
  HTTPS for `jasonkaufman.dev` regardless of headers. GitHub Pages provides the
  certificate automatically.
- **Plain mailto:** `jkaufman217@gmail.com` is published un-obfuscated. This accepts
  modest harvesting exposure in exchange for one-click contact that works for every
  visitor including those with JavaScript disabled; provider spam filtering handles
  the rest.

## Outbound links
External links that open a new tab carry `rel="noopener"` so the opened page cannot
access `window.opener` (D-20).
