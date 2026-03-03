import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { components } from '../../styles/layers.css';

export const listItemRecipe = recipe({
  base: {
    '@layer': {
      [components]: {},
    },
  },
});

export type ListItemVariants = NonNullable<
  RecipeVariants<typeof listItemRecipe>
>;
