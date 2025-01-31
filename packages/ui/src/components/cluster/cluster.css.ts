import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';
import { mapContractVars } from '@/utils/map-contract-vars';

export const clusterRecipe = recipe({
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  variants: {
    spacing: mapContractVars(vars.spacing, (key) => ({
      gap: vars.spacing[key],
    })),

    justify: {
      start: {
        justifyContent: 'flex-start',
      },
      end: {
        justifyContent: 'flex-end',
      },
      center: {
        justifyContent: 'center',
      },
      spaceBetween: {
        justifyContent: 'space-between',
      },
      spaceAround: {
        justifyContent: 'space-around',
      },
      spaceEvenly: {
        justifyContent: 'space-evenly',
      },
    },

    align: {
      start: {
        alignItems: 'flex-start',
      },
      end: {
        alignItems: 'flex-end',
      },
      center: {
        alignItems: 'center',
      },
      stretch: {
        alignItems: 'stretch',
      },
      baseline: {
        alignItems: 'baseline',
      },
    },
  },
});

export type ClusterVariants = NonNullable<RecipeVariants<typeof clusterRecipe>>;
