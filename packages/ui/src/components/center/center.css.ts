import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';
import { mapContractVars } from '@/utils/map-contract-vars';

export const centerRecipe = recipe({
  base: {
    display: 'block',
    boxSizing: 'content-box',
    marginInline: 'auto',
    maxInlineSize: vars.measure,
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

    gutters: mapContractVars(vars.spacing, (key) => ({
      paddingInline: vars.spacing[key],
    })),
  },
});

export type CenterVariants = NonNullable<RecipeVariants<typeof centerRecipe>>;
