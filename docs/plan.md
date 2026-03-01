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
- Completed components: `accordion`, `alert-dialog`, `autocomplete`, `avatar`, `box`, `button`, `center`, `checkbox`, `checkbox-group`, `cluster`, `collapsible`, `combobox`, `container`, `context-menu`, `cover`, `dialog`, `field`, `fieldset`, `form`, `frame`, `grid`, `input`, `label`, `layout`, `menu`, `menubar`, `meter`, `navigation-menu`, `number-field`, `popover`, `preview-card`, `progress`, `radio`, `scroll-area`, `select`, `separator`, `sidebar`, `slider`.
- Next unchecked component: `switch`.
- `_foundation` strict-default refactor is complete for the main pass; naming normalization and final verification still remain.

Current known type-check fallout after strict defaults (expected until callers are migrated):

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
- update impacted callers: `tooltip`
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
- [x] `box`
- [x] `button`
- [x] `center`
- [x] `checkbox`
- [x] `checkbox-group`
- [x] `cluster`
- [x] `collapsible`
- [x] `combobox`
- [x] `container`
- [x] `context-menu`
- [x] `cover`
- [x] `dialog`
- [x] `field`
- [x] `fieldset`
- [x] `form`
- [x] `frame`
- [x] `grid`
- [x] `input`
- [x] `label`
- [x] `layout`
- [x] `menu`
- [x] `menubar`
- [x] `meter`
- [x] `navigation-menu`
- [x] `number-field`
- [x] `popover`
- [x] `preview-card`
- [x] `progress`
- [x] `radio`
- [x] `scroll-area`
- [x] `select`
- [x] `separator`
- [x] `sidebar`
- [x] `slider`
- [x] `stack`
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

### `box`

- Status: `done`
- Outcome:
  - Normalized the local contract to role-based color keys: `rootBackground`, `rootBorder`, `rootForeground`.
  - Consolidated local defaults into one owner assignment block: `assignVars(boxVars, { ... })`.
  - Remapped all token-eligible root surface/content/outline references to the renamed local tokens, including static color profile variant assignments.
  - Kept the local contract internal (not exported) so `box` remains system-profile-coupled while retaining an explicit component-owned composition seam.
- Mapping coverage:
  - Properties audited: root background/foreground, pseudo-element border outline.
  - Properties remapped: `backgroundColor`, `color`, and `::before` `borderColor` now reference role-based local tokens.
  - Intentional direct `sys` usages: none.
- Foundation changes:
  - none.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components)

### `button`

- Status: `done`
- Outcome:
  - Consolidated button styling into one role-based local contract and removed the secondary state contract (`buttonStateVars`).
  - Added explicit component-owned defaults in one owner assignment block: `assignVars(buttonVars, { ... })`.
  - Remapped token-eligible root surface/state properties (foreground/background/border/focus/hover/active/disabled/loading), spacing, shape, icon size, and transition motion to local tokens.
  - Wired focus ring tokens into `:focus-visible` styles and updated icon sizing references to the new size group.
- Mapping coverage:
  - Properties audited: root foreground/background/border/focus, hover/active/disabled/loading state colors, paddings/gap, corner, icon size, transition duration/easing.
  - Properties remapped: all styled button surface/state properties now resolve through `buttonVars` local tokens.
  - Intentional direct `sys` usages: component-owned default assignments in `buttonBaseClass` map to `sys`/`stateColor` tokens.
- Foundation changes:
  - Updated `context-menu` button token assignment to consume renamed `buttonVars` role/state keys after removal of `buttonStateVars`.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components)

### `center`

- Status: `done`
- Outcome:
  - Normalized local contract naming to role-based keys: `layout.rootMeasure` and `spacing.rootGutters`.
  - Consolidated defaults into one owner assignment block: `assignVars(centerVars, { ... })`.
  - Remapped token-eligible root sizing/spacing properties to the role-based local tokens while preserving existing responsive variant API (`gutters`, `andText`, `intrinsic`).
- Mapping coverage:
  - Properties audited: root `maxInlineSize`, root `paddingInline`.
  - Properties remapped: `maxInlineSize` now resolves through `centerVars.layout.rootMeasure`; `paddingInline` resolves through `centerVars.spacing.rootGutters`.
  - Intentional direct `sys` usages: none.
- Foundation changes:
  - none.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components)

### `checkbox`

- Status: `done`
- Outcome:
  - Normalized local contract naming to role-based keys for checkbox label/control/indicator surfaces.
  - Consolidated defaults into one owner assignment block: `assignVars(checkboxVars, { ... })`.
  - Added strict `_foundation` `choice-control` caller coverage for required `size` and `focusOutlineOffset` options using local tokens.
  - Remapped token-eligible label/control/indicator style properties to local component tokens.
- Mapping coverage:
  - Properties audited: label foreground + item gap, control border/background/focus/corner/size, indicator foreground + icon size.
  - Properties remapped: label color/gap, control borderRadius/uncheckedBorderColor/checkedBackgroundColor/focusRingColor/focusOutlineOffset/size, indicator color, indicator svg block/inline size.
  - Intentional direct `sys` usages: component-owned default assignments in `checkboxDefaults`.
- Foundation changes:
  - none.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components)

### `checkbox-group`

- Status: `done`
- Outcome:
  - Refactored `checkbox-group` ownership to group-only concerns (wrapper/root), with checkbox visuals delegated to `checkbox`.
  - Consolidated defaults into one owner assignment block: `assignVars(checkboxGroupVars, { ... })`.
  - Removed duplicated control/indicator styling and local tokens from `checkbox-group` to avoid reimplementing `checkbox` semantics.
  - Updated `seedly-react` `checkbox-group` to export wrapper/root only; stories now compose with `Checkbox.*` directly.
- Mapping coverage:
  - Properties audited: root foreground + group gap.
  - Properties remapped: root color/gap now resolve through `checkboxGroupVars` local tokens.
  - Intentional direct `sys` usages: component-owned default assignments in `checkboxGroupDefaults`.
- Foundation changes:
  - none.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components)

### `cluster`

- Status: `done`
- Outcome:
  - Normalized local spacing contract naming to role-based key `spacing.rootGap`.
  - Consolidated defaults into one owner assignment block: `assignVars(clusterVars, { ... })`.
  - Remapped token-eligible root spacing property (`gap`) to local component token.
