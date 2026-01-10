# @kalink-ui/dibbly

## 0.6.1

### Patch Changes

- 3642627: Trigger publish with trusted publishing and Playwright setup updates.

## 0.6.0

### Minor Changes

- 1efa841: Harden test suites (Vitest v4, Playwright, Storybook) and improve accessibility.

  Breaking changes (still released as `minor` because we are in `0.x`):
  - `@kalink-ui/seedly`: `ButtonIcon` now requires a `label` prop for accessibility.
    - Migration: replace `aria-label="..."` with `label="..."` on `ButtonIcon`.
    - Icon children are treated as decorative (`aria-hidden`) and the label is announced via visually-hidden text.

## 0.5.3

### Patch Changes

- 799c0ef: Update peer dependencies

## 0.5.2

### Patch Changes

- 87daf77: ci(release): ensure public publishes under the `@kalink-ui` scope by configuring npm scope auth in CI and Changesets access. No runtime code changes.

## 0.5.1

### Patch Changes

- a97aad9: build(dibbly): publish compiled ESM output and types
  - Export built files from `dist` with `type: module`.
  - Include `index.js` (ESM) and `index.d.ts` in package exports.
  - Add build script and emit JS + d.ts via `tsc`.
  - No runtime API changes; fixes Node/CLI import resolution (e.g., `isObject`).

## 0.5.0

### Minor Changes

- 5af6427: [useLocalStorage] Move hook in the dibbly package

## 0.4.0

### Minor Changes

- d24c5c8: Add create-required-context and merge-refs utilities

## 0.3.0

### Minor Changes

- 7fe5a15: Fix issues with TypeScript config and setup Github Actions

## 0.2.1

### Patch Changes

- f8cbf4e: Publish package

## 0.2.0

### Minor Changes

- 0c7e758: Change eslint config export strategy

## 0.1.0

### Minor Changes

- 87e2ae2: Create new Dibbly package to centralize utils and common types
