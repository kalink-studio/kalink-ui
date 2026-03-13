# Code Style

## General

- Always wrap control statements (if/for/while/switch) in braces, even single‑line bodies, including early returns.
- Add a blank line before and after block statements and immediately before any return for readability.
- Naming: kebab-case files, PascalCase components, camelCase functions/vars.
- Prefer arguments destructuring with optional default values in function signatures over in body assignments.
- Avoid destructuring in objects when not necessary (e.g. `foo: bar` instead of `foo: { ...bar }`).

## CSS Practices

- Organize declarations into readability groups separated by exactly one blank line.
- Use this group order: `Positioning` -> `Layout and children` -> `Box (sizing, spacing, overflow)` -> `Typography` -> `Visual` -> `Motion` -> `Interaction` -> `Uncategorized`.
- Within each group, keep property declarations in alphabetical order.
- Do not add group labels as inline comments; grouping should be expressed only through declaration order and spacing.

## vanilla-extract Practices

- Prefer assigning contract defaults at the top-level contract when possible (for example, `assignVars(accordionVars, { ... })`) instead of splitting defaults across multiple subgroup `assignVars` calls.
- Split assignments by subgroup only when scoping or composition requires separate `vars` ownership.
- In contract definitions (for example `createThemeContract`), keep keys alphabetically ordered at every nesting level.
- In style objects, keep top-level key order as: `vars` -> base rules (grouped per CSS Practices) -> simple pseudo selectors (for example `:hover`) -> `selectors` -> directives (`@media`, `@supports`, etc.). Separate each section with exactly one blank line.
- When multiple simple pseudo selectors, `selectors` entries, or directive entries are present, separate sibling entries with exactly one blank line for readability.
- Apply the same CSS grouping/alphabetical order and vanilla-extract section order/spacing rules inside factory option objects that contain style declarations.
- Do not add section-label comments inside style objects; use ordering and spacing only.

## TypeScript Practices

- Avoid any; prefer unknown with type guards (isObject, Array.isArray) for narrowing.
- Take advantage of TypeScript's type inference instead of explicit type annotations.
- Avoid `as` casts when possible.
- Prefer named interfaces/types exported from modules over large inline object types.
- For functions that accept object params, define and use a named interface/type for the parameter shape.
- Model with discriminated unions, generics, and utility types rather than loosening types.
- Export and reuse shared types across modules/components.
- Almost always use strict comparisons (`===`, `!==`) in JavaScript/TypeScript. Only use loose equality (`==`, `!=`) when intentionally leveraging type coercion with explicit justification.
