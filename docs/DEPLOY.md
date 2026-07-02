# Deployment

The site is static and zero-build (D-03): the repository root **is** the published
site, so there is nothing to compile. GitHub Pages serves it **directly from the
`master` branch root** at the custom domain `jasonkaufman.dev` (D-02, D-25, D-32).

## Branch model (D-32, revised 2026-07-02)

`master` is both the source of truth and the published branch — appropriate for a
zero-build site where source == published (a separate deploy branch would only add
sync/drift overhead). Develop on short-lived feature branches, open a pull request into
`master`, let the `Verify` CI (Lighthouse + HTML validation + link-check) gate it, and
merge. **Merging to `master` publishes** — GitHub Pages redeploys automatically.

## One-time GitHub Pages settings (GitHub web UI)

1. Repo → **Settings → Pages**.
2. **Build and deployment → Source:** *Deploy from a branch*.
3. **Branch:** `master`, folder **`/ (root)`** → Save.
4. **Custom domain:** `jasonkaufman.dev` (pinned by the `CNAME` file at the repo root).
   Tick **Enforce HTTPS** once the certificate is issued.

`.nojekyll` at the root makes Pages serve the files verbatim instead of running Jekyll.

## Recommended branch protection (`master`)

Since `master` publishes on merge, protect it: require a pull request and require the
`Verify` status checks to pass before merging, and include administrators. Every change
then flows feature-branch → PR (CI-gated) → `master` → live.

## DNS (registrar: Squarespace Domains)

The apex `jasonkaufman.dev` uses A/AAAA records pointing at GitHub Pages (a CNAME is
invalid at the apex):

```
A     @   185.199.108.153
A     @   185.199.109.153
A     @   185.199.110.153
A     @   185.199.111.153
AAAA  @   2606:50c0:8000::153
AAAA  @   2606:50c0:8001::153
AAAA  @   2606:50c0:8002::153
AAAA  @   2606:50c0:8003::153
CNAME www jmkaufman.github.io
```

`www` redirects to the apex (GitHub handles the redirect). The `pong` subdomain
(`pong.jasonkaufman.dev` → its own AWS CloudFront distribution) is independent — leave
that record in place, and keep the CloudFront distribution alive as long as the
portfolio links to it. The `.dev` TLD is HSTS-preloaded, so browsers force HTTPS; GitHub
provisions the Let's Encrypt certificate automatically once DNS verifies. If the Pages
DNS check shows a stale failure right after a change, use **Check again** — it does not
affect the live site.

## Verifying a deploy

After Pages reports the deploy is live:

- `https://jasonkaufman.dev/` loads over HTTPS with the correct content and theme.
- A missing path (e.g. `/nope`) serves the custom `404.html`.
- The favicon, OG image, `robots.txt`, and `sitemap.xml` resolve at the root.
