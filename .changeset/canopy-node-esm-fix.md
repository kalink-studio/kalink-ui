---
"@kalink-ui/canopy": patch
---

Switch Canopy to NodeNext module resolution and emit fully specified `.js` relative imports so direct Node ESM consumers like Payload CLI can load the package without resolution errors.
