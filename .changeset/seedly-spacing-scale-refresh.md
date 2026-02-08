---
"@kalink-ui/seedly": patch
---

Shift the Seedly spacing scale to add finer low-end steps (`spacing[4] = 0.5rem`) and remap token references to preserve existing rendered spacing.

Adopt logical sizing properties and `@vanilla-extract/css-utils` calc helpers for overlay offsets and composed sizing expressions, and add `@vanilla-extract/css-utils` as a Seedly dependency.
