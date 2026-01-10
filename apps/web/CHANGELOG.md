# web

## 0.3.0

### Minor Changes

- 1efa841: Harden test suites (Vitest v4, Playwright, Storybook) and improve accessibility.

  Breaking changes (still released as `minor` because we are in `0.x`):
  - `@kalink-ui/seedly`: `ButtonIcon` now requires a `label` prop for accessibility.
    - Migration: replace `aria-label="..."` with `label="..."` on `ButtonIcon`.
    - Icon children are treated as decorative (`aria-hidden`) and the label is announced via visually-hidden text.

### Patch Changes

- 5ce52ea: Fix React Server Components CVE vulnerabilities

## 0.2.0

### Minor Changes

- 7fe5a15: Fix issues with TypeScript config and setup Github Actions

### Patch Changes

- Updated dependencies [7fe5a15]
  - @kalink-ui/seedly@0.9.0

## 0.1.11

### Patch Changes

- Updated dependencies [6670251]
  - @kalink-ui/seedly@0.8.1

## 0.1.10

### Patch Changes

- Updated dependencies [fb11f86]
- Updated dependencies [abdbfa3]
  - @kalink-ui/seedly@0.8.0

## 0.1.9

### Patch Changes

- Updated dependencies [0c7e758]
  - @kalink-ui/seedly@0.7.0

## 0.1.8

### Patch Changes

- Updated dependencies [87e2ae2]
  - @kalink-ui/seedly@0.6.0

## 0.1.7

### Patch Changes

- Updated dependencies [73cbf48]
  - @kalink-ui/seedly@0.5.0

## 0.1.6

### Patch Changes

- Updated dependencies [293d796]
  - @kalink-ui/seedly@0.4.0

## 0.1.5

### Patch Changes

- Updated dependencies
  - @kalink-ui/seedly@0.3.0

## 0.1.4

### Patch Changes

- Updated dependencies
  - @kalink-ui/seedly@0.2.0

## 0.1.3

### Patch Changes

- Updated dependencies
  - @kalink-ui/seedly@0.1.2

## 0.1.2

### Patch Changes

- Updated dependencies
  - @kalink-ui/seedly@0.1.1

## 0.1.1

### Patch Changes

- Updated dependencies
  - @kalink-ui/seedly@0.1.0
