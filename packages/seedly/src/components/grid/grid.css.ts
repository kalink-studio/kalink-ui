import { createVar } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { sys, mapContractVars } from '../../styles';
import { components } from '../../styles/layers.css';

export const minSizeVar = createVar();

export const gridRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(min(${minSizeVar}, 100%), 1fr))`,

        vars: {
          [minSizeVar]: '250px',
        },
      },
    },
  },

  variants: {
    /**
     * The spacing between the grid cell
     */
    spacing: mapContractVars(sys.spacing, (key) => ({
      '@layer': {
        [components]: {
          gridGap: sys.spacing[key],
        },
      },
    })),
  },
});

export type GridVariants = NonNullable<RecipeVariants<typeof gridRecipe>>;
