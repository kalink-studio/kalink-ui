import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { typography } from '../../styles';

export const labelRecipe = recipe({
  variants: {
    variant: {
      field: typography.label.medium,
      choice: typography.body.large,
      caption: typography.label.large,
    },
  },

  defaultVariants: {
    variant: 'field',
  },
});

export type LabelVariants = NonNullable<RecipeVariants<typeof labelRecipe>>;
