import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { sys } from '@/styles/system-contract.css';
import { mapContractVars } from '@/utils/map-contract-vars';

export const centerRecipe = recipe({
  base: {
    display: 'block',
    boxSizing: 'content-box',
    marginInline: 'auto',
    maxInlineSize: sys.layout.measure,
  },

  variants: {
    andText: {
      true: {
        textAlign: 'center',
      },
    },

    intrinsic: {
      true: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
    },

    gutters: mapContractVars(sys.spacing, (key) => ({
      paddingInline: sys.spacing[key],
    })),
  },
});

export type CenterVariants = NonNullable<RecipeVariants<typeof centerRecipe>>;
