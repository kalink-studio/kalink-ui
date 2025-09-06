---
'@kalink-ui/seedly': minor
---

build(seedly): publish prebuilt ESM with vanilla-extract CSS from `dist/`.

- Exports now point to `./dist/**` (ESM `.mjs` + `.d.ts`).
- Includes emitted `.vanilla.css` via side-effect imports; marked `sideEffects` for CSS.
- Library build via Vite (`preserveModules`) + `tsc` declarations.
- Consumers no longer need to transpile Seedly or run vanilla-extract on node_modules in Next.js.

