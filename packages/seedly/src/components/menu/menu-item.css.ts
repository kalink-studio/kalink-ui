import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import {
  createToneAssignments,
  createToneStyles,
  sys,
  typography,
} from '../../styles';
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

const menuItemToneAssignments = createToneAssignments(menuItemToneVars);

const menuToneStyles = createToneStyles(menuItemToneVars, ({ base }) => ({
  ...menuItemColorDefaults,
  ...assignVars(menuItemVars.color, {
    foreground: base,
    overlay: base,
  }),
}));

export const menuItemRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
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
          ...menuItemToneAssignments.neutral,
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
        '@layer': {
          [components]: {
            paddingInlineStart: sys.spacing[4],
          },
        },
      },
    },
    tone: menuToneStyles,
  },

  defaultVariants: {
    tone: 'neutral',
    size: 'md',
  },
});

export const menuItemIcon = style({
  color: menuItemToneVars.onBase,
});

export type MenuItemVariants = NonNullable<
  RecipeVariants<typeof menuItemRecipe>
>;
