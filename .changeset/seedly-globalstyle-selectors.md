---
"@kalink-ui/seedly": patch
---

Refactor Seedly component style modules to replace broad `globalStyle` usage with local vanilla-extract `selectors`, keeping globals only for reset and `:root` theme definitions.

Preserve existing component behavior while making selector ownership explicit and easier to maintain across Base UI parity styles.
