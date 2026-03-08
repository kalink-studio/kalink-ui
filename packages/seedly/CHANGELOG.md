# @kalink-ui/seedly

## 1.0.0-beta.0

### Major Changes

- def1a5f: Rebuild Seedly around Base UI parity styles using vanilla-extract only, including 35 component style modules, shared reset/theme layers, and legacy compatibility exports for downstream apps.
- 7f37273: Refactor the color system to `sys.color` (surface/container/content/tone), add
  Surface and Container primitives, and make Box tone-only with a layout-only
  mode when no tone is set.

### Minor Changes

- 4da0b6b: Backport MoonLoader and LoaderOverlay primitives so loading states are available in both Seedly packages.
- 993e924: Expand Seedly color profiles and shared foundation styles so components can share richer tone and surface behavior.
- 2451427: Add responsive layout primitives and responsive prop support across Seedly layout components and their React wrappers.
- f6f7311: Backport Text and Heading primitives with responsive Seedly styles and React wrapper APIs for richer typography composition.
- 032d76a: Add Drawer primitives and React wrappers so overlay-based drawer interactions are available alongside the existing dialog system.
- 4be815b: Add shared List primitives and story usage so Seedly and seedly-react expose a reusable list component API.
- e06ff34: Add responsive typography generation and wire it into text-bearing components.
- 63a0911: Align theming and responsive APIs across components with shared tone helpers.
- 705d275: Make tone styling opt-in across components and propagate tone support through
  inputs, overlays, and layout primitives, with Storybook controls added for
  tone-enabled stories.

### Patch Changes

