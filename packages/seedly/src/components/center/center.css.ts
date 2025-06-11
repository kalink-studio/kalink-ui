import { createVar } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { mapContractVars, sys } from '../../styles';
import { components } from '../../styles/layers.css';

export const gutterSize = createVar();

export const centerRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        display: 'block',
        boxSizing: 'content-box',
        marginInline: 'auto',
        maxInlineSize: sys.layout.measure,
        paddingInline: gutterSize,
      },
    },
  },

  variants: {
    /**
     * Center align the text too with `text-align: center`
     */
    andText: {
      true: {
        '@layer': {
          [components]: {
            textAlign: 'center',
          },
        },
      },
    },

    /**
     * Center child elements based on their content width
     */
    intrinsic: {
      true: {
        '@layer': {
          [components]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          },
        },
      },
    },

    /**
     * The minimum space on either side of the content
     */
    gutters: mapContractVars(sys.spacing, (key) => ({
      '@layer': {
        [components]: {
          vars: {
            [gutterSize]: sys.spacing[key],
          },
        },
      },
    })),
  },
});

export type CenterVariants = NonNullable<RecipeVariants<typeof centerRecipe>>;
