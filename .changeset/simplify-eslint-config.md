---
"@kalink-ui/eslint-config": minor
---

Simplify ESLint config by removing unused `projectService` and `tsconfigRootDir` parser options.

Add `name` properties to config objects for better debugging with ESLint config inspector.

**Note:** If you extended this config with type-aware rules (e.g., `@typescript-eslint/no-floating-promises`),
you will need to add `projectService: true` to your own config's `languageOptions.parserOptions`.
