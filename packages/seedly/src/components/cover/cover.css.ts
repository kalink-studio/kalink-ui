import {
  assignVars,
  createThemeContract,
  globalStyle,
} from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import {
  createResponsiveVariants,
  defaultMedia,
  mapContractVars,
  sys,
} from '../../styles';
import { components } from '../../styles/layers.css';

export const coverVars = createThemeContract({
  spacing: {
    block: null,
  },
  layout: {
    minBlockSize: null,
  },
});

const coverSpacingDefaults = assignVars(coverVars.spacing, {
  block: sys.spacing[0],
});

const coverLayoutDefaults = assignVars(coverVars.layout, {
  minBlockSize: '100vh',
});

// Shared variant style maps so we can reuse them for responsive overrides
export const coverSpacingStyles = mapContractVars(sys.spacing, (key) => ({
  '@layer': {
    [components]: {
      vars: {
        ...assignVars(coverVars.spacing, {
          block: sys.spacing[key],
        }),
      },
    },
  },
}));

export const coverRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        display: 'flex',
        flexDirection: 'column',

        minBlockSize: coverVars.layout.minBlockSize,

        vars: {
          ...coverSpacingDefaults,
          ...coverLayoutDefaults,
        },
      },
    },
  },

  variants: {
    /**
     * The spacing between items
     */
    spacing: coverSpacingStyles,
  },
});

globalStyle(`${coverRecipe.classNames.base} > *`, {
  '@layer': {
    [components]: {
      marginBlock: coverVars.spacing.block,
    },
  },
});

globalStyle(
  `${coverRecipe.classNames.base} > :first-child:not([data-cover-center])`,
  {
    '@layer': {
      [components]: {
        marginBlockStart: 0,
      },
    },
  },
);

globalStyle(
  `${coverRecipe.classNames.base} > :last-child:not([data-cover-center])`,
  {
    '@layer': {
      [components]: {
        marginBlockEnd: 0,
      },
    },
  },
);

globalStyle(`${coverRecipe.classNames.base} > [data-cover-center]`, {
  '@layer': {
    [components]: {
      marginBlock: 'auto',
    },
  },
});

export type CoverVariants = NonNullable<RecipeVariants<typeof coverRecipe>>;

export const spacingAt = createResponsiveVariants({
  styles: coverSpacingStyles,
  media: defaultMedia,
});
