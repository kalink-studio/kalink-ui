---
"@kalink-ui/dibbly": patch
---

build(dibbly): publish compiled ESM output and types

- Export built files from `dist` with `type: module`.
- Include `index.js` (ESM) and `index.d.ts` in package exports.
- Add build script and emit JS + d.ts via `tsc`.
- No runtime API changes; fixes Node/CLI import resolution (e.g., `isObject`).
