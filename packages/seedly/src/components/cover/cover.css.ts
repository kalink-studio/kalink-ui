import {
  assignVars,
  createThemeContract,
  globalStyle,
} from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { mapContractVars, sys } from '../../styles';
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

export const coverSpacingStyles = mapContractVars(
  sys.spacing,
  coverVars.spacing,
);

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