- Mapping coverage:
  - Properties audited: root flex cluster spacing gap.
  - Properties remapped: root `gap` now resolves through `clusterVars.spacing.rootGap`.
  - Intentional direct `sys` usages: component-owned default assignment in `clusterDefaults`.
- Foundation changes:
  - none.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components)

### `collapsible`

- Status: `done`
- Outcome:
  - Expanded local contract coverage to role-based `color`, `layout`, `motion`, `shape`, `size`, and `spacing` groups for root/trigger/icon/panel/content surfaces.
  - Consolidated component-owned defaults into one owner assignment block: `assignVars(collapsibleVars, { ... })`.
  - Remapped token-eligible foreground/background/spacing/shape/size/focus/motion properties to local tokens.
  - Scoped panel animation transition to `block-size` and wired duration/easing through local motion tokens.
- Mapping coverage:
  - Properties audited: root foreground + minimum block size, trigger paddings/corner/focus outline offset, icon size + transform motion, panel size motion, content spacing/background/corner.
  - Properties remapped: root `color`/`minBlockSize`; trigger `paddingBlock`/`paddingInline`/`borderRadius`/`outlineOffset`; icon `blockSize`/`inlineSize` + transition duration/easing; panel transition duration/easing; content `gap`/`marginBlockStart`/`paddingBlock`/`paddingInlineStart`/`paddingInlineEnd`/`backgroundColor`/`borderRadius`.
  - Intentional direct `sys` usages: local default assignment for `size.rootMinBlockSize` uses an intentional derived value: `calc(${sys.spacing[18]} * 2)`.
- Foundation changes:
  - none.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components)

### `combobox`

- Status: `done`
- Outcome:
  - Expanded local contract coverage to role-based `color`, `layout`, `shape`, `size`, and `spacing` groups for label/input/popup/list/item/action surfaces.
  - Consolidated component-owned defaults into one owner assignment block: `assignVars(comboboxVars, { ... })`.
  - Remapped token-eligible input/empty/action/popup/highlight/list properties to local tokens and aligned strict `_foundation` call sites for field, highlight, and floating surface/list APIs.
  - Kept portal-safe token assignment by applying defaults on both `label` (owner subtree) and `positioner` (portal subtree).
- Mapping coverage:
  - Properties audited: label stack + color, input surface/focus/spacing, empty state padding/foreground, action button icon color/sizing/shape/positioning, popup surface, list panel sizing/padding, highlighted item inset/background/foreground/corner.
  - Properties remapped: label gap/foreground; input background/border/foreground/focus/corner/paddings/size; empty foreground; action button foreground/corner/size/inset; popup background/foreground/outline/shadow/corner; list max size + paddings; item highlight background/foreground/inset/corner.
  - Intentional direct `sys` usages: empty-state typography (`sys.typography.body.medium.size` and `.lineHeight`) and derived input end padding (`calc` from spacing tokens).
- Foundation changes:
  - none.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components)

### `container`

- Status: `done`
- Outcome:
  - Normalized the local contract to role-based color keys: `rootBackground`, `rootForeground`, `rootLevelBackground`, `rootOutline`.
  - Consolidated defaults into one owner assignment block: `assignVars(containerVars, { ... })`.
  - Kept `container` tightly coupled to system container colors by mapping defaults directly to `sys` and preserving level-driven surface behavior.
  - Kept the local contract internal (not exported) so level/variant composition remains explicit without introducing consumer-facing color override intent.
- Mapping coverage:
  - Properties audited: root foreground/background, level-derived background composition, outline pseudo-element border color.
  - Properties remapped: root `color`/`backgroundColor` and `::before` `borderColor` now resolve through role-based local tokens.
  - Intentional direct `sys` usages: component-owned default assignments in `containerDefaults` (`sys.color.container.*`, `sys.color.content.base`) and derived subtle outline (`color-mix`).
- Foundation changes:
  - none.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components)

### `context-menu`

- Status: `done`
- Outcome:
  - Scoped `context-menu` styling ownership to context-specific boundaries (`Root`, `Trigger`) and delegated shared visual surfaces to `menu` classes for parity.
  - Removed trigger-specific visual styling ownership from `context-menu`; trigger remains intentionally context-specific and unstyled.
  - Simplified `seedly-react` composition so `ContextMenu.Item`/`Popup`/`Portal`/`Positioner`/`Separator` reuse shared `Menu.*` wrappers.
- Contract changes:
  - Removed: local `contextMenuVars` contract and duplicated popup/item/separator token assignments.
- Mapping coverage:
  - Properties audited: context menu ownership boundaries for root/trigger vs popup/item/separator surfaces.
  - Properties remapped: `positioner`/`popup`/`item`/`separator` now resolve through `menu` component classes.
  - Intentional direct `sys` usages: none.
- Foundation changes:
  - none.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components)

### `cover`

- Status: `done`
- Outcome:
  - Normalized local contract naming to role-based keys: `layout.rootMinBlockSize` and `spacing.rootGap`.
  - Consolidated defaults into one owner assignment block: `assignVars(coverVars, { ... })`.
  - Remapped token-eligible root and child spacing/sizing properties to local contract tokens.
  - Updated `seedly-react` inline var wiring so `minSize` overrides target `coverVars.layout.rootMinBlockSize`.
- Mapping coverage:
  - Properties audited: root minimum block size and child stack spacing.
  - Properties remapped: root `minBlockSize` and child `marginBlock` now resolve through role-based local tokens.
  - Intentional direct `sys` usages: component-owned default assignment in `coverDefaults` (`sys.spacing[0]`).
- Foundation changes:
  - none.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components)

### `dialog`

- Status: `done`
- Outcome:
  - Normalized local contract naming to role-based popup outline key `color.popupOutline`.
  - Consolidated component-owned defaults into one owner assignment block: `assignVars(dialogVars, { ... })`.
  - Remapped popup outline wiring to the strict `_foundation` dialog API (`outline`) and removed obsolete light/dark caller fields.
- Mapping coverage:
  - Properties audited: backdrop surface + viewport sizing, popup surface/corner/outline/sizing/spacing, title and description spacing/color, action row gap.
  - Properties remapped: popup outline now resolves through `dialogVars.color.popupOutline`; all defaults are assigned through the top-level local contract.
  - Intentional direct `sys` usages: component-owned default assignments in `dialogDefaults`.
