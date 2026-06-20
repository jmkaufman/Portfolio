# Deployment

The site is static and zero-build (D-03): the repository root **is** the published
site, so there is nothing to compile. Hosting is GitHub Pages at the custom domain
`jasonkaufman.dev` (D-02, D-25).

## Branch model (D-32)

- **Working branch** — development happens here (currently `Refactoring`; merge to
  `master` when a set of changes is ready).
- **`gh-pages`** — the dedicated deploy branch GitHub Pages serves from, at its root.

Keeping the published branch separate from the working branch gives a clean
source/published split.

## One-time GitHub Pages settings (GitHub web UI — cannot be scripted)

1. Repo → **Settings → Pages**.
2. **Build and deployment → Source:** *Deploy from a branch*.
3. **Branch:** `gh-pages`, folder **`/ (root)`** → Save.
4. **Custom domain:** `jasonkaufman.dev` (this is also pinned by the `CNAME` file in
   the repo). Tick **Enforce HTTPS** once the certificate is issued.

`.nojekyll` is committed at the root so Pages serves the files verbatim instead of
running them through Jekyll.

## DNS (registrar for jasonkaufman.dev)

Point the apex domain at GitHub Pages:

```
A     @   185.199.108.153
A     @   185.199.109.153
A     @   185.199.110.153
A     @   185.199.111.153
AAAA  @   2606:50c0:8000::153
AAAA  @   2606:50c0:8001::153
AAAA  @   2606:50c0:8002::153
AAAA  @   2606:50c0:8003::153
```

Optionally add `CNAME  www  jmkaufman.github.io.` for the `www` host. The `.dev` TLD
is on the HSTS preload list, so browsers force HTTPS regardless (D-31).

## Publishing

From a clean working branch, mirror it to `gh-pages`:

```bash
git push origin master:gh-pages
```

(Use `Refactoring:gh-pages` until the work is merged to `master`.) Pages redeploys on
each push. Dev-only files (`docs/`, `package.json`, lint configs) ride along but are
never served meaningfully, and `.nojekyll` keeps the static files untouched.

### Optional: a content-only deploy branch

For a stricter split (only site files on `gh-pages`), publish from a throwaway
worktree that contains just the served files:

```bash
git worktree add -B gh-pages ../portfolio-pages
# in ../portfolio-pages: keep only index.html, 404.html, styleguide.html, CNAME,
# robots.txt, sitemap.xml, manifest.webmanifest, .nojekyll, styles/, js/, assets/
git -C ../portfolio-pages add -A && git -C ../portfolio-pages commit -m "Publish"
git -C ../portfolio-pages push origin gh-pages
git worktree remove ../portfolio-pages
```

## Verifying a deploy

After Pages reports the deploy is live:

- `https://jasonkaufman.dev/` loads over HTTPS with the correct content and theme.
- A missing path (e.g. `/nope`) serves the custom `404.html`.
- The favicon, OG image, `robots.txt`, and `sitemap.xml` resolve at the root.
