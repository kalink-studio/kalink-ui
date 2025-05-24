import { assignVars, globalStyle } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { sys } from '../../styles';
import { components } from '../../styles/layers.css';
import { buttonRecipe, buttonVars } from '../button/button.css';

export const buttonIcon = recipe({
  base: [buttonRecipe.classNames.base],

  variants: {
    variant: buttonRecipe.classNames.variants.variant,
    size: {
      sm: {
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
      md: {
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
      lg: {
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
    },
  },

  defaultVariants: {
    variant: 'ghost',
    size: 'md',
  },
});

globalStyle(`${buttonIcon.classNames.variants.size.sm} > svg`, {
  width: calc.multiply(
    sys.typography.label.small.lineHeight,
    sys.typography.label.small.size,
  ),
  height: calc.multiply(
    sys.typography.label.small.lineHeight,
    sys.typography.label.small.size,
  ),
});

globalStyle(`${buttonIcon.classNames.variants.size.md} > svg`, {
  width: calc.multiply(
    sys.typography.label.medium.lineHeight,
    sys.typography.label.medium.size,
  ),
  height: calc.multiply(
    sys.typography.label.medium.lineHeight,
    sys.typography.label.medium.size,
  ),
});

globalStyle(`${buttonIcon.classNames.variants.size.lg} > svg`, {
  width: calc.multiply(
    sys.typography.label.large.lineHeight,
    sys.typography.label.large.size,
  ),
  height: calc.multiply(
    sys.typography.label.large.lineHeight,
    sys.typography.label.large.size,
  ),
});

export type ButtonIconVariants = NonNullable<RecipeVariants<typeof buttonIcon>>;