- Foundation changes:
  - none.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components)

### `field`

- Status: `done`
- Outcome:
  - Expanded local contract coverage to role-based `color`, `layout`, `shape`, `size`, and `spacing` groups for field stack, label, input, error, and description surfaces.
  - Consolidated component-owned defaults into one owner assignment block: `assignVars(fieldVars, { ... })`.
  - Remapped token-eligible input surface/focus/size/spacing and field stack gap properties to local tokens while satisfying strict `_foundation` `field-control` factory requirements.
- Mapping coverage:
  - Properties audited: field stack gap/width, label foreground, input background/foreground/border/focus/corner/size/padding, error foreground, description foreground/margins.
  - Properties remapped: stack `gap`/`inlineSize`; label color; input `backgroundColor`/`color`/`borderColor`/`borderRadius`/`outline` offset/`inlineSize`/`blockSize`/`paddingInlineStart`/`paddingInlineEnd`; error and description colors; description margins.
  - Intentional direct `sys` usages: component-owned default assignments in `fieldDefaults`.
- Foundation changes:
  - none.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components)
- Notes / follow-ups:
  - `field` no longer appears in the known strict-default fallout list.

### `fieldset`

- Status: `done`
- Outcome:
  - Expanded local contract coverage to role-based `color`, `size`, and `spacing` groups for fieldset root and legend surfaces.
  - Consolidated component-owned defaults into one owner assignment block: `assignVars(fieldsetVars, { ... })`.
  - Remapped token-eligible legend border/foreground and root gap properties to local tokens.
- Mapping coverage:
  - Properties audited: root stack gap; legend border width/color, spacing, and foreground color.
  - Properties remapped: root `gap`; legend `borderBlockEnd` width/color, `paddingBlockEnd`, and `color` now resolve through `fieldsetVars` local tokens.
  - Intentional direct `sys` usages: `typography.title.large` for legend typography.
- Foundation changes:
  - none.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components)

### `form`

- Status: `done`
- Outcome:
  - Normalized local contract naming to role-based key `spacing.rootGap`.
  - Consolidated component-owned defaults into one owner assignment block: `assignVars(formVars, { ... })`.
  - Remapped token-eligible root stack gap property to the role-based local token.
- Contract changes:
  - Renamed: `spacing.gap` -> `spacing.rootGap`.
- Mapping coverage:
  - Properties audited: root stack gap.
  - Properties remapped: root `gap` now resolves through `formVars.spacing.rootGap`.
  - Intentional direct `sys` usages: component-owned default assignment in `formDefaults` (`sys.spacing[8]`).
- Foundation changes:
  - none.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components)

### `frame`

- Status: `done`
- Outcome:
  - Normalized local contract naming to role-based key `layout.rootAspectRatio`.
  - Consolidated component-owned defaults into one owner assignment block: `assignVars(frameVars, { ... })`.
  - Remapped token-eligible root aspect-ratio property to the role-based local token.
- Contract changes:
  - Renamed: `layout.ratio` -> `layout.rootAspectRatio`.
- Mapping coverage:
  - Properties audited: root aspect ratio.
  - Properties remapped: root `aspectRatio` now resolves through `frameVars.layout.rootAspectRatio`.
  - Intentional direct `sys` usages: none.
- Foundation changes:
  - none.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components)

### `grid`

- Status: `done`
- Outcome:
  - Normalized local contract naming to role-based keys: `spacing.rootGap`, `columnSpacing.rootColumnGap`, `rowSpacing.rootRowGap`, and `layout.rootMinCellSize`.
  - Consolidated component-owned defaults into one owner assignment block: `assignVars(gridVars, { ... })`.
  - Remapped token-eligible root spacing and auto-layout sizing properties to the role-based local tokens while preserving axis-spacing fallback behavior.
- Contract changes:
  - Renamed: `spacing.gap` -> `spacing.rootGap`.
  - Renamed: `columnSpacing.gap` -> `columnSpacing.rootColumnGap`.
  - Renamed: `rowSpacing.gap` -> `rowSpacing.rootRowGap`.
  - Renamed: `layout.minCellSize` -> `layout.rootMinCellSize`.
- Mapping coverage:
  - Properties audited: root `gap`, `columnGap`, `rowGap`, and auto-layout `gridTemplateColumns` min cell size.
  - Properties remapped: root `gap`/`columnGap`/`rowGap` and auto-layout `minmax(min(...))` now resolve through `gridVars` role-based local tokens.
  - Intentional direct `sys` usages: component-owned default assignments in `gridDefaults` (`sys.spacing[0]`) and intentional derived min cell size (`calc(${sys.layout.measure} / 3)`).
- Foundation changes:
  - none.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components)

### `input`

- Status: `done`
- Outcome:
  - Expanded local contract coverage to role-based `color`, `layout`, `shape`, `size`, and `spacing` groups for label + input surfaces.
  - Consolidated component-owned defaults into one owner assignment block: `assignVars(inputVars, { ... })`.
  - Remapped token-eligible input surface/focus/size/spacing and stack gap properties to local tokens while satisfying strict `_foundation` `field-control` factory requirements.
- Mapping coverage:
  - Properties audited: label foreground, stack gap, input background/foreground/border/focus/corner/size/padding/inline size.
  - Properties remapped: label color; stack `gap` + `inlineSize`; input `backgroundColor`/`color`/`borderColor`/`borderRadius`/focus outline offset/`inlineSize`/`blockSize`/`paddingInlineStart`/`paddingInlineEnd` now resolve through `inputVars` local tokens.
  - Intentional direct `sys` usages: component-owned default assignments in `inputDefaults`.
- Foundation changes:
  - none.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components)

### `label`

- Status: `done`
- Outcome:
  - Expanded local contract coverage to role-based `typography` tokens for `field`, `choice`, and `caption` variants.
  - Consolidated component-owned defaults into one owner assignment block: `assignVars(labelVars, { ... })`.
  - Remapped token-eligible typography properties to local tokens while preserving existing variant API and default (`field`).
  - Verified `input` label context composition remains one-way (`InputLabel` composes `labelRecipe` + input class) with no input-scope style leakage into standalone `label`.
