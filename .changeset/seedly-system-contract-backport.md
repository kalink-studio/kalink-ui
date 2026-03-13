---
"@kalink-ui/seedly": patch
"@kalink-ui/seedly-react": patch
---

Backport the previous system-contract styling approach by restoring full `sys` theme assignments, shared style helpers, and component-level vars contracts across Seedly Base UI parity styles.

Align portal-rendered popups and field controls so token vars are always defined (including popover/tooltip and combobox action buttons), and update Storybook backgrounds for clearer light/dark previews.
