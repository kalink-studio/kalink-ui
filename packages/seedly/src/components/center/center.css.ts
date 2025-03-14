import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { components } from '../../styles/layers.css';
import { sys } from '../../styles/system-contract.css';
import { mapContractVars } from '../../utils/map-contract-vars';

export const centerRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        display: 'block',
        boxSizing: 'content-box',
        marginInline: 'auto',
        maxInlineSize: sys.layout.measure,
      },
    },
  },

  variants: {
    andText: {
      true: {
        '@layer': {
          [components]: {
            textAlign: 'center',
          },
        },
      },
    },

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

    gutters: mapContractVars(sys.spacing, (key) => ({
      '@layer': {
        [components]: {
          paddingInline: sys.spacing[key],
        },
      },
    })),
  },
});

export type CenterVariants = NonNullable<RecipeVariants<typeof centerRecipe>>;
