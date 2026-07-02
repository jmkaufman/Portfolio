---
name: task-t15-ci-workflow
description: Build task T-15 — GitHub Actions workflow running the verification checks
metadata:
  type: project
---

**Task T-15 — CI workflow.** Automate the D-23 checks on every change.

- **Scope:** Add a `.github/workflows/verify.yml` GitHub Action that runs Lighthouse + HTML validation + broken-link check on each push/PR and reports pass/fail.
- **Implements:** D-35 (CI verification workflow).
- **Depends on:** [[task-t04-html-skeleton]], [[task-t13-deploy-config]].
- **Artifacts:** `.github/workflows/verify.yml`.
- **Notes:** Free (unlimited minutes for public repos; generous quota if private). Tools run in the ephemeral cloud runner — nothing is added to the repo or shipped site, consistent with the dev-only tooling posture (D-19). Mirrors the manual checks in [[task-t14-verification]].
