---
'@kalink-ui/eslint-config': minor
'@kalink-ui/canopy': minor
'@kalink-ui/dibbly': minor
'@kalink-ui/seedly': minor
'@kalink-ui/kalink': minor
'@kalink-ui/web': minor
---

Harden test suites (Vitest v4, Playwright, Storybook) and improve accessibility.

Breaking changes (still released as `minor` because we are in `0.x`):
- `@kalink-ui/seedly`: `ButtonIcon` now requires a `label` prop for accessibility.
  - Migration: replace `aria-label="..."` with `label="..."` on `ButtonIcon`.
  - Icon children are treated as decorative (`aria-hidden`) and the label is announced via visually-hidden text.
