# @kalink-ui/seedly-react

## 1.0.0-beta.1

### Patch Changes

- 9ab1679: Update `@base-ui/react` to v1.3.0 and migrate drawer wrappers from the preview `DrawerPreview` API to the stable `Drawer` export.

## 1.0.0-beta.0

### Major Changes

- a91c2d7: Add Base UI parity React demos and collocated Storybook stories for all 35 components, wired to the new `@kalink-ui/seedly` style modules.
- 0379b53: Replace demo-style component exports with Base UI parity primitives, splitting each styled primitive into its own file and exposing compound component APIs from component indexes.

  Move composition examples out of package exports and into Storybook stories so published exports are primitive-only.

### Minor Changes

- 4da0b6b: Backport MoonLoader and LoaderOverlay primitives so loading states are available in both Seedly packages.
- 2451427: Add responsive layout primitives and responsive prop support across Seedly layout components and their React wrappers.
- f6f7311: Backport Text and Heading primitives with responsive Seedly styles and React wrapper APIs for richer typography composition.
- 032d76a: Add Drawer primitives and React wrappers so overlay-based drawer interactions are available alongside the existing dialog system.
- 4be815b: Add shared List primitives and story usage so Seedly and seedly-react expose a reusable list component API.
- 4afd4e3: Refactor Base UI wrappers to explicit composition components and namespace module exports.

### Patch Changes

- f47b1f7: Update Switcher contract mappings and wrapper behavior so responsive layout tokens resolve consistently across both packages.
- 264dc22: Update Menubar contract mappings and wrapper composition so shared menu tokens stay aligned across the bar primitives.
- 9408d29: Align collapsible defaults and hover tokens so triggers and panels behave more consistently across Seedly and seedly-react.
- d34940c: Update ContextMenu contract mappings and React menu wrappers so popup menu pieces share the same refreshed local tokens.
- c14a96c: Stabilize the seedly-react Storybook cache setup so local development and CI runs are more reliable.
- d2a65b0: Update CheckboxGroup contract mappings and wrapper composition so grouped controls stay aligned with the refreshed Seedly contracts.
- 02001a7: Rename exported style class names to camelCase across Seedly styles and wrappers so the Base UI parity exports read consistently.
- cc33254: Update Grid contract mappings and wrapper behavior so layout tokens resolve consistently across Seedly and seedly-react.
- 81d2cc6: Upgrade the seedly-react Storybook test runner setup to improve compatibility with the current Storybook tooling stack.
- 8694b7b: Update Sidebar contract mappings and wrapper behavior so responsive sidebar tokens resolve consistently across both packages.
- f72a4a5: Refresh layout contract mappings for Box and Container and align their wrappers with the updated responsive layout tokens.
- 7dc18d9: Migrate Kalink app usage onto seedly-react primitives and wrappers so downstream app integration matches the published component APIs.
- cbafe0e: Route seedly-react Storybook workflows through Turbo so package-level CI and local tasks use the same orchestration path.
- fd96c74: Unify label wrappers and namespace list primitives so seedly-react exports are easier to compose consistently.
- 86eeaf9: Compose shared menu wrappers explicitly so related menu primitives reuse the same implementation patterns and exports.
- fabfefc: Update Cover contract mappings and the React wrapper so layout tokens map consistently through the refreshed contracts.
- 172dfd8: Add broader story interaction coverage so seedly-react stories exercise component behavior more reliably in tests.
- 2ac6363: Prepare the Seedly foundation for the component contract refactor by consolidating shared contract and wrapper assumptions.
- 18e0608: Update Menu and ContextMenu contract mappings so shared popup menu primitives resolve local tokens consistently.
- 31bbc78: Apply small visual enhancements across interactive primitives and stories to improve polish and alignment.
- 6733dbd: Update Toolbar contract mappings and shared bar primitives so toolbar wrappers stay aligned with the refreshed local tokens.
- fb41ad4: Move typography primitives into slot wrappers so titles, descriptions, and related text slots compose more consistently.
- fb24c3c: Align Radio composition with the CheckboxGroup structure by introducing a matching radio-group primitive and wrapper shape.
- 4ab7ac9: Polish PreviewCard story composition and supporting styles so demos better reflect the intended component presentation.
- f872f10: Align seedly-react wrappers with updated component defaults so triggers, arrows, and stories reflect the latest Seedly behavior.
- cf96bc6: Keep Accordion panels structural and move text composition into dedicated content pieces for a cleaner wrapper API.
- 9601d9c: Restructure seedly-react wrappers around explicit composition modules and namespace exports for a more consistent component API.
- 5585550: Improve toolbar composition and Select trigger sizing so controls align more cleanly in complex toolbars.
- 64d577b: Backport the previous system-contract styling approach by restoring full `sys` theme assignments, shared style helpers, and component-level vars contracts across Seedly Base UI parity styles.

  Align portal-rendered popups and field controls so token vars are always defined (including popover/tooltip and combobox action buttons), and update Storybook backgrounds for clearer light/dark previews.