- Mapping coverage:
  - Properties audited: label `fontFamily`, `fontSize`, `fontWeight`, `letterSpacing`, `lineHeight` across `field`, `choice`, `caption` variants.
  - Properties remapped: all variant typography properties now resolve through `labelVars.typography.*` local tokens.
  - Intentional direct `sys` usages: component-owned default assignments in `labelDefaults` (`sys.typography.label.medium`, `sys.typography.body.large`, `sys.typography.label.large`).
- Foundation changes:
  - none.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components)

### `layout`

- Status: `done`
- Outcome:
  - Normalized local contract naming to role-based keys: `spacing.rootPaddingBlock`, `spacing.rootPaddingInline`, `shape.rootCorner`, `elevation.rootLevel`.
  - Consolidated component-owned defaults into one owner assignment block: `assignVars(layoutVars, { ... })`.
  - Remapped token-eligible layout base properties (`paddingBlock`, `paddingInline`, `borderRadius`, `boxShadow`) to local tokens.
  - Applied intentional API break from `radius` to `corner` across layout exports and downstream `box`/`container` variants and responsive APIs.
  - Updated `seedly-react` `box`/`container` wrappers and stories to use `corner` prop naming.
- Contract changes:
  - Renamed: `spacing.block` -> `spacing.rootPaddingBlock`.
  - Renamed: `spacing.inline` -> `spacing.rootPaddingInline`.
  - Renamed: `shape.corner` -> `shape.rootCorner`.
  - Renamed: `elevation.level` -> `elevation.rootLevel`.
  - Renamed: `layoutRadiusStyles` -> `layoutCornerStyles`.
  - Renamed: `radiusAt` -> `cornerAt`.
  - Renamed: `radius` variant -> `corner` variant (`layout`, `box`, `container`).
- Mapping coverage:
  - Properties audited: layout root block/inline padding, corner radius, elevation shadow; shared layout alignment maps in `layout/shared/maps.ts`.
  - Properties remapped: layout root `paddingBlock`/`paddingInline`/`borderRadius`/`boxShadow` now resolve through role-based local tokens.
  - Intentional direct `sys` usages: component-owned default assignments in `layoutRecipe`.
- Foundation changes:
  - none.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components: `menu`, `menubar`, `meter`, `navigation-menu`, `number-field`, `popover`, `preview-card`, `progress`, `radio`, `select`, `slider`, `tooltip`)
- Notes / follow-ups:
  - `layout/shared/maps.ts` was audited during this pass; no adaptation was required because it only exports generic flex/grid alignment maps and has no dependency on the `radius`/`corner` API.

### `menu`

- Status: `done`
- Outcome:
  - Expanded local contract coverage to role-based `color`, `shape`, `size`, and `spacing` groups for trigger icon, popup, item highlight, separator, and arrow surfaces.
  - Consolidated component-owned defaults into one owner assignment block: `assignVars(menuVars, { ... })`.
  - Remapped popup outline wiring to the strict `_foundation` floating surface API (`outline`, `outlineInverse`) and removed obsolete light/dark caller fields.
  - Added strict `_foundation` highlight caller coverage for required `insetInline` option using local tokens.
  - Kept portal-safe token assignment by assigning defaults at both `button` (trigger subtree owner) and `positioner` (portal subtree owner).
- Contract changes:
  - Added: `color.popupForeground`, `color.popupOutline`, `color.popupOutlineInverse`, `color.triggerOpenBackground`, `shape.itemHighlightCorner`, `spacing.itemHighlightInsetInline`, `spacing.popupPaddingBlock`, `spacing.separatorMarginBlock`, `spacing.separatorMarginInline`, `spacing.triggerIconMarginInlineEnd`.
  - Renamed: `shape.itemCorner` -> `shape.itemHighlightCorner`.
  - Removed: `color.triggerForeground`, `color.triggerBackground`, `color.triggerBorder`, `color.triggerHoverBackground`, `color.triggerFocusRing`, `color.popupOutlineLight`, `color.popupOutlineDark`, `shape.triggerCorner`.
- Mapping coverage:
  - Properties audited: trigger open-state background, trigger icon margin, popup surface (background/foreground/outline/shadow/corner/padding), highlighted item inset/background/foreground/corner, separator size/margins/color, arrow fill/strokes.
  - Properties remapped: popup `background`/`foreground`/`outline`/`outlineInverse`/`shadow`/`borderRadius`/`paddingBlock`; trigger open-state `backgroundColor`; button icon `marginInlineEnd`; highlighted item `textColor`/`backgroundColor`/`insetInline`/`borderRadius`; separator `blockSize`/`marginBlock`/`marginInline`/`backgroundColor` now resolve through `menuVars` local tokens.
  - Intentional direct `sys` usages: component-owned default assignments in `menuDefaults`.
- Foundation changes:
  - none.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components: `menubar`, `meter`, `navigation-menu`, `number-field`, `popover`, `preview-card`, `progress`, `radio`, `select`, `slider`, `tooltip`)
- Notes / follow-ups:
  - `menu` no longer appears in the known strict-default fallout list.

### `menubar`

- Status: `done`
- Outcome:
  - Scoped `menubar` styling ownership to the root container surface only.
  - Delegated `menuTrigger`/`menuPopup`/`menuItem`/`menuPositioner`/`menuSeparator` exports to `menu` styles to enforce exact visual parity and avoid duplicated contracts.
  - Simplified `seedly-react` menubar composition so `MenubarMenu.*` reuses shared `Menu.*` primitives (including `TriggerIcon`) instead of duplicating part wrappers.
  - Updated `menubar` stories to use composed trigger icons and reflect menu-parity composition.
- Contract changes:
  - Removed: local `menubarVars` contract and duplicated menubar surface token wiring.
- Mapping coverage:
  - Properties audited: menubar root layout and trigger/popup/item/separator ownership boundaries.
  - Properties remapped: `menuTrigger`/`menuPopup`/`menuItem`/`menuPositioner`/`menuSeparator` now resolve through `menu` component classes.
  - Intentional direct `sys` usages: none.
- Foundation changes:
  - none.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components: `meter`, `navigation-menu`, `number-field`, `popover`, `preview-card`, `progress`, `radio`, `select`, `slider`, `tooltip`)
- Notes / follow-ups:
  - `menubar` no longer appears in the known strict-default fallout list.

### `meter`

