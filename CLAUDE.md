# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio website (jasonkaufman.dev), built with React 18 + TypeScript and bundled by Parcel. Hosted on AWS. Single-page app with all content rendered on one route (`/`).

## Commands

- `npm start` — dev server with hot reload (Parcel, entry `src/index.html`)
- `npm run build` — production build to `dist/`
- `npx eslint src` — lint (no npm script defined for it)

There is no test suite.

## Architecture

The app is a single-page composition with no client-side routing branches in practice — `App.tsx` defines one `<Route path="/">` rendering `Home`. `Home` stacks the page sections: `TopBar`, `About`, `WorkHistory`, `Projects`.

**Data-driven sections.** `WorkHistory` and `Projects` are the only dynamic parts. Both follow the same pattern:
- On mount, a `useEffect` IIFE `fetch`es a JSON file from `public/data/` (`WorkHistory.json`, `PersonalProjects.json`), stores it in `useState`, and shows `"Loading..."` until it resolves.
- The fetched array is mapped into child "Block" components (`WorkHistoryBlock`, `ProjectsBlock`).
- The JSON shape is mirrored by TypeScript types in the corresponding `*Models.ts` file (`WorkHistoryModels.ts`, `PersonalProjectsModels.ts`). **When editing the data JSON, keep the matching `*Models.ts` type in sync.**

To change portfolio content (jobs, projects), edit the JSON in `public/data/` — not the components. These files are served as static assets via `parcel-reporter-static-files-copy` (configured by `staticFiles` in `package.json`); the whole `public/` dir is copied into the build.

**Styling.** One CSS file per top-level component in `src/stylesheets/`, imported at the top of its component (e.g. `import "./stylesheets/Home.css"`). No CSS-in-JS or modules.

## Conventions

- ESLint extends `eslint:recommended` + `@typescript-eslint/recommended`; `prefer-const` is disabled, so `let` for never-reassigned locals is allowed (note: a recent commit migrated many to `const` anyway).
- Components are typed `(): JSX.Element` and default-exported.
- TypeScript config is minimal (`@tsconfig/node16` base, `jsx: react-jsx`, `lib: DOM`).