- e037828: Use Seedly wrapper components consistently in stories and remove redundant story-level className props that wrappers already provide.
  Add `Radio.Group` in `seedly-react` and tune dark-mode contrast for toggle-group, toolbar, and dialog overlays.
- Updated dependencies [4da0b6b]
- Updated dependencies [2dd75e2]
- Updated dependencies [f47b1f7]
- Updated dependencies [3abab4d]
- Updated dependencies [fe6e40c]
- Updated dependencies [d8e2b75]
- Updated dependencies [264dc22]
- Updated dependencies [b4062af]
- Updated dependencies [07d65a8]
- Updated dependencies [a00dcc3]
- Updated dependencies [8a5ca4a]
- Updated dependencies [fe38c46]
- Updated dependencies [d8578dc]
- Updated dependencies [9408d29]
- Updated dependencies [d34940c]
- Updated dependencies [d2a65b0]
- Updated dependencies [2e57481]
- Updated dependencies [f7897ac]
- Updated dependencies [a7a2d8f]
- Updated dependencies [a5999cf]
- Updated dependencies [02001a7]
- Updated dependencies [cc33254]
- Updated dependencies [8bac2e5]
- Updated dependencies [993e924]
- Updated dependencies [2451427]
- Updated dependencies [3e5f60e]
- Updated dependencies [8694b7b]
- Updated dependencies [d0e5229]
- Updated dependencies [f72a4a5]
- Updated dependencies [7dc18d9]
- Updated dependencies [f6f7311]
- Updated dependencies [3211078]
- Updated dependencies [e95e2ab]
- Updated dependencies [7d725e8]
- Updated dependencies [a10cdc9]
- Updated dependencies [1cbe0f4]
- Updated dependencies [ed65c46]
- Updated dependencies [032d76a]
- Updated dependencies [919c363]
- Updated dependencies [3df6d8f]
- Updated dependencies [fabfefc]
- Updated dependencies [01ca9b1]
- Updated dependencies [43c07d5]
- Updated dependencies [bacf5bd]
- Updated dependencies [2ac6363]
- Updated dependencies [5f7c10e]
- Updated dependencies [18e0608]
- Updated dependencies [699402d]
- Updated dependencies [887577f]
- Updated dependencies [9f0efcc]
- Updated dependencies [31bbc78]
- Updated dependencies [7ee323a]
- Updated dependencies [6733dbd]
- Updated dependencies [2c80d0d]
- Updated dependencies [f9508dd]
- Updated dependencies [def1a5f]
- Updated dependencies [fb41ad4]
- Updated dependencies [162e10f]
- Updated dependencies [fb24c3c]
- Updated dependencies [470bb48]
- Updated dependencies [47ebf74]
- Updated dependencies [7f37273]
- Updated dependencies [e945f91]
- Updated dependencies [7a137da]
- Updated dependencies [0a67e74]
- Updated dependencies [f2dfe73]
- Updated dependencies [4ab7ac9]
- Updated dependencies [298cd93]
- Updated dependencies [86e76ca]
- Updated dependencies [1a40232]
- Updated dependencies [4be815b]
- Updated dependencies [5585550]
- Updated dependencies [168f4d9]
- Updated dependencies [5490c6e]
- Updated dependencies [cd930e9]
- Updated dependencies [e06ff34]
- Updated dependencies [928ecde]
- Updated dependencies [89cc8dc]
- Updated dependencies [64d577b]
- Updated dependencies [eae06e2]
- Updated dependencies [63a0911]
- Updated dependencies [705d275]
- Updated dependencies [e037828]
  - @kalink-ui/seedly@1.0.0-beta.0

## 0.34.4

### Patch Changes

- 3b84777: Re-export the SheetBody, SheetFooter, and SheetOverlay components from the sheet entrypoint.

## 0.34.3

### Patch Changes

- a9c74d3: Rebump packages to align dev with trusted publishing rollout.
- Updated dependencies [a9c74d3]
  - @kalink-ui/dibbly@0.6.3

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
