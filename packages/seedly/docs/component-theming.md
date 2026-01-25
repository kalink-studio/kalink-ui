# Component theming contract (internal)

This document defines the **target standard** for Seedly component theming. It is
intended for internal implementation guidance and will later be adapted for
external documentation.

## Principles

- **Vanilla Extract is mandatory**. Components must expose theming hooks as VE
  contracts, not runtime styles or plain CSS.
- **Semantic naming over CSS naming**. Use neutral, role-based semantics so the
  API describes intent instead of implementation details.
- **Structure and appearance are both tokenized**. Spacing, typography, shape,
  elevation, motion, and color/border/shadow must map to `sys` tokens and
  component vars.
- **Vars are the primary override surface**. Variants should only mutate vars,
  not hard-code raw values.
- **Slots are opt-in escape hatches**. Export slot classes when components have
  internal structure.
- **System tokens are the base**. Default component vars must map to `sys` tokens
  (or other component vars) before any literals.

## Contract naming rules

### Structure vs appearance

Structure (spacing, typography, shape, elevation, motion, layout) and appearance
(color, borders, shadows, emphasis) are **organizational categories only**. Both
must be expressed through system tokens and component vars so they are fully
overridable.

### System tokens

System tokens live in `sys` and are **semantic**: `sys.surface.background`,
`sys.state.hovered.opacity`, `sys.shape.corner.rounded`.

### Component contracts

Component contracts (`ComponentVars`) must stay semantic and scoped to the
component. Favor neutral, role-based terminology:

- `color.container` (surface background)
- `color.content` (text/icon color)
- `color.outline` (borders, focus ring)
- `shape.corner` (border radius)
- `elevation.level` (shadow)
- `spacing.inline` / `spacing.block` (layout spacing)
- `typography.kind` (font or style anchor if needed)

CSS-names are only allowed for leaf-level spacing/size values where the intent is
unambiguous.

## Variants

Variants are semantic and should only **assign vars**.

### Variant naming

- Preferred: `filled`, `outlined`, `text`, `elevated`, `tonal`.
- Allowed alternates: `ghost`, `plain`, `link` if a component requires them.
- Avoid: `primary`, `secondary` (these are **tones**, not visual treatments).

### Variant rules

- Variants set component vars via `assignVars` for both structure and appearance.
- Variants should not set hard-coded CSS values except for layout primitives
  (e.g., `display`, `gap`), and only when those are not intended for theming.

## Size and density

Size and density are separate axes:

- **Size** controls typography scale and overall component scale.
- **Density** controls padding and spacing.

### Naming

- **Size**: `sm`, `md`, `lg` (universal).
- **Density**: `compact`, `comfortable`, `spacious` (use only when necessary).

### Rules

- Size variants should assign typography and scale-related vars.
- Density variants should only assign spacing vars.
- Components can implement size only if density is not relevant.

## Export surface

Every component must export the following, when applicable:

- `ComponentVars` contract (e.g. `buttonVars`).
- `componentRecipe` and `ComponentVariants` type.
- Slot classes (e.g. `buttonLabel`, `buttonSlot`) for structured components.
- Optional variant maps (`componentVariantStyles`, `componentSizeStyles`) when
  responsive recipes or overrides are needed.

## Canonical component template

