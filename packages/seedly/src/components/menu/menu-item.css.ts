import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { sys, typography } from '../../styles';
import { components } from '../../styles/layers.css';

export const menuItemVars = createThemeContract({
  color: {
    foreground: null,
    overlay: null,
  },
});

const menuItemToneVars = createThemeContract({
  base: null,
  onBase: null,
});

const menuItemColorDefaults = assignVars(menuItemVars.color, {
  foreground: sys.surface.foreground,
  overlay: sys.surface.foreground,
});

const menuToneStyles = {
  neutral: {
    '@layer': {
      [components]: {
        vars: {
          ...menuItemColorDefaults,
          [menuItemVars.color.foreground]: sys.tone.neutral,
          [menuItemVars.color.overlay]: sys.tone.neutral,
          ...assignVars(menuItemToneVars, {
            base: sys.tone.neutral,
            onBase: sys.tone.onNeutral,
          }),
        },
      },
    },
  },
  primary: {
    '@layer': {
      [components]: {
        vars: {
          ...menuItemColorDefaults,
          [menuItemVars.color.foreground]: sys.tone.primary,
          [menuItemVars.color.overlay]: sys.tone.primary,
          ...assignVars(menuItemToneVars, {
            base: sys.tone.primary,
            onBase: sys.tone.onPrimary,
          }),
        },
      },
    },
  },
  destructive: {
    '@layer': {
      [components]: {
        vars: {
          ...menuItemColorDefaults,
          [menuItemVars.color.foreground]: sys.tone.destructive,
          [menuItemVars.color.overlay]: sys.tone.destructive,
          ...assignVars(menuItemToneVars, {
            base: sys.tone.destructive,
            onBase: sys.tone.onDestructive,
          }),
        },
      },
    },
  },
  success: {
    '@layer': {
      [components]: {
        vars: {
          ...menuItemColorDefaults,
          [menuItemVars.color.foreground]: sys.tone.success,
          [menuItemVars.color.overlay]: sys.tone.success,
          ...assignVars(menuItemToneVars, {
            base: sys.tone.success,
            onBase: sys.tone.onSuccess,
          }),
        },
      },
    },
  },
} as const;

export const menuItem = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: sys.spacing[2],

    paddingInline: sys.spacing[2],
    paddingBlock: sys.spacing[1],
    width: '100%',

    position: 'relative',

    textAlign: 'start',

    borderRadius: sys.shape.corner.small,

    cursor: 'pointer',
    userSelect: 'none',

    vars: {
      ...menuItemColorDefaults,
      ...assignVars(menuItemToneVars, {
        base: sys.tone.neutral,
        onBase: sys.tone.onNeutral,
      }),
    },

    selectors: {
      '&[data-disabled="true"], &[aria-disabled="true"]': {
        pointerEvents: 'none',
        opacity: 0.6,
      },

      '&:before': {
        content: '""',

        width: '100%',
        height: '100%',

        position: 'absolute',
        top: 0,
        left: 0,

        backgroundColor: menuItemVars.color.overlay,
        opacity: 0,
        borderRadius: 'inherit',

        pointerEvents: 'none',
      },

      '&:hover::before': {
        opacity: sys.state.hovered.opacity,
      },

      '&:is(:focus, :focus-visible, [aria-selected="true"])': {
        outline: 'none',
      },

      '&:focus::before, &:focus-visible::before, &[aria-selected="true"]::before':
        {
          opacity: sys.state.focused.opacity,
        },
    },
  },

  variants: {
    size: {
      sm: typography.body.small,
      md: typography.body.medium,
      lg: typography.body.large,
    },
    inset: {
      true: {
        paddingInlineStart: sys.spacing[4],
      },
    },
    tone: menuToneStyles,
  },

  defaultVariants: {
    tone: 'neutral',
    size: 'md',
  },
});

export type MenuItemTone = keyof typeof menuToneStyles;

export const menuItemIcon = style({
  color: menuItemToneVars.onBase,
});

export type MenuItemVariants = NonNullable<RecipeVariants<typeof menuItem>>;
