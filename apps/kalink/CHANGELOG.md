# @kalink-ui/kalink

## 0.3.5-beta.4

### Patch Changes

- Updated dependencies [d19d1a9]
  - @kalink-ui/canopy@1.0.0-beta.2

## 0.3.5-beta.3

### Patch Changes

- Updated dependencies [9ab1679]
  - @kalink-ui/seedly-react@1.0.0-beta.1

## 0.3.5-beta.2

### Patch Changes

- Updated dependencies [2f3ddc3]
  - @kalink-ui/canopy@1.0.0-beta.1

## 0.3.5-beta.1

### Patch Changes

- Updated dependencies [d978276]
  - @kalink-ui/canopy@1.0.0-beta.0

## 0.3.5-beta.0

### Patch Changes

- Updated dependencies [4da0b6b]
- Updated dependencies [2dd75e2]
- Updated dependencies [f47b1f7]
- Updated dependencies [3abab4d]
- Updated dependencies [fe6e40c]
- Updated dependencies [d8e2b75]
- Updated dependencies [264dc22]
- Updated dependencies [b4062af]
- Updated dependencies [07d65a8]
- Updated dependencies [a00dcc3]
- Updated dependencies [8a5ca4a]
- Updated dependencies [fe38c46]
- Updated dependencies [d8578dc]
- Updated dependencies [9408d29]
- Updated dependencies [d34940c]
- Updated dependencies [c14a96c]
- Updated dependencies [d2a65b0]
- Updated dependencies [2e57481]
- Updated dependencies [f7897ac]
- Updated dependencies [a7a2d8f]
- Updated dependencies [a5999cf]
- Updated dependencies [02001a7]
- Updated dependencies [cc33254]
- Updated dependencies [8bac2e5]
- Updated dependencies [993e924]
- Updated dependencies [2451427]
- Updated dependencies [3e5f60e]
- Updated dependencies [81d2cc6]
- Updated dependencies [8694b7b]
- Updated dependencies [d0e5229]
- Updated dependencies [f72a4a5]
- Updated dependencies [7dc18d9]
- Updated dependencies [f6f7311]
- Updated dependencies [3211078]
- Updated dependencies [e95e2ab]
- Updated dependencies [7d725e8]
- Updated dependencies [a10cdc9]
- Updated dependencies [1cbe0f4]
- Updated dependencies [cbafe0e]
- Updated dependencies [fd96c74]
- Updated dependencies [ed65c46]
- Updated dependencies [86eeaf9]
- Updated dependencies [032d76a]
- Updated dependencies [919c363]
- Updated dependencies [3df6d8f]
- Updated dependencies [fabfefc]
- Updated dependencies [01ca9b1]
- Updated dependencies [172dfd8]
- Updated dependencies [43c07d5]
- Updated dependencies [bacf5bd]
- Updated dependencies [2ac6363]
- Updated dependencies [5f7c10e]
- Updated dependencies [18e0608]
- Updated dependencies [699402d]
- Updated dependencies [887577f]
- Updated dependencies [9f0efcc]
- Updated dependencies [31bbc78]
- Updated dependencies [7ee323a]
- Updated dependencies [6733dbd]
- Updated dependencies [2c80d0d]
- Updated dependencies [f9508dd]
- Updated dependencies [def1a5f]
- Updated dependencies [fb41ad4]
- Updated dependencies [162e10f]
- Updated dependencies [fb24c3c]
- Updated dependencies [470bb48]
- Updated dependencies [47ebf74]
- Updated dependencies [7f37273]
- Updated dependencies [e945f91]
- Updated dependencies [7a137da]
- Updated dependencies [0a67e74]
- Updated dependencies [f2dfe73]
- Updated dependencies [4ab7ac9]
- Updated dependencies [f872f10]
- Updated dependencies [cf96bc6]
- Updated dependencies [298cd93]
- Updated dependencies [86e76ca]
- Updated dependencies [1a40232]
- Updated dependencies [9601d9c]
- Updated dependencies [4be815b]
- Updated dependencies [5585550]
- Updated dependencies [168f4d9]
- Updated dependencies [5490c6e]
- Updated dependencies [cd930e9]
- Updated dependencies [a91c2d7]
- Updated dependencies [4afd4e3]
- Updated dependencies [0379b53]
- Updated dependencies [e06ff34]
- Updated dependencies [928ecde]
- Updated dependencies [89cc8dc]
- Updated dependencies [64d577b]
- Updated dependencies [eae06e2]
- Updated dependencies [63a0911]
- Updated dependencies [705d275]
- Updated dependencies [e037828]
  - @kalink-ui/seedly@1.0.0-beta.0
  - @kalink-ui/seedly-react@1.0.0-beta.0

