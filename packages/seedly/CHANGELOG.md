# @kalink-ui/seedly

## 0.34.2

### Patch Changes

- 7098356: Align package repository URLs with provenance origin for trusted publishing.
- Updated dependencies [7098356]
  - @kalink-ui/dibbly@0.6.2

## 0.34.1

### Patch Changes

- 3642627: Trigger publish with trusted publishing and Playwright setup updates.
- Updated dependencies [3642627]
  - @kalink-ui/dibbly@0.6.1

## 0.34.0

### Minor Changes

- 1efa841: Harden test suites (Vitest v4, Playwright, Storybook) and improve accessibility.

  Breaking changes (still released as `minor` because we are in `0.x`):
  - `@kalink-ui/seedly`: `ButtonIcon` now requires a `label` prop for accessibility.
    - Migration: replace `aria-label="..."` with `label="..."` on `ButtonIcon`.
    - Icon children are treated as decorative (`aria-hidden`) and the label is announced via visually-hidden text.

### Patch Changes

- Updated dependencies [1efa841]
  - @kalink-ui/dibbly@0.6.0

## 0.33.2

### Patch Changes

- 799c0ef: Update peer dependencies
- Updated dependencies [799c0ef]
  - @kalink-ui/dibbly@0.5.3

## 0.33.1

### Patch Changes

- 8ec0736: Fix typing issues and tooling configuration
  - @kalink-ui/dibbly@0.5.2

## 0.33.0

### Minor Changes

- c8c98c0: Introduce the Radix-based `Collapsible` primitives and animated `CollapsibleContent`, and pull the new `@radix-ui/react-collapsible` dependency into Seedly.

## 0.32.1

### Patch Changes

- 9d3abfd: Add proper styling solution for Input component

## 0.32.0

### Minor Changes

- 40a1dbe: Add proper styling solution for form field component

## 0.31.0

### Minor Changes

- 0afb723: feat(seedly/form-field): switch to theme contract and export vars
  - Replace createGlobalTheme with createThemeContract + assignVars for FormField.
  - Export formFieldVars from the FormField module's index for external theming.

## 0.30.1

### Patch Changes

- 0455c00: Correctly re-export types for scale utilies

## 0.30.0

### Minor Changes

- e257be4: feat(styles): add dynamic fluid scale helpers

  New
  - `getInterpolationFor(value, options)`: per-value exponential mapping from a mobile range to a desktop range.
  - `toFluidClamp([min, max], options)`: build a viewport-based CSS `clamp()` with `interpolateFrom`/`interpolateTo` (defaults `23.5` and `80`).
  - `toFluidClampFor(value, options)`: convenience to compute the mapped max and format a `clamp()` in one step.

  Updates
  - Storybook theme now uses the new helpers and no longer depends on an interpolation variable.

  Usage

  ```ts
  import {
    getInterpolationFor,
    toFluidClampFor,
  } from '@kalink-ui/seedly/styles';

  const mapped = getInterpolationFor(12, {
    lowMin: 12,
    lowMax: 64,
    highMin: 12,
    highMax: 200,
    exponent: 2,
    rounding: 'none',
  });

  const clamp = toFluidClampFor(12, {
    lowMin: 12,
    lowMax: 64,
    highMin: 12,
    highMax: 200,
    exponent: 2,
    rounding: 'none',
    // optional overrides
    interpolateFrom: 23.5,
    interpolateTo: 80,
  });
  ```

## 0.29.1

### Patch Changes

- 174eb5b: Correctly apply auto layout when defined

## 0.29.0

### Minor Changes

- 8c2404f: Correctly use the overrides layer for ButtonIcon specificities

## 0.28.0

### Minor Changes

- d38d956: feat(seedly/button-icon): add responsive variants for `size` and `variant`
  - Introduce `buttonIconResponsive` with `sizeAt` and `variantAt`.
  - Accept responsive values (object/array) for `size` and `variant` props.
  - Keeps icon-only spacing consistent across breakpoints.

## 0.27.0

### Minor Changes

- 3a1d6bd: feat(seedly/grid): introduce responsive Grid layout with GridChild
  - Add `Grid` component with responsive variants for spacing, columns, fit
    (auto-fill/auto-fit), and content/item alignment.
  - Add `GridChild` for per-item spans, line starts/ends, and self alignment.
  - Support `minSize` via CSS var to control auto-fit/auto-fill behavior.
  - Export `Grid`, `GridChild`, and `gridRecipe` from the Grid module.
  - Include Storybook stories demonstrating fixed columns, auto-fit, and spans.

## 0.26.3

### Patch Changes

- 87daf77: ci(release): ensure public publishes under the `@kalink-ui` scope by configuring npm scope auth in CI and Changesets access. No runtime code changes.
- Updated dependencies [87daf77]
  - @kalink-ui/dibbly@0.5.2

