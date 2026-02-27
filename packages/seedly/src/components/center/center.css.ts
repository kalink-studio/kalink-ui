import { assignVars, createThemeContract } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import {
  createResponsiveVariants,
  defaultMedia,
  mapContractVars,
  sys,
} from '../../styles';
import { components } from '../../styles/layers.css';

export const centerVars = createThemeContract({
  layout: {
    rootMeasure: null,
  },
  spacing: {
    rootGutters: null,
  },
});

const centerDefaults = assignVars(centerVars, {
  layout: {
    rootMeasure: sys.layout.measure,
  },
  spacing: {
    rootGutters: sys.spacing[0],
  },
});

export const centerGuttersStyles = mapContractVars(
  sys.spacing,
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
        vars: centerDefaults,

        display: 'block',

        boxSizing: 'content-box',
        marginInline: 'auto',
        maxInlineSize: centerVars.layout.rootMeasure,
        paddingInline: centerVars.spacing.rootGutters,
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

export const andTextAt = createResponsiveVariants({
  styles: centerAndTextStyles,
  media: defaultMedia,
});

export const intrinsicAt = createResponsiveVariants({
  styles: centerIntrinsicStyles,
  media: defaultMedia,
});
