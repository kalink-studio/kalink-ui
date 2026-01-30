# @kalink-ui/kalink

## 0.3.5

### Patch Changes

- Updated dependencies [e06ff34]
- Updated dependencies [89cc8dc]
- Updated dependencies [eae06e2]
- Updated dependencies [63a0911]
  - @kalink-ui/seedly@0.35.0

## 0.3.4

### Patch Changes

- Updated dependencies [3b84777]
  - @kalink-ui/seedly@0.34.4

## 0.3.3

### Patch Changes

- Updated dependencies [a9c74d3]
  - @kalink-ui/canopy@0.1.3
  - @kalink-ui/dibbly@0.6.3
  - @kalink-ui/seedly@0.34.3

## 0.3.2

### Patch Changes

- Updated dependencies [7098356]
  - @kalink-ui/canopy@0.1.2
  - @kalink-ui/dibbly@0.6.2
  - @kalink-ui/seedly@0.34.2

## 0.3.1

### Patch Changes

- Updated dependencies [3642627]
  - @kalink-ui/canopy@0.1.1
  - @kalink-ui/dibbly@0.6.1
  - @kalink-ui/seedly@0.34.1

## 0.3.0

### Minor Changes

- 1efa841: Harden test suites (Vitest v4, Playwright, Storybook) and improve accessibility.

  Breaking changes (still released as `minor` because we are in `0.x`):
  - `@kalink-ui/seedly`: `ButtonIcon` now requires a `label` prop for accessibility.
    - Migration: replace `aria-label="..."` with `label="..."` on `ButtonIcon`.
    - Icon children are treated as decorative (`aria-hidden`) and the label is announced via visually-hidden text.

### Patch Changes

- 5ce52ea: Fix React Server Components CVE vulnerabilities
- Updated dependencies [1efa841]
  - @kalink-ui/canopy@0.1.0
  - @kalink-ui/dibbly@0.6.0
  - @kalink-ui/seedly@0.34.0

## 0.2.16

### Patch Changes

- Updated dependencies [799c0ef]
  - @kalink-ui/dibbly@0.5.3
  - @kalink-ui/seedly@0.33.2
  - @kalink-ui/canopy@0.0.2

## 0.2.15

### Patch Changes

- 8ec0736: Fix typing issues and tooling configuration
- Updated dependencies [8ec0736]
  - @kalink-ui/canopy@0.0.2
  - @kalink-ui/seedly@0.33.1
  - @kalink-ui/dibbly@0.5.2

## 0.2.14

### Patch Changes

- 6ac14d3: Provide environments to github actions
- 57e1325: Correctly pass env vars to jobs
- Updated dependencies [c8c98c0]
  - @kalink-ui/seedly@0.33.0

## 0.2.13

### Patch Changes

- Updated dependencies [9d3abfd]
  - @kalink-ui/seedly@0.32.1

## 0.2.12

### Patch Changes

- Updated dependencies [40a1dbe]
  - @kalink-ui/seedly@0.32.0

## 0.2.11

### Patch Changes

- Updated dependencies [0afb723]
  - @kalink-ui/seedly@0.31.0

## 0.2.10

### Patch Changes

- Updated dependencies [0455c00]
  - @kalink-ui/seedly@0.30.1

## 0.2.9

### Patch Changes

- Updated dependencies [e257be4]
  - @kalink-ui/seedly@0.30.0

## 0.2.8

### Patch Changes

- Updated dependencies [174eb5b]
  - @kalink-ui/seedly@0.29.1

## 0.2.7

### Patch Changes

- Updated dependencies [8c2404f]
  - @kalink-ui/seedly@0.29.0

## 0.2.6

### Patch Changes

- Updated dependencies [d38d956]
  - @kalink-ui/seedly@0.28.0

## 0.2.5

### Patch Changes

- Updated dependencies [3a1d6bd]
  - @kalink-ui/seedly@0.27.0

## 0.2.4

### Patch Changes

- Updated dependencies [87daf77]
  - @kalink-ui/dibbly@0.5.2
  - @kalink-ui/seedly@0.26.3

## 0.2.3

### Patch Changes

- Updated dependencies [a97aad9]
- Updated dependencies [9bfff1e]
  - @kalink-ui/dibbly@0.5.1
  - @kalink-ui/seedly@0.26.2

## 0.2.2

### Patch Changes

- Updated dependencies [fef7681]
  - @kalink-ui/seedly@0.26.1

## 0.2.1

### Patch Changes

- Updated dependencies [c0f588b]
- Updated dependencies [e451989]
- Updated dependencies [29ce292]
  - @kalink-ui/seedly@0.26.0

## 0.2.0

### Minor Changes

- d6ae577: Initial setup of payload CMS

### Patch Changes

- @kalink-ui/dibbly@0.5.0
- @kalink-ui/seedly@0.25.0
