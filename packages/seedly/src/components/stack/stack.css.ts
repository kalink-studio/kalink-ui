import { createVar, globalStyle } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { sys, mapContractVars } from '../../styles';
import { components } from '../../styles/layers.css';

const spacing = createVar();

export const stackRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
      },
    },
  },

  variants: {
    /**
     * Whether the stack spacing should be applied recursively
     */
    recursive: {
      true: {},
    },

    /**
     * The spacing between items
     */
    spacing: mapContractVars(sys.spacing, (key) => ({
      '@layer': {
        [components]: {
          vars: {
            [spacing]: sys.spacing[key],
          },
        },
      },
    })),
  },
});

globalStyle(
  `${stackRecipe.classNames.base} > * + *, ${stackRecipe.classNames.variants.recursive.true} * + *`,
  {
    '@layer': {
      [components]: {
        marginBlockStart: spacing,
      },
    },
  },
);

export type StackVariants = NonNullable<RecipeVariants<typeof stackRecipe>>;
