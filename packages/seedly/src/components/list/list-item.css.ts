import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { layouts } from '../../styles/layers.css';

export const listItemRecipe = recipe({
  base: {
    '@layer': {
      [layouts]: {},
    },
  },
});

export type ListItemVariants = NonNullable<
  RecipeVariants<typeof listItemRecipe>
>;
