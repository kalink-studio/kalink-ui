import { calc } from '@vanilla-extract/css-utils';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { sys } from '../../styles';
import { components } from '../../styles/layers.css';

export const alertDialogFooterRecipe = recipe({
  variants: {
    position: {
      sticky: {
        '@layer': {
          [components]: {
            '::before': {
              content: '""',

              display: 'block',
              width: '100%',
              height: sys.spacing[2],

              position: 'absolute',
              insetBlockStart: calc.negate(sys.spacing[2]),

              backgroundImage: `linear-gradient(to bottom, transparent, ${sys.surface.background})`,
            },
          },
        },
      },
    },
  },
});

export type AlertDialogFooterVariants = NonNullable<
  RecipeVariants<typeof alertDialogFooterRecipe>
>;
