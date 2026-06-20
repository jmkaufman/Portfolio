---
name: comment-convention
description: Code comments must use an objective tone and reference design-doc decision IDs / traceability matrix
metadata:
  type: feedback
---

Code comments in this project use an **objective, neutral tone** — no first-person, marketing, or editorializing voice. When a comment explains *why* something is done a certain way, it **references the relevant decision ID / traceability matrix** in `docs/MODERNIZATION_DESIGN.md`.

Example: `/* meta CSP per D-20/D-31 — header-based CSP unavailable on GitHub Pages */`

**Why:** keeps every rationale traceable back to a recorded decision rather than restating opinion; supports the traceability goal of the modernization effort.

**How to apply:** this is decision D-36 and binds both the planning work and the delegated build agent. Applies to all code/config comments produced for the portfolio rewrite (see [[task-t01-scaffold]], [[task-t10-security-hardening]]).