- 2dd75e2: Default shared foundation style factories so Seedly controls and floating surfaces inherit consistent contract wiring.
- f47b1f7: Update Switcher contract mappings and wrapper behavior so responsive layout tokens resolve consistently across both packages.
- 3abab4d: Normalize text input styling across Field, Input, Select, Autocomplete, and Combobox foundations.
- fe6e40c: Update the Container local token contract mapping so its component vars stay aligned with the refreshed Seedly contracts.
- d8e2b75: Update the AlertDialog local token contract mapping so its component vars stay aligned with the refreshed Seedly contracts.
- 264dc22: Update Menubar contract mappings and wrapper composition so shared menu tokens stay aligned across the bar primitives.
- b4062af: Update the Avatar local token contract mapping so its component vars stay aligned with the refreshed Seedly contracts.
- 07d65a8: Update the Center local token contract mapping so its component vars stay aligned with the refreshed Seedly contracts.
- a00dcc3: Update the Toggle local token contract mapping so its component vars stay aligned with the refreshed Seedly contracts.
- 8a5ca4a: Update the Box local token contract mapping so its component vars stay aligned with the refreshed Seedly contracts.
- fe38c46: Update the Fieldset local token contract mapping so its component vars stay aligned with the refreshed Seedly contracts.
- d8578dc: Update the Switch local token contract mapping so its component vars stay aligned with the refreshed Seedly contracts.
- 9408d29: Align collapsible defaults and hover tokens so triggers and panels behave more consistently across Seedly and seedly-react.
- d34940c: Update ContextMenu contract mappings and React menu wrappers so popup menu pieces share the same refreshed local tokens.
- d2a65b0: Update CheckboxGroup contract mappings and wrapper composition so grouped controls stay aligned with the refreshed Seedly contracts.
- 2e57481: Update the Toast local token contract mapping so its component vars stay aligned with the refreshed Seedly contracts.
- f7897ac: Update the Separator local token contract mapping so its component vars stay aligned with the refreshed Seedly contracts.
- a7a2d8f: Update the Tooltip local token contract mapping so its component vars stay aligned with the refreshed Seedly contracts.
- a5999cf: Update the Progress local token contract mapping so its component vars stay aligned with the refreshed Seedly contracts.
- 02001a7: Rename exported style class names to camelCase across Seedly styles and wrappers so the Base UI parity exports read consistently.
- cc33254: Update Grid contract mappings and wrapper behavior so layout tokens resolve consistently across Seedly and seedly-react.
- 8bac2e5: Update the ScrollArea local token contract mapping so its component vars stay aligned with the refreshed Seedly contracts.
- 3e5f60e: Refresh the shared floating-surface and control contracts so interactive Seedly components inherit more consistent local token behavior.
- 8694b7b: Update Sidebar contract mappings and wrapper behavior so responsive sidebar tokens resolve consistently across both packages.
- d0e5229: Update the PreviewCard local token contract mapping so its component vars stay aligned with the refreshed Seedly contracts.
- f72a4a5: Refresh layout contract mappings for Box and Container and align their wrappers with the updated responsive layout tokens.
- 7dc18d9: Migrate Kalink app usage onto seedly-react primitives and wrappers so downstream app integration matches the published component APIs.
- 3211078: Update the Autocomplete local token contract mapping so its component vars stay aligned with the refreshed Seedly contracts.
- e95e2ab: Unify backdrop surface blur and alpha handling so overlays share a more consistent visual treatment.
- 7d725e8: Route component transitions through a shared helper so motion tokens stay consistent across Seedly components.
- a10cdc9: Migrate Seedly styles to atomic layers so shared tokens and component rules compose with more predictable cascade behavior.
- 1cbe0f4: Update the Label local token contract mapping so its component vars stay aligned with the refreshed Seedly contracts.
- ed65c46: Update the Cluster local token contract mapping so its component vars stay aligned with the refreshed Seedly contracts.
- 919c363: Update the Popover local token contract mapping so its component vars stay aligned with the refreshed Seedly contracts.
- 3df6d8f: Update the Form local token contract mapping so its component vars stay aligned with the refreshed Seedly contracts.
- fabfefc: Update Cover contract mappings and the React wrapper so layout tokens map consistently through the refreshed contracts.
- 01ca9b1: Update the NumberField local token contract mapping so its component vars stay aligned with the refreshed Seedly contracts.
- 43c07d5: Update the Checkbox local token contract mapping so its component vars stay aligned with the refreshed Seedly contracts.
- bacf5bd: Update the Combobox local token contract mapping so its component vars stay aligned with the refreshed Seedly contracts.
- 2ac6363: Prepare the Seedly foundation for the component contract refactor by consolidating shared contract and wrapper assumptions.
- 5f7c10e: Update the Field local token contract mapping so its component vars stay aligned with the refreshed Seedly contracts.
- 18e0608: Update Menu and ContextMenu contract mappings so shared popup menu primitives resolve local tokens consistently.
- 699402d: Update the Meter local token contract mapping so its component vars stay aligned with the refreshed Seedly contracts.
- 887577f: Update the Accordion local token contract mapping so its component vars stay aligned with the refreshed Seedly contracts.
- 9f0efcc: Update the ToggleGroup local token contract mapping so its component vars stay aligned with the refreshed Seedly contracts.
- 31bbc78: Apply small visual enhancements across interactive primitives and stories to improve polish and alignment.
- 7ee323a: Update the Frame local token contract mapping so its component vars stay aligned with the refreshed Seedly contracts.
- 6733dbd: Update Toolbar contract mappings and shared bar primitives so toolbar wrappers stay aligned with the refreshed local tokens.
- 2c80d0d: Restore listbox item indicator layout and spacing so Select and Combobox items align correctly again.
- f9508dd: Update the NavigationMenu local token contract mapping so its component vars stay aligned with the refreshed Seedly contracts.
- fb41ad4: Move typography primitives into slot wrappers so titles, descriptions, and related text slots compose more consistently.
- 162e10f: Update the Dialog local token contract mapping so its component vars stay aligned with the refreshed Seedly contracts.
- fb24c3c: Align Radio composition with the CheckboxGroup structure by introducing a matching radio-group primitive and wrapper shape.
- 470bb48: Update the Tabs local token contract mapping so its component vars stay aligned with the refreshed Seedly contracts.
- 47ebf74: Update the Input local token contract mapping so its component vars stay aligned with the refreshed Seedly contracts.
- e945f91: Reexport component theme contract vars to enable overrides.
- 7a137da: Update the Stack local token contract mapping so its component vars stay aligned with the refreshed Seedly contracts.
- 0a67e74: Update the Slider local token contract mapping so its component vars stay aligned with the refreshed Seedly contracts.
- f2dfe73: Update the Collapsible local token contract mapping so its component vars stay aligned with the refreshed Seedly contracts.
- 4ab7ac9: Polish PreviewCard story composition and supporting styles so demos better reflect the intended component presentation.
- 298cd93: Update the Button local token contract mapping so its component vars stay aligned with the refreshed Seedly contracts.
- 86e76ca: Update the Select local token contract mapping so listbox surfaces and selection tokens stay aligned with the refreshed Seedly contracts.
- 1a40232: Increase Select item inline padding so indicator spacing matches Combobox options more closely.
- 5585550: Improve toolbar composition and Select trigger sizing so controls align more cleanly in complex toolbars.
- 168f4d9: Normalize floating surface and collection styling so popup-based components share the same surface treatment and spacing.
- 5490c6e: Scope Seedly component styles to the components layer so style ordering stays predictable across the design system.
- cd930e9: Refactor Seedly component style modules to replace broad `globalStyle` usage with local vanilla-extract `selectors`, keeping globals only for reset and `:root` theme definitions.

  Preserve existing component behavior while making selector ownership explicit and easier to maintain across Base UI parity styles.

- 928ecde: Shift the Seedly spacing scale to add finer low-end steps (`spacing[4] = 0.5rem`) and remap token references to preserve existing rendered spacing.

  Adopt logical sizing properties and `@vanilla-extract/css-utils` calc helpers for overlay offsets and composed sizing expressions, and add `@vanilla-extract/css-utils` as a Seedly dependency.

- 89cc8dc: Add a responsive argType helper and refine typography story controls.
- 64d577b: Backport the previous system-contract styling approach by restoring full `sys` theme assignments, shared style helpers, and component-level vars contracts across Seedly Base UI parity styles.

  Align portal-rendered popups and field controls so token vars are always defined (including popover/tooltip and combobox action buttons), and update Storybook backgrounds for clearer light/dark previews.

- eae06e2: Align surface and tone token usage with the updated theme contract.
- e037828: Use Seedly wrapper components consistently in stories and remove redundant story-level className props that wrappers already provide.
  Add `Radio.Group` in `seedly-react` and tune dark-mode contrast for toggle-group, toolbar, and dialog overlays.