```ts
import { assignVars, createThemeContract } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { sys } from '../../styles';
import { components } from '../../styles/layers.css';

export const componentVars = createThemeContract({
  color: {
    container: null,
    content: null,
    outline: null,
  },
  spacing: {
    block: null,
    inline: null,
  },
  shape: {
    corner: null,
  },
  typography: {
    size: null,
    weight: null,
    lineHeight: null,
  },
});

export const componentVariantStyles = {
  filled: {
    '@layer': {
      [components]: {
        vars: {
          ...assignVars(componentVars.color, {
            container: sys.surface.foreground,
            content: sys.surface.background,
            outline: 'transparent',
          }),
        },
      },
    },
  },
  outlined: {
    '@layer': {
      [components]: {
        vars: {
          ...assignVars(componentVars.color, {
            container: 'transparent',
            content: sys.surface.foreground,
            outline: sys.surface.foreground,
          }),
        },
      },
    },
  },
} as const;

export const componentSizeStyles = {
  sm: {
    '@layer': {
      [components]: {
        vars: assignVars(componentVars.spacing, {
          block: sys.spacing[1],
          inline: sys.spacing[2],
        }),
      },
    },
  },
  md: {
    '@layer': {
      [components]: {
        vars: assignVars(componentVars.spacing, {
          block: sys.spacing[2],
          inline: sys.spacing[4],
        }),
      },
    },
  },
  lg: {
    '@layer': {
      [components]: {
        vars: assignVars(componentVars.spacing, {
          block: sys.spacing[3],
          inline: sys.spacing[6],
        }),
      },
    },
  },
} as const;

export const componentRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        color: componentVars.color.content,
        backgroundColor: componentVars.color.container,
        borderColor: componentVars.color.outline,
        borderRadius: componentVars.shape.corner,
        paddingBlock: componentVars.spacing.block,
        paddingInline: componentVars.spacing.inline,
        fontSize: componentVars.typography.size,
        fontWeight: componentVars.typography.weight,
        lineHeight: componentVars.typography.lineHeight,

        vars: {
          ...assignVars(componentVars.color, {
            container: sys.surface.background,
            content: sys.surface.foreground,
            outline: 'transparent',
          }),
          ...assignVars(componentVars.spacing, {
            block: sys.spacing[2],
            inline: sys.spacing[4],
          }),
          ...assignVars(componentVars.shape, {
            corner: sys.shape.corner.none,
          }),
          ...assignVars(componentVars.typography, {
            size: sys.typography.body.medium.size,
            weight: sys.typography.body.medium.weight,
            lineHeight: sys.typography.body.medium.lineHeight,
          }),
        },
      },
    },
  },
  variants: {
    variant: componentVariantStyles,
    size: componentSizeStyles,
  },
  defaultVariants: {
    variant: 'filled',
    size: 'md',
  },
});

export type ComponentVariants = NonNullable<
  RecipeVariants<typeof componentRecipe>
>;
```

## Component example: Button

### Contract

Use semantic keys and map to system tokens by default:

- `buttonVars.color.container` → `sys.surface.foreground`
- `buttonVars.color.content` → `sys.surface.background`
- `buttonVars.color.outline` → `sys.surface.foreground`
- `buttonVars.spacing.block` / `inline` → `sys.spacing`
- `buttonVars.shape.corner` → `sys.shape.corner`
- `buttonVars.elevation.level` → `sys.elevation`

### Variant strategy

- `filled`: container + content set via vars.
- `outlined`: outline set, container transparent.
- `text`: container transparent, no outline, hover uses state tokens.

### Size strategy

- `sm/md/lg` adjust typography + spacing vars.
- If density is introduced, keep size tied to typography and use density to
  adjust spacing only.

## Consumer override example

```ts
import { assignVars } from '@vanilla-extract/css';
import { buttonVars } from '@kalink-ui/seedly/button';

export const marketingButton = style({
  vars: assignVars(buttonVars, {
    color: {
      container: '#111',
      content: '#fff',
      outline: '#111',
    },
    spacing: {
      block: '10px',
      inline: '20px',
    },
    shape: {
      corner: '9999px',
    },
  }),
});
```

## Notes

- If a component does not need variants or slots, omit them. Do not add empty
  contracts or classes.
- If a component needs a tone system, model it as **data** (`tone` variant), but
  keep visual treatment in `variant` (`filled/outlined/text`).
- Structural overrides (spacing, typography, shape, elevation, motion) should be
  expressed through vars, not hard-coded values.
