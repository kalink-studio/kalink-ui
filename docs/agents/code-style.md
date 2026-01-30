# Code Style

## General

- Always wrap control statements (if/for/while/switch) in braces, even single‑line bodies, including early returns.
- Add a blank line before and after block statements and immediately before any return for readability.
- Naming: kebab-case files, PascalCase components, camelCase functions/vars.
- Avoid destructuring when not necessary (e.g. `foo: bar` instead of `foo: { ...bar }`).

## TypeScript Practices

- Avoid any; prefer unknown with type guards (isObject, Array.isArray) for narrowing.
- Try to avoid `as` casts when possible.
- Prefer named interfaces/types exported from modules over large inline object types.
- For functions that accept object params, define and use a named interface/type for the parameter shape.
- Model with discriminated unions, generics, and utility types rather than loosening types.
- Export and reuse shared types across modules/components.
- Almost always use strict comparisons (`===`, `!==`) in JavaScript/TypeScript. Only use loose equality (`==`, `!=`) when intentionally leveraging type coercion with explicit justification.
