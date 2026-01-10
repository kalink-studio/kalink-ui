# @kalink-ui/canopy

## 0.1.3

### Patch Changes

- a9c74d3: Rebump packages to align dev with trusted publishing rollout.

## 0.1.2

### Patch Changes

- 7098356: Align package repository URLs with provenance origin for trusted publishing.

## 0.1.1

### Patch Changes

- 3642627: Trigger publish with trusted publishing and Playwright setup updates.

## 0.1.0

### Minor Changes

- 1efa841: Harden test suites (Vitest v4, Playwright, Storybook) and improve accessibility.

  Breaking changes (still released as `minor` because we are in `0.x`):
  - `@kalink-ui/seedly`: `ButtonIcon` now requires a `label` prop for accessibility.
    - Migration: replace `aria-label="..."` with `label="..."` on `ButtonIcon`.
    - Icon children are treated as decorative (`aria-hidden`) and the label is announced via visually-hidden text.

## 0.0.2

### Patch Changes

- 8ec0736: Fix typing issues and tooling configuration