## 0.3.4

### Patch Changes

- Updated dependencies [3b84777]
  - @kalink-ui/seedly@0.34.4

## 0.3.3

### Patch Changes

- Updated dependencies [a9c74d3]
  - @kalink-ui/canopy@0.1.3
  - @kalink-ui/dibbly@0.6.3
  - @kalink-ui/seedly@0.34.3

## 0.3.2

### Patch Changes

- Updated dependencies [7098356]
  - @kalink-ui/canopy@0.1.2
  - @kalink-ui/dibbly@0.6.2
  - @kalink-ui/seedly@0.34.2

## 0.3.1

### Patch Changes

- Updated dependencies [3642627]
  - @kalink-ui/canopy@0.1.1
  - @kalink-ui/dibbly@0.6.1
  - @kalink-ui/seedly@0.34.1

## 0.3.0

### Minor Changes

- 1efa841: Harden test suites (Vitest v4, Playwright, Storybook) and improve accessibility.

  Breaking changes (still released as `minor` because we are in `0.x`):
  - `@kalink-ui/seedly`: `ButtonIcon` now requires a `label` prop for accessibility.
    - Migration: replace `aria-label="..."` with `label="..."` on `ButtonIcon`.
    - Icon children are treated as decorative (`aria-hidden`) and the label is announced via visually-hidden text.

### Patch Changes

- 5ce52ea: Fix React Server Components CVE vulnerabilities
- Updated dependencies [1efa841]
  - @kalink-ui/canopy@0.1.0
  - @kalink-ui/dibbly@0.6.0
  - @kalink-ui/seedly@0.34.0

## 0.2.16

### Patch Changes

- Updated dependencies [799c0ef]
  - @kalink-ui/dibbly@0.5.3
  - @kalink-ui/seedly@0.33.2
  - @kalink-ui/canopy@0.0.2

## 0.2.15

### Patch Changes

- 8ec0736: Fix typing issues and tooling configuration
- Updated dependencies [8ec0736]
  - @kalink-ui/canopy@0.0.2
  - @kalink-ui/seedly@0.33.1
  - @kalink-ui/dibbly@0.5.2

## 0.2.14

### Patch Changes

- 6ac14d3: Provide environments to github actions
- 57e1325: Correctly pass env vars to jobs
- Updated dependencies [c8c98c0]
  - @kalink-ui/seedly@0.33.0

## 0.2.13

### Patch Changes

- Updated dependencies [9d3abfd]
  - @kalink-ui/seedly@0.32.1

## 0.2.12

### Patch Changes

- Updated dependencies [40a1dbe]
  - @kalink-ui/seedly@0.32.0

## 0.2.11

### Patch Changes

- Updated dependencies [0afb723]
  - @kalink-ui/seedly@0.31.0

## 0.2.10

### Patch Changes

- Updated dependencies [0455c00]
  - @kalink-ui/seedly@0.30.1

## 0.2.9

### Patch Changes

- Updated dependencies [e257be4]
  - @kalink-ui/seedly@0.30.0

## 0.2.8

### Patch Changes

- Updated dependencies [174eb5b]
  - @kalink-ui/seedly@0.29.1

## 0.2.7

### Patch Changes

- Updated dependencies [8c2404f]
  - @kalink-ui/seedly@0.29.0

## 0.2.6

### Patch Changes

- Updated dependencies [d38d956]
  - @kalink-ui/seedly@0.28.0

## 0.2.5

### Patch Changes

- Updated dependencies [3a1d6bd]
  - @kalink-ui/seedly@0.27.0

## 0.2.4

### Patch Changes

- Updated dependencies [87daf77]
  - @kalink-ui/dibbly@0.5.2
  - @kalink-ui/seedly@0.26.3

## 0.2.3

### Patch Changes

- Updated dependencies [a97aad9]
- Updated dependencies [9bfff1e]
  - @kalink-ui/dibbly@0.5.1
  - @kalink-ui/seedly@0.26.2

## 0.2.2

### Patch Changes

- Updated dependencies [fef7681]
  - @kalink-ui/seedly@0.26.1

## 0.2.1

### Patch Changes

- Updated dependencies [c0f588b]
- Updated dependencies [e451989]
- Updated dependencies [29ce292]
  - @kalink-ui/seedly@0.26.0

## 0.2.0

### Minor Changes

- d6ae577: Initial setup of payload CMS

### Patch Changes

- @kalink-ui/dibbly@0.5.0
- @kalink-ui/seedly@0.25.0
