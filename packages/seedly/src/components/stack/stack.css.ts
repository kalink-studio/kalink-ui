import { createVar } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { sys, mapContractVars } from '../../styles';
import { components } from '../../styles/layers.css';

const spacing = createVar({
  syntax: '<length>',
  initialValue: sys.spacing['0'],
  inherits: false,
});

export const stackRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: spacing,
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
            [spacing]: sys.spacing[key],
          },
        },
      },
    })),

    align: {
      start: {
        '@layer': {
          [components]: {
            alignItems: 'flex-start',
          },
        },
      },
      center: {
        '@layer': {
          [components]: {
            alignItems: 'center',
          },
        },
      },
      end: {
        '@layer': {
          [components]: {
            alignItems: 'flex-end',
          },
        },
      },
      stretch: {
        '@layer': {
          [components]: {
            alignItems: 'stretch',
          },
        },
      },
    },
  },
});

export type StackVariants = NonNullable<RecipeVariants<typeof stackRecipe>>;
