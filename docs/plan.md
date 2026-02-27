# Seedly Tokenization Migration Plan

## Purpose

Finalize local component token usage across `packages/seedly/src/components` with a single, consistent migration path.

- local contracts are complete for each component's theme-facing surface
- token-eligible style properties map to local tokens (or explicit direct `sys` usage when intentional)
- local defaults map cleanly to global system tokens (`sys`)
- breaking changes are allowed during migration

---

## Non-Negotiables

- **Backward compatibility:** not required.
- **Source of truth:** `packages/seedly/src/styles/system-contract.css.ts`.
- **Ownership model:** component contracts own theme-facing defaults.
- **Foundation role:** `_foundation` composes behavior and structure, but does not own visual defaults.
- **Naming model:** local tokens are role-based and theme-agnostic (for example, `popupOutline`).
- **Dual-scheme exception:** only when simultaneous schemes are required; use `Default`/`Inverse`, not `Light`/`Dark`.
- **Migration mode:** no dual path; intermediate states can be broken and are not releasable.
- **Release gate:** migration is only releasable when global validation passes.

Validation gate (in order):

1. `pnpm run format:fix`
2. `pnpm run lint:fix`
3. `pnpm run tsc`

---

## Current Status

- Migration has started.
- Completed components: `accordion`, `alert-dialog`, `autocomplete`, `avatar`.
- Next unchecked component: `box`.
- `_foundation` strict-default refactor is complete for the main pass; naming normalization and final verification still remain.

Current known type-check fallout after strict defaults (expected until callers are migrated):

- `checkbox`
- `checkbox-group`
- `combobox`
- `context-menu`
- `dialog`
- `field`
- `input`
- `menu`
- `menubar`
- `meter`
- `navigation-menu`
- `number-field`
- `popover`
- `preview-card`
- `progress`
- `radio`
- `select`
- `slider`
- `tooltip`

---

## Contract Standard (Target)

Each component should use only the groups it needs:

- `color`
- `spacing`
- `shape`
- `size`
- `layout`
- `motion`
- `elevation`
- `typography`

Naming convention:

- **role-first + semantic suffix**
- examples: `triggerBackground`, `triggerBorder`, `triggerFocusRing`, `itemHighlightedBackground`, `popupOutline`, `thumbSize`, `thumbCorner`

State suffixes:

- `Hover`, `Active`, `Pressed`, `Disabled`, `FocusRing`, `Muted` (as relevant)

---

## Token Eligibility Policy

A property must use local token or direct `sys` token if it is theme-facing:

- color/background/border/outline/shadow
- spacing and sizing likely to be overridden
- radius/corners
- typography values (or variant tokens)
- visible motion durations/easings

Structural-only properties may stay literal/non-tokenized:

- `display`, `position`, `z-index` semantics
- flex/grid mechanics
- selector wiring and state mechanics
- purely algorithmic calculations not intended for theming

---

## Mapping Rules

1. Every local default maps to `sys`, unless intentionally derived (`calc`, `color-mix`, etc.).
2. Derived values should still be assigned in local defaults (not repeatedly inlined in style rules).
3. Shared factory options receive local token values for token-eligible properties.
4. Root/owning slot hosts merged default assignment for that component.
5. Avoid duplicate assignment blocks across slots unless scoping requires it.
6. Do not rely on `_foundation` visual fallbacks; pass component token values explicitly.
7. Prefer one top-level assignment: `assignVars(<componentVars>, { ... })`.

---

## Foundation Alignment

Core strict-default hardening is done for:

- `packages/seedly/src/components/_foundation/field-control.ts`
- `packages/seedly/src/components/_foundation/choice-control.ts`
- `packages/seedly/src/components/_foundation/highlight-item.ts`
- `packages/seedly/src/components/_foundation/range-track.css.ts`
- `packages/seedly/src/components/_foundation/dialog-surface.ts`
- `packages/seedly/src/components/_foundation/floating-surface.ts`
- `packages/seedly/src/components/_foundation/control.ts`

Remaining shared cleanup:

- normalize popup/dialog outline API naming to role-based terms (`outline`, optional `outlineInverse`)
- update impacted callers: `dialog`, `alert-dialog`, `menu`, `popover`, `select`, `tooltip`
- run a dedicated final verification pass after all components are migrated

---

## Session Workflow

### Start

1. Read this file.
2. Pick the next unchecked component in alphabetical order.
3. Mark it `in progress` in the checklist.
4. Add/update its tracking block.

### Execute (per component)

1. Propose/adjust contract.
2. Map all token-eligible properties.
3. Implement component and `_foundation` caller changes as needed.
4. Remove dead tokens and obsolete assignments.
5. Validate at checkpoints with:
   - `pnpm run format:fix`
   - `pnpm run lint:fix`
   - `pnpm run tsc`

### End

1. Update tracking block with exact deltas and validation results.
2. Mark checklist item:
   - `done` if complete, or
   - keep in progress with blocker note.
3. Leave a short handoff note if interrupted.
4. Ask if a commit needs to be created. If answer is yes, use Conventional Commits with component scope (for example, `refactor(accordion): ...`).

---

## Commit Protocol

- Only create commits when explicitly requested.
- Prefer one focused commit per completed component migration.
- For shared refactors, use `_foundation` as scope.
- Use Conventional Commits with clear migration intent.
- Include validation status in the commit body when `tsc` still has known unrelated migration failures.

Examples:

- `refactor(alert-dialog): finalize local token contract and mapping`
- `refactor(_foundation): normalize popup outline API naming`

---

## Alphabetical Component Checklist

