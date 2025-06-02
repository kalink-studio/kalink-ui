import { assignVars } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { sys } from '../../styles';
import { components } from '../../styles/layers.css';
import { buttonRecipe, buttonVars } from '../button/button.css';

export const buttonIcon = recipe({
  base: [buttonRecipe.classNames.base],

  variants: {
    variant: buttonRecipe.classNames.variants.variant,
    size: {
      sm: [
        buttonRecipe.classNames.variants.size.sm,
        {
          '@layer': {
            [components]: {
              vars: assignVars(buttonVars.spacing, {
                block: sys.spacing[2],
                inline: sys.spacing[2],
                inner: sys.spacing[2],
              }),
            },
          },
        },
      ],
      md: [
        buttonRecipe.classNames.variants.size.md,
        {
          '@layer': {
            [components]: {
              vars: assignVars(buttonVars.spacing, {
                block: sys.spacing[2],
                inline: sys.spacing[2],
                inner: sys.spacing[2],
              }),
            },
          },
        },
      ],
      lg: [
        buttonRecipe.classNames.variants.size.lg,
        {
          '@layer': {
            [components]: {
              vars: assignVars(buttonVars.spacing, {
                block: sys.spacing[3],
                inline: sys.spacing[3],
                inner: sys.spacing[3],
              }),
            },
          },
        },
      ],
    },
  },

  defaultVariants: {
    variant: 'ghost',
    size: 'md',
  },
});

export type ButtonIconVariants = NonNullable<RecipeVariants<typeof buttonIcon>>;
