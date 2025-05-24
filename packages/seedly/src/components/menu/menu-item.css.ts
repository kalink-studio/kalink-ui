import { style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { sys, typography } from '../../styles';

export const menuItem = recipe({
  base: [
    typography.body.medium,
    {
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

      selectors: {
        '&[data-disabled="true"], &[aria-disabled="true"]': {
          pointerEvents: 'none',
          opacity: 0.5,
        },

        '&:before': {
          content: '""',

          width: '100%',
          height: '100%',

          position: 'absolute',
          top: 0,
          left: 0,

          backgroundColor: sys.color.foreground,
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
  ],

  variants: {
    inset: {
      true: {
        paddingInlineStart: sys.spacing[4],
      },
    },
  },
});

export const menuItemIcon = style({
  color: sys.color.foreground,
});

export type MenuItemVariants = NonNullable<RecipeVariants<typeof menuItem>>;
