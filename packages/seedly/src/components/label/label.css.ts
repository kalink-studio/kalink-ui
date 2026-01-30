import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { typography } from '../../styles';
import { components } from '../../styles/layers.css';

export const labelRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        cursor: 'default',
      },
    },
  },

  variants: {
    disabled: {
      true: {
        '@layer': {
          [components]: {
            cursor: 'not-allowed',
          },
        },
      },
    },
    error: {
      true: {},
    },

    size: {
      sm: [typography.label.small],
      md: [typography.label.medium],
      lg: [typography.label.large],
    },
  },
});

export type LabelVariants = NonNullable<RecipeVariants<typeof labelRecipe>>;