- Status: `done`
- Outcome:
  - Expanded local contract coverage to role-based `color`, `layout`, `motion`, `shape`, `size`, and `spacing` groups for root readout and range-track surfaces.
  - Consolidated component-owned defaults into one owner assignment block: `assignVars(meterVars, { ... })`.
  - Added strict `_foundation` range-track caller coverage for required root vars (`trackBackground`, `trackBorder`, `indicator`, `corner`) and required track style option (`blockSize`).
  - Remapped token-eligible readout/track/indicator properties to local tokens, including indicator width transition duration/easing.
  - Aligned range-track token naming with the shared migration plan for `meter`, `progress`, and `slider`.
- Contract changes:
  - Added: `color.indicatorBackground`, `color.rootForeground`, `color.trackBackground`, `color.trackBorder`, `layout.rootColumns`, `motion.indicatorWidthDuration`, `motion.indicatorWidthEasing`, `shape.trackCorner`, `size.trackBlockSize`, `spacing.rootRowGap`.
  - Renamed: `color.foreground` -> `color.rootForeground`, `layout.columns` -> `layout.rootColumns`, `spacing.rowGap` -> `spacing.rootRowGap`.
- Mapping coverage:
  - Properties audited: root grid columns and row gap, label/value foreground, track placement/surface/corner/size, indicator fill and width transition.
  - Properties remapped: root `gridTemplateColumns`/`rowGap`; label and value `color`; track `gridColumn`/`blockSize` plus range-track `background`/`border`/`indicator`/`corner`; indicator width transition `duration`/`easing` now resolve through `meterVars` local tokens.
  - Intentional direct `sys` usages: typography utilities (`typography.label.medium`, `typography.body.medium`) and component-owned default assignments in `meterDefaults`.
- Foundation changes:
  - none.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components: `navigation-menu`, `number-field`, `popover`, `preview-card`, `progress`, `radio`, `select`, `slider`, `tooltip`)
- Notes / follow-ups:
  - `meter` no longer appears in the known strict-default fallout list.

### `navigation-menu`

- Status: `done`
- Outcome:
  - Expanded local contract coverage to role-based `color`, `layout`, `motion`, `shape`, `size`, `spacing`, and `typography` groups for trigger, popup, content, link card, and arrow surfaces.
  - Consolidated component-owned defaults into one owner assignment block: `assignVars(navigationMenuVars, { ... })`.
  - Added strict `_foundation` floating-surface caller coverage for required popup options (`background`, `foreground`, `outline`, `shadow`) and remapped popup motion to local tokens.
  - Kept portal-safe token assignment by assigning defaults at both `root` (trigger subtree owner) and `positioner` (portal subtree owner).
- Contract changes:
  - Added: `color.arrowInnerStroke`, `color.arrowOuterStroke`, `color.contentForeground`, `color.linkCardFocusRing`, `color.linkCardHoverBackground`, `color.linkDescriptionForeground`, `color.popupBackground`, `color.popupForeground`, `color.popupOutline`, `color.popupShadow`, `color.triggerBackground`, `color.triggerFocusRing`, `color.triggerHoverBackground`, `color.triggerOpenBackground`, `layout.contentMobileInlineSize`, `motion.arrowPositionDuration`, `motion.arrowPositionEasing`, `motion.contentOpacityDuration`, `motion.contentOpacityEasing`, `motion.contentTransformDuration`, `motion.contentTransformEasing`, `motion.iconRotationDuration`, `motion.iconRotationEasing`, `motion.popupEnterDuration`, `motion.popupEnterEasing`, `motion.popupExitDuration`, `motion.popupExitEasing`, `motion.positionerTransitionDuration`, `motion.positionerTransitionEasing`, `shape.linkCardCorner`, `shape.popupCorner`, `shape.triggerCorner`, `size.triggerBlockSize`, `spacing.contentPaddingBlock`, `spacing.contentPaddingInline`, `spacing.floatingPointerSize`, `spacing.linkCardPaddingBlock`, `spacing.linkCardPaddingBlockDesktop`, `spacing.linkCardPaddingInline`, `spacing.linkCardPaddingInlineDesktop`, `spacing.linkTitleMarginBlockEnd`, `spacing.triggerGap`, `spacing.triggerPaddingInline`, `spacing.triggerPaddingInlineMobile`, `typography.linkDescriptionLineHeight`, `typography.linkDescriptionSize`, `typography.linkTitleLineHeight`, `typography.linkTitleSize`, `typography.linkTitleWeight`, `typography.triggerMobileLineHeight`, `typography.triggerMobileSize`.
- Mapping coverage:
  - Properties audited: trigger surface/focus states, popup surface/motion, content width/spacing/motion, grid/flex list sizing, link card hover/focus/spacing, link title/description typography, arrow fill/strokes/position motion.
  - Properties remapped: all token-eligible trigger/popup/content/link/arrow properties now resolve through `navigationMenuVars` local tokens.
  - Intentional direct `sys` usages: component-owned default assignments in `navigationMenuDefaults` and intentional derived mobile content width (`calc.subtract('100vw', sys.spacing[14])`).
- Foundation changes:
  - none.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components: `number-field`, `popover`, `preview-card`, `progress`, `radio`, `select`, `slider`, `tooltip`)
- Notes / follow-ups:
  - `navigation-menu` no longer appears in the known strict-default fallout list.

### `number-field`

- Status: `done`
- Outcome:
  - Expanded local contract coverage to role-based `color`, `layout`, `shape`, `size`, `spacing`, and `typography` groups for field stack, input, label, scrub area, cursor, and stepper surfaces.
  - Consolidated component-owned defaults into one owner assignment block: `assignVars(numberFieldVars, { ... })`.
  - Updated strict `_foundation` usage for field stack (`gap`, `inlineSize`), label (`color`), and input (`createFieldTextInputStyles`) while preserving segmented-input behavior with component overrides.
  - Simplified stepper button styling to number-field-specific visuals and geometry now that increment/decrement compose through the shared `Button` wrapper.
- Contract changes:
  - Added: `color.decrementBackground`, `color.incrementActiveBackground`, `color.incrementBackground`, `color.incrementHoverBackground`, `color.inputBackground`, `color.inputBorder`, `color.inputFocusRing`, `color.inputForeground`, `color.labelForeground`, `color.scrubAreaCursorShadow`, `color.stepperBorder`, `color.stepperForeground`, `layout.inputFocusRingOffset`, `layout.inputInlineSize`, `shape.inputMergedCorner`, `shape.stepperCorner`, `spacing.fieldGap`, `typography.scrubAreaWeight`.
  - Removed: `spacing.zero`, `shape.controlCorner`, `shape.mergedCorner`.
