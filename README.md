# Personal Portfolio Website

Jason Kaufman's personal portfolio — live at <https://jasonkaufman.dev>.

A zero-build, framework-free static site: hand-authored semantic HTML, plain CSS with
custom properties, and vanilla JavaScript (native ES modules). No bundler and no runtime
dependencies — the deployed site is pure static files. Hosted on GitHub Pages.

## Local development

No build step. Serve the project root over HTTP (required for native ES modules):

- VS Code **Live Server** ("Go Live"), or
- `npx serve`, or
- `python -m http.server`

## Tooling (dev-only, never shipped)

ESLint and Prettier are the only dependencies and live in `devDependencies`:

- `npm install` — one-time, installs ESLint + Prettier
- `npm run lint` — lint `js/`
- `npm run format` — format with Prettier

## Documentation

- Design decisions: [`docs/MODERNIZATION_DESIGN.md`](docs/MODERNIZATION_DESIGN.md)
- Build plan & architecture: [`docs/IMPLEMENTATION_PLAN.md`](docs/IMPLEMENTATION_PLAN.md)
