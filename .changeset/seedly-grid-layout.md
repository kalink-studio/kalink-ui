---
'@kalink-ui/seedly': minor
---

feat(seedly/grid): introduce responsive Grid layout with GridChild

- Add `Grid` component with responsive variants for spacing, columns, fit
  (auto-fill/auto-fit), and content/item alignment.
- Add `GridChild` for per-item spans, line starts/ends, and self alignment.
- Support `minSize` via CSS var to control auto-fit/auto-fill behavior.
- Export `Grid`, `GridChild`, and `gridRecipe` from the Grid module.
- Include Storybook stories demonstrating fixed columns, auto-fit, and spans.