- Mapping coverage:
  - Properties audited: field stack gap/width, label foreground, input surface/border/focus/size/alignment, scrub area weight, scrub cursor shadow, stepper surface/border/foreground/corner/size and increment interactive states.
  - Properties remapped: all token-eligible number-field surface and sizing properties now resolve through `numberFieldVars` local tokens.
  - Intentional direct `sys` usages: zero-value input padding and stepper spacing resets (`sys.spacing[0]`) inside style rules.
- Foundation changes:
  - none.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components: `popover`, `preview-card`, `progress`, `radio`, `select`, `slider`, `tooltip`)
- Notes / follow-ups:
  - `number-field` no longer appears in the known strict-default fallout list.

### `popover`

- Status: `done`
- Outcome:
  - Expanded local contract coverage to role-based `color`, `layout`, `shape`, and `spacing` groups for trigger open state, popup surface, description text, and arrow strokes.
  - Consolidated component-owned defaults into one owner assignment block: `assignVars(popoverVars, { ... })`.
  - Remapped popup outline wiring to the strict `_foundation` floating-surface API (`outline`, `outlineInverse`) and removed obsolete light/dark caller fields.
  - Kept portal-safe token assignment by assigning defaults at both `iconButton` (trigger subtree owner) and `positioner` (portal subtree owner).
- Contract changes:
  - Added: `color.descriptionForeground`, `color.popupForeground`, `color.popupOutline`, `color.popupOutlineInverse`, `color.triggerOpenBackground`, `spacing.popupPaddingBlock`, `spacing.popupPaddingInline`.
  - Removed: `color.triggerForeground`, `color.triggerBackground`, `color.triggerBorder`, `color.triggerHoverBackground`, `color.triggerFocusRing`, `color.popupOutlineLight`, `color.popupOutlineDark`, `shape.triggerCorner`.
- Mapping coverage:
  - Properties audited: trigger open-state background, popup surface (background/foreground/outline/shadow/corner/max inline size), popup paddings, arrow fill/strokes, description foreground.
  - Properties remapped: icon-button open-state `backgroundColor`; popup `paddingBlock`/`paddingInline`/`color`/`outline`/`outlineInverse`; description `color` now resolve through `popoverVars` local tokens.
  - Intentional direct `sys` usages: component-owned default assignments in `popoverDefaults`.
- Foundation changes:
  - none.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components: `preview-card`, `progress`, `radio`, `select`, `slider`, `tooltip`)
- Notes / follow-ups:
  - `popover` no longer appears in the known strict-default fallout list.

### `preview-card`

- Status: `done`
- Outcome:
  - Expanded local contract coverage to role-based `color`, `layout`, `shape`, and `spacing` groups for trigger text treatment, popup surface, and arrow stroke/fill surfaces.
  - Consolidated component-owned defaults into one owner assignment block: `assignVars(previewCardVars, { ... })`.
  - Remapped popup surface wiring to the strict `_foundation` floating-surface API (`background`, `foreground`, `outline`, `outlineInverse`, `shadow`) and removed direct `sys` usage from theme-facing style rules.
  - Kept portal-safe token assignment by assigning defaults at both `link` (trigger subtree owner) and `positioner` (portal subtree owner).
- Contract changes:
  - Added: `color.arrowInnerStroke`, `color.arrowOuterStroke`, `color.popupBackground`, `color.popupForeground`, `color.popupOutline`, `color.popupOutlineInverse`, `color.popupShadow`, `color.triggerFocusRing`, `color.triggerForeground`, `color.triggerUnderline`, `shape.popupCorner`, `shape.triggerFocusCorner`, `spacing.triggerUnderlineOffset`.
- Mapping coverage:
  - Properties audited: popup max inline size + floating surface visuals, arrow fill/strokes, trigger color + underline + focus ring/corner.
  - Properties remapped: popup `background`/`foreground`/`outline`/`outlineInverse`/`shadow`/`borderRadius`/`maxInlineSize`; arrow fill/strokes; trigger `color`/`textDecorationColor`/`textUnderlineOffset`/focus `borderRadius` + `outline` now resolve through `previewCardVars` local tokens.
  - Intentional direct `sys` usages: component-owned default assignments in `previewCardDefaults`.
- Foundation changes:
  - none.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components: `progress`, `radio`, `select`, `slider`, `tooltip`)
- Notes / follow-ups:
  - `preview-card` no longer appears in the known strict-default fallout list.

### `progress`

- Status: `done`
- Outcome:
  - Expanded local contract coverage to role-based `color`, `layout`, `motion`, `shape`, `size`, and `spacing` groups for root readout and range-track surfaces.
  - Consolidated component-owned defaults into one owner assignment block: `assignVars(progressVars, { ... })`.
  - Added strict `_foundation` range-track caller coverage for required root vars (`trackBackground`, `trackBorder`, `indicator`, `corner`) and required track style option (`blockSize`).
  - Remapped token-eligible readout/track/indicator properties to local tokens, including indicator width transition duration/easing.
  - Aligned range-track token naming with the shared migration plan for `meter`, `progress`, and `slider`.
- Contract changes:
  - Added: `color.indicatorBackground`, `color.rootForeground`, `color.trackBackground`, `color.trackBorder`, `layout.rootColumns`, `motion.indicatorWidthDuration`, `motion.indicatorWidthEasing`, `shape.trackCorner`, `size.trackBlockSize`, `spacing.rootColumnGap`, `spacing.rootRowGap`.
  - Renamed: `color.foreground` -> `color.rootForeground`, `layout.columns` -> `layout.rootColumns`, `spacing.columnGap` -> `spacing.rootColumnGap`, `spacing.rowGap` -> `spacing.rootRowGap`.
- Mapping coverage:
  - Properties audited: root grid columns and gaps, label/value foreground, track placement/surface/corner/size, indicator fill and width transition.
  - Properties remapped: root `gridTemplateColumns`/`columnGap`/`rowGap`; label and value `color`; track `gridColumn`/`blockSize` plus range-track `background`/`border`/`indicator`/`corner`; indicator width transition `duration`/`easing` now resolve through `progressVars` local tokens.
  - Intentional direct `sys` usages: typography utilities (`typography.label.medium`, `typography.body.medium`) and component-owned default assignments in `progressDefaults`.
