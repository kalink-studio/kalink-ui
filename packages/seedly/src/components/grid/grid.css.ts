import { createVar } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import {
  createResponsiveVariants,
  defaultMedia,
  sys,
  mapContractVars,
} from '../../styles';
import { components } from '../../styles/layers.css';

export const minSizeVar = createVar();

// Shared variant style maps so we can reuse them for responsive overrides
export const gridSpacingStyles = mapContractVars(sys.spacing, (key) => ({
  '@layer': {
    [components]: {
      gridGap: sys.spacing[key],
    },
  },
}));

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
    spacing: gridSpacingStyles,
  },
});

export type GridVariants = NonNullable<RecipeVariants<typeof gridRecipe>>;

export const spacingAt = createResponsiveVariants({
  styles: gridSpacingStyles,
  media: defaultMedia,
});
