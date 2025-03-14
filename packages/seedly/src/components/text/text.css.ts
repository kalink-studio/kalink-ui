import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

export const textRecipe = recipe({
  variants: {
    ellipsis: {
      true: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      },
    },
  },
});

export type TextVariants = NonNullable<RecipeVariants<typeof textRecipe>>;
