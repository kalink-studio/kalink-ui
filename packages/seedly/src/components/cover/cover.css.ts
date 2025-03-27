import { createVar, globalStyle } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { sys, mapContractVars } from '../../styles';
import { components } from '../../styles/layers.css';

const spaceVar = createVar();
export const minSizeVar = createVar();

export const coverRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        display: 'flex',
        flexDirection: 'column',

        minBlockSize: minSizeVar,

        vars: {
          [minSizeVar]: '100vh',
        },
      },
    },
  },

  variants: {
    /**
     * The spacing between items
     */
    spacing: mapContractVars(sys.spacing, (key) => ({
      '@layer': {
        [components]: {
          vars: {
            [spaceVar]: sys.spacing[key],
          },
        },
      },
    })),
  },
});

globalStyle(`${coverRecipe.classNames.base} > *`, {
  '@layer': {
    [components]: {
      marginBlock: spaceVar,
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
