---
"@kalink-ui/seedly": minor
---

feat(styles): add dynamic fluid scale helpers

New
- `getInterpolationFor(value, options)`: per-value exponential mapping from a mobile range to a desktop range.
- `toFluidClamp([min, max], options)`: build a viewport-based CSS `clamp()` with `interpolateFrom`/`interpolateTo` (defaults `23.5` and `80`).
- `toFluidClampFor(value, options)`: convenience to compute the mapped max and format a `clamp()` in one step.

Updates
- Storybook theme now uses the new helpers and no longer depends on an interpolation variable.

Usage
```ts
import { getInterpolationFor, toFluidClampFor } from '@kalink-ui/seedly/styles';

const mapped = getInterpolationFor(12, {
  lowMin: 12,
  lowMax: 64,
  highMin: 12,
  highMax: 200,
  exponent: 2,
  rounding: 'none',
});

const clamp = toFluidClampFor(12, {
  lowMin: 12,
  lowMax: 64,
  highMin: 12,
  highMax: 200,
  exponent: 2,
  rounding: 'none',
  // optional overrides
  interpolateFrom: 23.5,
  interpolateTo: 80,
});
```
