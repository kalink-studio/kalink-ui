# Seedly React Agent Notes

## Wrapper implementation rules

- Prefer explicit composition wrappers over `withClassName`.
- Use React 19 style wrappers:
  - no `forwardRef`
  - use `.tsx` + JSX (avoid `React.createElement`)
- Prefer named function declarations for exported components.
- Prefer Base UI prop types (for example `SelectTriggerProps`) over `React.ComponentProps`.
- Wrapper function types are sufficient; avoid `as typeof BaseComponent` casts.
- Avoid namespace imports when not needed (`import * as React`, `import * as styles`).
- Prefer `@/` path aliases for internal imports from `src` (for example `@/utils/merge-class-name`).
- For namespace component APIs (`Select.*`, `Tabs.*`), prefer module namespace re-exports:
  - create a `<component>.ts` file that re-exports each subcomponent
  - in `index.ts`, use `export * as ComponentName from './<component>'`
  - avoid `const ComponentName = { ... }` runtime object barrels

## className composition

- Keep style conditionality in vanilla-extract recipes.
- For wrapper class composition, use the local `mergeClassName` helper.
- Support both Base UI `className` forms:
  - string
  - state callback
- Prefer destructuring and inline merge in JSX:
  - `export function Trigger({ className, ...props }: SelectTriggerProps)`
  - `className={mergeClassName(baseClassName, className)}`

## Dependencies

- Do not add `clsx` for wrapper composition; `mergeClassName` is enough for this use case.