- Foundation changes:
  - none.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components: `radio`, `select`, `slider`, `tooltip`)
- Notes / follow-ups:
  - `progress` no longer appears in the known strict-default fallout list.

### `radio`

- Status: `done`
- Outcome:
  - Expanded local contract coverage to role-based `color`, `shape`, `size`, and `spacing` groups for label/control/indicator surfaces.
  - Consolidated component-owned defaults into one owner assignment block: `assignVars(radioVars, { ... })`.
  - Added strict `_foundation` choice-control caller coverage for required `size` and `focusOutlineOffset` options using local tokens.
  - Split group ownership into a dedicated `radio-group` component to align composition structure with `checkbox` + `checkbox-group`.
  - Applied a clean API break in `seedly-react`: removed `Radio.Group`/`Radio.Item`/`Radio.Caption`; radio options now compose as `RadioGroup.Root` + `Radio.Label` + `Radio.Root` + `Radio.Indicator`.
- Contract changes:
  - Added: `color.controlBorder`, `color.controlCheckedBackground`, `color.controlFocusRing`, `color.indicatorForeground`, `color.labelForeground`, `shape.controlCorner`, `size.controlSize`, `size.indicatorSize`, `spacing.controlFocusOutlineOffset`, `spacing.labelGap`.
  - Removed: `color.foreground`, `color.border`, `color.checkedBackground`, `color.checkedForeground`, `color.focusRing`, `shape.corner`, `spacing.groupGap`, `spacing.itemGap`, `spacing.indicatorSize`.
- Mapping coverage:
  - Properties audited: label foreground + gap, control border/background/focus/corner/size, indicator dot foreground/size/corner, and group foreground + gap ownership split.
  - Properties remapped: label color/gap and control/indicator theme-facing properties now resolve through `radioVars`; group foreground/gap now resolve through `radioGroupVars`.
  - Intentional direct `sys` usages: component-owned default assignments in `radioDefaults` and `radioGroupDefaults`.
- Foundation changes:
  - none.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components: `select`, `slider`, `tooltip`)
- Notes / follow-ups:
  - `radio` no longer appears in the known strict-default fallout list.

### `scroll-area`

- Status: `done`
- Outcome:
  - Expanded local contract coverage to role-based `color`, `layout`, `motion`, `shape`, `size`, and `spacing` groups for root, viewport, content, scrollbar, and thumb surfaces.
  - Consolidated component-owned defaults into one owner assignment block: `assignVars(scrollAreaVars, { ... })`.
  - Remapped token-eligible viewport outline/focus, content spacing, scrollbar surface/sizing/margins/motion, and thumb surface properties to local tokens.
- Contract changes:
  - Added: `color.scrollbarBackground`, `color.thumbBackground`, `color.viewportFocusRing`, `color.viewportOutline`, `motion.scrollbarFadeDuration`, `motion.scrollbarFadeEasing`, `size.scrollbarHitAreaInlineSize`, `size.scrollbarInlineSize`, `spacing.contentGap`, `spacing.contentPaddingBlock`, `spacing.contentPaddingInlineEnd`, `spacing.contentPaddingInlineStart`, `spacing.scrollbarMarginBlock`, `spacing.scrollbarMarginInline`.
- Mapping coverage:
  - Properties audited: root block size, viewport corner/outline/focus, content gap/paddings, scrollbar inline size/margins/background/corner/fade transition/hit area, thumb background.
  - Properties remapped: root `blockSize`; viewport `outline` and focus-visible `outline`; content `gap`/`paddingBlock`/`paddingInlineStart`/`paddingInlineEnd`; scrollbar `inlineSize`/`marginBlock`/`marginInline`/`backgroundColor`/transition `duration`+`easing` and pseudo hit-area `inlineSize`; thumb `backgroundColor` now resolve through `scrollAreaVars` local tokens.
  - Intentional direct `sys` usages: component-owned default assignments in `scrollAreaDefaults`.
- Foundation changes:
  - none.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components: `select`, `slider`, `tooltip`)

### `select`

- Status: `done`
- Outcome:
  - Expanded local contract coverage to role-based `color`, `layout`, `shape`, `size`, and `spacing` groups for trigger, popup, list, highlighted item, and scroll arrow surfaces.
  - Consolidated component-owned defaults into one owner assignment block: `assignVars(selectVars, { ... })`.
  - Remapped popup outline wiring to the strict `_foundation` floating surface API (`outline`, `outlineInverse`) and removed obsolete light/dark caller fields.
  - Added strict `_foundation` caller coverage for required trigger/list/highlight options (`focusRingOffset`, `paddingInlineStart`, `inlineSize`, `blockSize`, list max/paddings, highlight inset).
  - Kept portal-safe token assignment by assigning defaults at both `select` (owner subtree) and `positioner` (portal subtree).
- Contract changes:
  - Added: `color.popupForeground`, `color.triggerFocusRing`, `color.triggerForeground`, `color.triggerOpenBackground`, `layout.triggerFocusRingOffset`, `layout.triggerInlineSize`, `shape.itemHighlightCorner`, `size.listMaxBlockSize`, `size.triggerBlockSize`, `spacing.itemHighlightInsetInline`, `spacing.listPaddingBlock`, `spacing.listScrollPaddingBlock`, `spacing.triggerPaddingInlineStart`.
  - Renamed: `color.focusRing` -> `color.triggerFocusRing`, `color.foreground` -> `color.triggerForeground`, `color.itemHighlightedBackground` -> `color.itemHighlightBackground`, `color.itemHighlightedForeground` -> `color.itemHighlightForeground`, `color.popupOutlineLight` -> `color.popupOutline`, `color.popupOutlineDark` -> `color.popupOutlineInverse`, `shape.itemCorner` -> `shape.itemHighlightCorner`.
