# Seedly vanilla-extract Notes

This guide captures non-obvious vanilla-extract constraints that matter for Seedly refactors.

## File-scope rule for style creation

- Any code path that calls vanilla-extract style creation APIs must live in a `*.css.ts` file.
- In practice this includes `style`, `styleVariants`, `recipe`, `createVar`, `createThemeContract`, and helpers that call them indirectly.
- If a plain `.ts` module triggers one of those calls transitively, Vite can fail with `Styles were unable to be assigned to a file`.

Meaningful examples:

- `packages/seedly/src/components/box/box.css.ts`
- `packages/seedly/src/components/layout/layout.css.ts`

## Responsive variants ownership

- `createResponsiveVariants(...)` must be called from a `*.css.ts` file because it calls `styleVariants(...)`.
- Plain `.responsive.ts` files should only compose already-created responsive maps with `responsiveRecipe(...)`.
- Keep `*At` exports in the owning `*.css.ts` file.

Meaningful examples:

- `packages/seedly/src/components/box/box.css.ts`
- `packages/seedly/src/components/box/box.responsive.ts`
- `packages/seedly/src/components/text/text.css.ts`
- `packages/seedly/src/components/text/text.responsive.ts`

## Foundation ownership boundary

- `_foundation/*.ts` files must stay pure TypeScript helpers that return plain style objects.
- They should not create contracts, recipes, classes, responsive maps, or any other vanilla-extract output.
- The owning component `*.css.ts` file must create the contract and pass its vars into foundation helpers.

Meaningful examples:

- `packages/seedly/src/components/_foundation/layout.ts`
- `packages/seedly/src/components/layout/layout.css.ts`

## Component contracts own vars

- Shared helpers should not own reusable theme contracts when the consuming component already has one.
- Each component should keep its own contract and pass concrete var refs into helper factories.
- This keeps ownership explicit and avoids hidden cross-component contracts.

Meaningful examples:

- `packages/seedly/src/components/_foundation/range-track.ts`
- `packages/seedly/src/components/slider/slider.css.ts`
- `packages/seedly/src/components/meter/meter.css.ts`
- `packages/seedly/src/components/progress/progress.css.ts`

## Refactor checklist

- If a helper starts needing `styleVariants`, `recipe`, `createThemeContract`, or similar, move that work back into the owning `*.css.ts` file.
- If a `.responsive.ts` file starts calling `createResponsiveVariants(...)`, move the `*At` creation back into the corresponding `*.css.ts`.
- If a shared helper introduces its own contract, first check whether the component should own that contract instead.
