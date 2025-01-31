import { createVar } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';
import { mapContractVars } from '@/utils/map-contract-vars';

export const minSizeVar = createVar();

export const gridRecipe = recipe({
  base: {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fill, minmax(min(${minSizeVar}, 100%), 1fr))`,

    vars: {
      [minSizeVar]: '250px',
    },
  },

  variants: {
    spacing: mapContractVars(vars.spacing, (key) => ({
      gridGap: vars.spacing[key],
    })),
  },
});

export type GridVariants = NonNullable<RecipeVariants<typeof gridRecipe>>;
