import { assignVars, createThemeContract } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { createResponsiveVariants, defaultMedia, sys } from '../../styles';
import { components } from '../../styles/layers.css';
import { createSpacingContractStyles } from '../layout/shared/spacing';

export const centerVars = createThemeContract({
  spacing: {
    gutters: null,
  },
  layout: {
    measure: null,
  },
});

const centerSpacingDefaults = assignVars(centerVars.spacing, {
  gutters: sys.spacing[0],
});

const centerLayoutDefaults = assignVars(centerVars.layout, {
  measure: sys.layout.measure,
});

export const centerGuttersStyles = createSpacingContractStyles(
  centerVars.spacing,
);

export const centerAndTextStyles = {
  true: {
    '@layer': {
      [components]: {
        textAlign: 'center',
      },
    },
  },
} as const;

export const centerIntrinsicStyles = {
  true: {
    '@layer': {
      [components]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
  },
} as const;

export const centerRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        display: 'block',
        boxSizing: 'content-box',
        marginInline: 'auto',
        maxInlineSize: centerVars.layout.measure,
        paddingInline: centerVars.spacing.gutters,

        vars: {
          ...centerSpacingDefaults,
          ...centerLayoutDefaults,
        },
      },
    },
  },

  variants: {
    andText: {
      ...centerAndTextStyles,
    },
    intrinsic: {
      ...centerIntrinsicStyles,
    },
    gutters: centerGuttersStyles,
  },
});

export type CenterVariants = NonNullable<RecipeVariants<typeof centerRecipe>>;

export const guttersAt = createResponsiveVariants({
  styles: centerGuttersStyles,
  media: defaultMedia,
});

export const andTextAt = createResponsiveVariants({
  styles: centerAndTextStyles,
  media: defaultMedia,
});

export const intrinsicAt = createResponsiveVariants({
  styles: centerIntrinsicStyles,
  media: defaultMedia,
});