- [x] `accordion`
- [x] `alert-dialog`
- [x] `autocomplete`
- [x] `avatar`
- [ ] `box`
- [ ] `button`
- [ ] `center`
- [ ] `checkbox`
- [ ] `checkbox-group`
- [ ] `cluster`
- [ ] `collapsible`
- [ ] `combobox`
- [ ] `container`
- [ ] `context-menu`
- [ ] `cover`
- [ ] `dialog`
- [ ] `field`
- [ ] `fieldset`
- [ ] `form`
- [ ] `frame`
- [ ] `grid`
- [ ] `input`
- [ ] `label`
- [ ] `layout`
- [ ] `menu`
- [ ] `menubar`
- [ ] `meter`
- [ ] `navigation-menu`
- [ ] `number-field`
- [ ] `popover`
- [ ] `preview-card`
- [ ] `progress`
- [ ] `radio`
- [ ] `scroll-area`
- [ ] `select`
- [ ] `separator`
- [ ] `sidebar`
- [ ] `slider`
- [ ] `stack`
- [ ] `switch`
- [ ] `switcher`
- [ ] `tabs`
- [ ] `toast`
- [ ] `toggle`
- [ ] `toggle-group`
- [ ] `toolbar`
- [ ] `tooltip`

---

## Cross-Cutting QA Checklist

- [ ] Every component has local contract coverage appropriate to its theme-facing surface
- [ ] Every local contract has defaults assigned
- [ ] Components own theme-facing defaults (no hidden `_foundation` visual defaults)
- [ ] No unused local tokens remain
- [ ] No token-eligible property bypasses local contract unintentionally
- [ ] Naming follows role/state conventions
- [ ] No `Light`/`Dark` local suffixes unless true dual-scheme rendering is required
- [ ] `_foundation` helpers do not silently override component intent
- [ ] Component exports remain coherent after refactors
- [ ] Validation sequence passes

---

## Session Tracking Template

### `<component-name>`

- Status: `not started | in progress | done`
- Contract changes:
  - Added:
  - Renamed:
  - Removed:
- Mapping coverage:
  - Properties audited:
  - Properties remapped:
  - Intentional direct `sys` usages:
- Foundation changes:
- Validation:
  - format:
  - lint:
  - tsc:
- Notes / follow-ups:

---

## Change Control

If policy changes mid-migration:

1. Update this file immediately in:
   - Contract standard
   - Token eligibility policy
   - Mapping rules
2. Add a short rationale note in the current component tracking block.
3. List completed components that need normalization follow-up.
4. Add explicit follow-up checklist items.

---

## Migration Log

### `_foundation` strict-default refactor

- Status: `core pass done; normalization + final verification pending`
- Result:
  - Theme-facing fallback defaults removed from shared factories.
  - Factory contracts tightened so theme-facing values are explicit.
- Current validation snapshot:
  - `pnpm run tsc` still fails in `@kalink-ui/seedly` due expected downstream caller migration work.

### `accordion`

- Status: `done`
- Outcome:
  - Added full local coverage for color/spacing/shape/size/layout/motion groups needed by the component.
  - Remapped token-eligible properties to local contract defaults.
  - Normalized to a single top-level `assignVars(accordionVars, { ... })` owner block.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components)

### `alert-dialog`

- Status: `done`
- Outcome:
  - Kept local contract role-based and normalized key ordering to align with contract standards.
  - Consolidated defaults into a single owner assignment block: `assignVars(alertDialogVars, { ... })`.
  - Remapped popup outline wiring to the strict foundation dialog API (`outline`) and removed obsolete light/dark caller fields.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components)
- Notes / follow-ups:
  - `dialog` still has pending outline naming migration and remains intentionally out of scope for this component-focused pass.

### `autocomplete`

- Status: `done`
- Outcome:
  - Expanded local contract coverage from spacing-only to role-based `color`, `layout`, `shape`, `size`, and `spacing` groups.
  - Consolidated component defaults into one owner assignment block: `assignVars(autocompleteVars, { ... })`.
  - Remapped token-eligible field/list/popup/highlight styles to local tokens and updated callers to satisfy strict `_foundation` factory options.
  - Kept portal-safe token assignment by applying defaults on both `label` (owner subtree) and `positioner` (portal subtree).
- Mapping coverage:
  - Properties audited: input control surface, label color, popup surface, list panel sizing/padding, item highlight, empty state color.
  - Properties remapped: input border/background/foreground/focus/corner/padding/size, popup background/foreground/outline/shadow/corner, list max size + paddings, highlight background/foreground/inset/corner, empty foreground.
  - Intentional direct `sys` usages: empty-state typography (`sys.typography.body.medium.size` and `.lineHeight`).
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components)
- Notes / follow-ups:
  - `autocomplete` no longer appears in the known strict-default fallout list.

### `avatar`

- Status: `done`
- Outcome:
  - Normalized contract naming to role-based keys: `rootBackground`, `rootForeground`, `rootCorner`, `rootSize`.
  - Consolidated all local defaults into a single owner assignment block: `assignVars(avatarVars, { ... })`.
  - Remapped root token-eligible properties (background, foreground, corner, size) to local contract values.
- Mapping coverage:
  - Properties audited: root color surface/content, root corner radius, avatar root size.
  - Properties remapped: root background/foreground/corner/size references.
  - Intentional direct `sys` usages: none.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components)

---

## Final Exit Criteria

Migration is complete when:

1. All checklist components are marked done.
2. Shared foundations are aligned with explicit token flow.
3. Token naming and group structure are consistent across components.
4. Validation sequence passes repository-wide.
5. This plan file reflects final statuses and notes.
