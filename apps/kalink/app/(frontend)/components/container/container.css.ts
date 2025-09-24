import { style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';

const base = style({
  width: '100%',
  marginInline: 'auto',
  paddingInline: vars.ref.spacing.base,
  '@media': {
    'screen and (min-width: 568px)': {
      paddingInline: vars.ref.spacing.sm,
    },
    'screen and (min-width: 768px)': {
      paddingInline: vars.ref.spacing.md,
    },
    'screen and (min-width: 1024px)': {
      paddingInline: vars.ref.spacing.lg,
    },
    'screen and (min-width: 1280px)': {
      paddingInline: vars.ref.spacing.xl,
    },
  },
});

export const container = recipe({
  base,
  variants: {
    size: {
      xs: {
        maxWidth: vars.ref.screen.xs,
      },
      sm: {
        maxWidth: vars.ref.screen.sm,
      },
      md: {
        maxWidth: vars.ref.screen.md,
      },
      lg: {
        maxWidth: vars.ref.screen.lg,
      },
      xl: {
        maxWidth: vars.ref.screen.xl,
      },
      '2xl': {
        maxWidth: vars.ref.screen['2xl'],
      },
      '3xl': {
        maxWidth: vars.ref.screen['3xl'],
      },
    },
  },
  defaultVariants: {
    size: 'xl',
  },
});

export type ContainerVariants = RecipeVariants<typeof container>;