- Mapping coverage:
  - Properties audited: trigger foreground/surface/border/focus/size/spacing, popup surface/outline/shadow/min-inline sizing, list panel sizing/paddings, highlighted item inset/background/foreground/corner, item coarse typography overrides, scroll arrow surface/size/corner.
  - Properties remapped: trigger `color`/`backgroundColor`/`borderColor`/focus outline offset/`inlineSize`/`blockSize`/paddings/gap and popup-open surface state; popup `foreground`/`outline`/`outlineInverse`; list `maxBlockSize`/`paddingBlock`/`scrollPaddingBlock`; item highlight inset/background/foreground/corner now resolve through `selectVars` local tokens.
  - Intentional direct `sys` usages: placeholder muted opacity (`sys.state.muted.text`) and coarse/no-side item typography (`sys.typography.label.large`).
- Foundation changes:
  - Added shared helper `createFloatingHighlightedItemStyles` to `_foundation/floating-surface` and adopted it in `menu` and `select` to remove duplicated highlight composition wiring.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components: `slider`, `tooltip`)

### `separator`

- Status: `done`
- Outcome:
  - Normalized the local contract to role-based keys for separator root and link surfaces.
  - Consolidated component-owned defaults into one owner assignment block: `assignVars(separatorVars, { ... })`.
  - Remapped token-eligible separator and link style properties to local contract tokens, including underline thickness and underline offset.
- Contract changes:
  - Added: `size.linkUnderlineThickness`, `spacing.linkUnderlineOffset`.
  - Renamed: `color.separator` -> `color.rootBackground`, `color.link` -> `color.linkForeground`, `color.linkDecoration` -> `color.linkUnderline`, `color.focusRing` -> `color.linkFocusRing`, `shape.focusCorner` -> `shape.linkFocusCorner`, `size.blockSize` -> `size.rootBlockSize`, `size.verticalInlineSize` -> `size.rootVerticalInlineSize`, `size.verticalBlockSize` -> `size.rootVerticalBlockSize`.
- Mapping coverage:
  - Properties audited: root separator surface and orientation sizing, link foreground/underline treatment, and link focus ring/corner treatment.
  - Properties remapped: root `backgroundColor`/`blockSize` and vertical orientation `inlineSize`/`blockSize`; link `color`/`textDecorationColor`/`textDecorationThickness`/`textUnderlineOffset` and focus-visible `borderRadius`/`outline` now resolve through `separatorVars` local tokens.
  - Intentional direct `sys` usages: component-owned default assignments in `separatorDefaults`.
- Foundation changes:
  - none.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components: `slider`, `tooltip`)

### `sidebar`

- Status: `done`
- Outcome:
  - Normalized local contract naming to role-based keys: `spacing.rootGap`, `layout.sideInlineSize`, and `layout.contentMinInlineSize`.
  - Consolidated component-owned defaults into one owner assignment block: `assignVars(sidebarVars, { ... })`.
  - Remapped token-eligible layout and spacing properties (`gap`, `flexBasis`, `minInlineSize`) to local tokens.
  - Updated `seedly-react` inline var wiring to map `sideWidth` and `contentMinWidth` props to renamed `sidebarVars.layout` token keys.
- Contract changes:
  - Renamed: `spacing.gap` -> `spacing.rootGap`.
  - Renamed: `layout.sideWidth` -> `layout.sideInlineSize`.
  - Renamed: `layout.contentMinWidth` -> `layout.contentMinInlineSize`.
- Mapping coverage:
  - Properties audited: root cluster gap, side slot `flexBasis`, and content slot `minInlineSize` for both `side.left` and `side.right` selectors.
  - Properties remapped: root `gap`, side-width variant child `flexBasis`, and content-slot `minInlineSize` now resolve through `sidebarVars` role-based local tokens.
  - Intentional direct `sys` usages: component-owned default assignments in `sidebarDefaults` (`sys.spacing[0]`, `sys.layout.measure`).
- Foundation changes:
  - none.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components: `slider`, `tooltip`)

### `slider`

- Status: `done`
- Outcome:
  - Expanded local contract coverage to role-based `color`, `shape`, `size`, and `spacing` groups for control, range track, indicator, and thumb surfaces.
  - Consolidated component-owned defaults into one owner assignment block: `assignVars(sliderVars, { ... })`.
  - Added strict `_foundation` range-track caller coverage for required root vars (`trackBackground`, `trackBorder`, `indicator`, `corner`) and required track style option (`blockSize`).
  - Remapped token-eligible control/track/indicator/thumb properties to local tokens and aligned slider range-track naming with `meter`/`progress`.
- Contract changes:
  - Added: `color.indicatorBackground`, `color.trackBackground`, `color.trackBorder`, `shape.trackCorner`, `size.thumbSize`, `size.trackBlockSize`.
  - Renamed: `spacing.thumbSize` -> `size.thumbSize`.
- Mapping coverage:
  - Properties audited: control padding; track surface/corner/block size; indicator fill surface; thumb size/corner/background/outline/focus ring.
  - Properties remapped: control `paddingBlock`; track `blockSize` plus range-track `background`/`border`/`corner`; indicator `backgroundColor`; thumb `inlineSize`/`blockSize`/`borderRadius`/`backgroundColor`/`outline` and focus-visible outline now resolve through `sliderVars` local tokens.
  - Intentional direct `sys` usages: component-owned default assignments in `sliderDefaults` and thumb elevation (`sys.elevation.minimal`).
- Foundation changes:
  - none.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components: `tooltip`)

### `stack`

- Status: `done`
- Outcome:
  - Normalized local contract naming to role-based key `spacing.rootGap`.
  - Consolidated component-owned defaults into one owner assignment block: `assignVars(stackVars, { ... })`.
  - Remapped token-eligible root stack gap property to the role-based local token.
- Contract changes:
  - Renamed: `spacing.gap` -> `spacing.rootGap`.
- Mapping coverage:
  - Properties audited: root stack gap.
  - Properties remapped: root `gap` now resolves through `stackVars.spacing.rootGap`.
  - Intentional direct `sys` usages: component-owned default assignment in `stackDefaults` (`sys.spacing[0]`).
- Foundation changes:
  - none.
- Validation:
  - format: `pnpm run format:fix` (pass)
  - lint: `pnpm run lint:fix` (pass)
  - tsc: `pnpm run tsc` (fail due unrelated in-progress migration components: `tooltip`)

---

## Final Exit Criteria

Migration is complete when:

1. All checklist components are marked done.
2. Shared foundations are aligned with explicit token flow.
3. Token naming and group structure are consistent across components.
4. Validation sequence passes repository-wide.
5. This plan file reflects final statuses and notes.
