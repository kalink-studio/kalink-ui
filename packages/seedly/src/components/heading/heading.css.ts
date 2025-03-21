import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

export const headingRecipe = recipe({});

export type HeadingVariants = NonNullable<RecipeVariants<typeof headingRecipe>>;
