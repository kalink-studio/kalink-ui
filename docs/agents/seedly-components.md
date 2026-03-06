# Seedly Component Authoring Guide

This guide captures non-obvious patterns for creating or refactoring components in `packages/seedly/src/components`.

## Ownership model

- Component contracts own theme-facing defaults.
- `_foundation` helpers compose structure and behavior, not visual defaults.
- Pass component tokens into `_foundation` helpers explicitly.

Meaningful examples:

- `packages/seedly/src/components/autocomplete/autocomplete.css.ts:60`
- `packages/seedly/src/components/_foundation/field-control.ts:145`

## Token naming conventions

- Use role-first, theme-agnostic names: `popupOutline`, `triggerBackground`, `itemHighlightCorner`.
- Do not encode theme in local token names (`Light`/`Dark`).
- Only use dual pairs like `Default`/`Inverse` when a component must render two schemes simultaneously.

Meaningful examples:

- `packages/seedly/src/components/menu/menu.css.ts:17`
- `packages/seedly/src/components/select/select.css.ts:18`

## Default assignment ownership (and portal boundaries)

- Prefer one top-level defaults assignment: `assignVars(<componentVars>, { ... })`.
- Assign defaults on the style owner for each rendering subtree.
- If a component renders both local and portal subtrees, assign defaults in both owners.

Meaningful examples:

- `packages/seedly/src/components/autocomplete/autocomplete.css.ts:134`
- `packages/seedly/src/components/autocomplete/autocomplete.css.ts:153`
- `packages/seedly/src/components/select/select.css.ts:118`
- `packages/seedly/src/components/select/select.css.ts:184`

## When to delegate instead of duplicating tokens

- If visual behavior should stay identical to an existing component, reuse the same foundation helpers or class contracts explicitly instead of creating a parallel contract.
- Avoid re-exporting another component's parts under a new namespace when that dependency matters for understanding composition.
- Keep wrapper components responsible only for ownership boundaries unique to their context.

Meaningful examples:

- `packages/seedly/src/components/menu/menu.css.ts:1`
- `packages/seedly-react/src/components/menu/menu.ts:1`

## Internal-only contracts are sometimes correct

- Some primitives intentionally keep contracts internal (not exported) when they are tightly coupled to system profile resolution.
- Use this pattern when exposing token overrides would create misleading public API intent.

Meaningful examples:

- `packages/seedly/src/components/box/box.css.ts:21`
- `packages/seedly/src/components/container/container.css.ts:13`

## Direct `sys` usage and derived values

- Direct `sys` usage in style rules is acceptable for intentional structural or typography references.
- Derived values (`calc`, `color-mix`) are acceptable when assigned once in defaults/contract flow, not inlined repeatedly across rules.

Meaningful examples:

- `packages/seedly/src/components/autocomplete/autocomplete.css.ts:230`
- `packages/seedly/src/components/container/container.css.ts:31`
- `packages/seedly/src/components/_foundation/floating-surface.ts:8`

## Exception: split assignments for variant matrices

- The default pattern is one top-level `assignVars` assignment.
- Split subgroup assignments are allowed when recipe variant matrices need localized overrides by size/tone/variant.

Meaningful example:

- `packages/seedly/src/components/button/root.css.ts:70`

## Shared pass-through seam for foundation helpers

- For shared primitives (for example range tracks or floating surfaces), keep the theme seam at the component level and pass values into helper APIs.
- Avoid re-introducing helper-owned visual defaults.

Meaningful examples:

- `packages/seedly/src/components/_foundation/range-track.ts:3`
- `packages/seedly/src/components/meter/meter.css.ts`
- `packages/seedly/src/components/progress/progress.css.ts`

## Validation sequence

After component work, run in order:

1. `pnpm run format:fix`
2. `pnpm run lint:fix`
3. `pnpm run tsc`
