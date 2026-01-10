# @kalink-ui/eslint-config

## 0.11.1

### Patch Changes

- 3642627: Trigger publish with trusted publishing and Playwright setup updates.

## 0.11.0

### Minor Changes

- ecc5d1b: Simplify ESLint config by removing unused `projectService` and `tsconfigRootDir` parser options.

  Add `name` properties to config objects for better debugging with ESLint config inspector.

  **Note:** If you extended this config with type-aware rules (e.g., `@typescript-eslint/no-floating-promises`),
  you will need to add `projectService: true` to your own config's `languageOptions.parserOptions`.

- 1efa841: Harden test suites (Vitest v4, Playwright, Storybook) and improve accessibility.

  Breaking changes (still released as `minor` because we are in `0.x`):
  - `@kalink-ui/seedly`: `ButtonIcon` now requires a `label` prop for accessibility.
    - Migration: replace `aria-label="..."` with `label="..."` on `ButtonIcon`.
    - Icon children are treated as decorative (`aria-hidden`) and the label is announced via visually-hidden text.

## 0.10.2

### Patch Changes

- 799c0ef: Update peer dependencies

## 0.10.1

### Patch Changes

- 8ec0736: Fix typing issues and tooling configuration

## 0.10.0

### Minor Changes

- 2a6e735: Add curly brace rule to enforce block scope

## 0.9.0

### Minor Changes

- edd6215: Fix import rules

## 0.8.0

### Minor Changes

- 7fe5a15: Fix issues with TypeScript config and setup Github Actions

## 0.7.0

### Minor Changes

- 8b05749: Correctly ignore build and nextjs artefacts in configs

## 0.6.0

### Minor Changes

- 1a814c5: Ignore artefact directories from linting

## 0.5.0

### Minor Changes

- 0c7e758: Change eslint config export strategy

## 0.4.0

### Minor Changes

- 87e2ae2: Create new Dibbly package to centralize utils and common types

## 0.3.0

### Minor Changes

- 293d796: Correctly specify peer dependencies

## 0.2.0

### Minor Changes

- Update dependencies and correctly include files in package bundle

## 0.1.0

### Minor Changes

- Initial publish of @kalink-ui packages