## 0.26.2

### Patch Changes

- 9bfff1e: chore(deps): move `@kalink-ui/dibbly` to runtime dependencies and align dev workflow. Ensures consumers resolve built ESM from `dist` while developing with a watcher in Dibbly.
- Updated dependencies [a97aad9]
  - @kalink-ui/dibbly@0.5.1

## 0.26.1

### Patch Changes

- fef7681: Text/Heading: fix responsive typography by carrying forward `variant` and `size` across breakpoints so larger viewports don't reapply base styles. Also updates Heading story to demonstrate responsive behavior.

## 0.26.0

### Minor Changes

- c0f588b: Enable responsive variants across layout components:
  - Cluster: responsive `spacing`, `justify`, and `align`.
  - Center: responsive `gutters`.
  - Cover: responsive `spacing`.
  - Grid: responsive `spacing`.
  - Sidebar: responsive `spacing`.
  - Switcher: responsive `spacing`.

  These use `createResponsiveVariants` + `responsiveRecipe` to generate media-specific overrides.

- e451989: Typography + layout: enable responsive `variant` and `size` for `Text` and `Heading`. Also extend responsive recipes across supporting components (Button size/variant, MenuSeparator spacing, MoonLoader size).
- 29ce292: Stack: add responsive variants support and align with vanilla-extract recipes. Introduces responsive `spacing` and `align` props via `responsiveRecipe` utilities.

## 0.25.0

### Minor Changes

- f41d4a0: [Switcher] Correctly export types
- 810fdce: [Heading] Fix prop types definition

## 0.24.0

### Minor Changes

- 9072db5: [Heading] Allow for different pretitle and subtitle spacing

## 0.23.0

### Minor Changes

- e77a3af: [AlertDialog] Correctly pass spacing prop to underlying `Box` component
- 985fd61: [Button] Reexport all style definitions
- a150fe7: [Button] Expose inner components to enhance composability

## 0.22.0

### Minor Changes

- 26816de: [Styles] Add `justifySelf` responsive property

## 0.21.0

### Minor Changes

- a0f9b5c: [AlertDialog] Correctly reexport component

## 0.20.0

### Minor Changes

- d902023: [AlertDialog] Create new AlertDialog component

## 0.19.0

### Minor Changes

- e73d11a: [Center] Use a custom property to define gutters value

## 0.18.0

### Minor Changes

- a81dae0: [Skeleton] Correctly reexport component

## 0.17.0

### Minor Changes

- 6d46df7: Fix styling issues after Stack component update
- 141fc36: [Skeleton] Add new Skeleton component

## 0.16.0

### Minor Changes

- 5af6427: [useLocalStorage] Move hook in the dibbly package

## 0.15.0

### Minor Changes

- 7893c13: [Stack] handle items positioning
- b1e9483: [LoaderOverlay] Correctly center elements
- 57ca2b9: [useLocalStorage] Add new local storage management hook

## 0.14.0

### Minor Changes

- 6d5d569: [Stack] Use flex-box instead of margin for spacing between elements

## 0.13.0

### Minor Changes

- 89fae2d: [loader] Correctly center element with text

## 0.12.0

### Minor Changes

- 0f1ff4b: [loader] Correctly use layers to define component styles

## 0.11.0

### Minor Changes

- 4a6ec83: Create command component
- ad0b4d1: [Stack] Fix inheritance of the spacing property
- 2371dd4: [Button] Fix how slot behave in the flex context
- 4e6b205: [Cover] Reexport `minSizeVar` custom property

## 0.10.0

### Minor Changes

- 84903c1: Add multiple components
  - ButtonIcon
  - TextField
  - Select
  - Textarea
  - Label
  - Loader
  - LoaderOverly

## 0.9.0

### Minor Changes

- 7fe5a15: Fix issues with TypeScript config and setup Github Actions

## 0.8.1

### Patch Changes

- 6670251: Do not ignore arg-types files from npm package

## 0.8.0

### Minor Changes

- fb11f86: Simplify package exports
- abdbfa3: Create new Header and Button components

## 0.7.0

### Minor Changes

- 0c7e758: Change eslint config export strategy

## 0.6.0

### Minor Changes

- 87e2ae2: Create new Dibbly package to centralize utils and common types

## 0.5.0

### Minor Changes

- 73cbf48: Remove alias usage in source files

## 0.4.0

### Minor Changes

- 293d796: Correctly specify peer dependencies

## 0.3.0

### Minor Changes

- Remove config files and tools folders from published package bundle

## 0.2.0

### Minor Changes

- Update dependencies and correctly include files in package bundle

## 0.1.2

### Patch Changes

- Correctly place the npmignore file so it override the package.json config

## 0.1.1

### Patch Changes

- Filter out unwanted files from the package bundle

## 0.1.0

### Minor Changes

- Initial publish of @kalink-ui packages
