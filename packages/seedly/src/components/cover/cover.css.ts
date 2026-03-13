import {
  assignVars,
  createThemeContract,
  globalStyle,
} from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { mapContractVars, sys } from '../../styles';
import { layouts } from '../../styles/layers.css';

export const coverVars = createThemeContract({
  layout: {
    rootMinBlockSize: null,
  },
  spacing: {
    rootGap: null,
  },
});

const coverDefaults = assignVars(coverVars, {
  layout: {
    rootMinBlockSize: '100vh',
  },
  spacing: {
    rootGap: sys.spacing[0],
  },
});

export const coverSpacingStyles = mapContractVars(
  sys.spacing,
  coverVars.spacing,
  layouts,
);

export const coverRecipe = recipe({
  base: {
    '@layer': {
      [layouts]: {
        vars: coverDefaults,

        display: 'flex',
        flexDirection: 'column',

        minBlockSize: coverVars.layout.rootMinBlockSize,
      },
    },
  },

  variants: {
    spacing: coverSpacingStyles,
  },
});

globalStyle(`${coverRecipe.classNames.base} > *`, {
  '@layer': {
    [layouts]: {
      marginBlock: coverVars.spacing.rootGap,
    },
  },
});

globalStyle(
  `${coverRecipe.classNames.base} > :first-child:not([data-cover-center])`,
  {
    '@layer': {
      [layouts]: {
        marginBlockStart: 0,
      },
    },
  },
);

globalStyle(
  `${coverRecipe.classNames.base} > :last-child:not([data-cover-center])`,
  {
    '@layer': {
      [layouts]: {
        marginBlockEnd: 0,
      },
    },
  },
);

globalStyle(`${coverRecipe.classNames.base} > [data-cover-center]`, {
  '@layer': {
    [layouts]: {
      marginBlock: 'auto',
    },
  },
});

export type CoverVariants = NonNullable<RecipeVariants<typeof coverRecipe>>;
