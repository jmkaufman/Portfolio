---
name: task-t01-scaffold
description: Build task T-01 — scaffold the zero-build static site and remove the old React/Parcel stack
metadata:
  type: project
---

**Task T-01 — Scaffold & cleanup.** Establish the new zero-build, framework-free project structure and remove the legacy stack.

- **Scope:** Remove the React 18 + TypeScript `src/` app, Parcel config, and all React/Parcel npm deps. Create the target directory layout (`index.html`, `styles/`, `js/`, `assets/`, crawler/deploy files). Add a dev-only `package.json` (ESLint + Prettier only), `.eslintrc`, `.prettierrc`, and `.gitignore` (ignoring `node_modules`).
- **Implements:** D-01 (vanilla JS, no framework), D-03 (zero-build + native ES modules), D-07 (modern browsers only), D-19 (dev-only ESLint+Prettier, never shipped).
- **Depends on:** nothing (foundation task).
- **Artifacts:** repo directory structure, `package.json` (devDependencies only), `.eslintrc`, `.prettierrc`, `.gitignore`.
- **Notes:** dev tooling must never end up in the deployed artifact. Follow [[comment-convention]] for any config comments. Foundation for [[task-t02-design-tokens]] and [[task-t08-favicon-manifest]].
