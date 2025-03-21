import { style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

export const textRecipe = recipe({
  variants: {
    /**
     * If true, use an ellipsis when the text overflows the element.
     */
    ellipsis: {
      true: {
        display: 'inline-block',
        maxWidth: '100%',
        overflow: 'hidden',

        textOverflow: 'ellipsis',
      },
    },
  },
});

export const textEllipsisWrapper = style({
  whiteSpace: 'nowrap',
});

export type TextVariants = NonNullable<RecipeVariants<typeof textRecipe>>;
