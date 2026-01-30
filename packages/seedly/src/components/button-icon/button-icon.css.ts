import { assignVars } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { createResponsiveVariants, defaultMedia, sys } from '../../styles';
import { overrides } from '../../styles/layers.css';
import {
  buttonRecipe,
  buttonVars,
  buttonVariantStyles,
} from '../button/button.css';

const buttonIconSizeOverrides = {
  sm: {
    '@layer': {
      [overrides]: {
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
      [overrides]: {
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
      [overrides]: {
        vars: assignVars(buttonVars.spacing, {
          block: sys.spacing[3],
          inline: sys.spacing[3],
          inner: sys.spacing[3],
        }),
      },
    },
  },
} as const;

const buttonIconSizeStyles = {
  sm: [buttonRecipe.classNames.variants.size.sm, buttonIconSizeOverrides.sm],
  md: [buttonRecipe.classNames.variants.size.md, buttonIconSizeOverrides.md],
  lg: [buttonRecipe.classNames.variants.size.lg, buttonIconSizeOverrides.lg],
};

export const buttonIconRecipe = recipe({
  base: [buttonRecipe.classNames.base],

  variants: {
    variant: buttonRecipe.classNames.variants.variant,
    size: buttonIconSizeStyles,
  },

  defaultVariants: {
    variant: 'ghost',
    size: 'md',
  },
});

export type ButtonIconVariants = NonNullable<
  RecipeVariants<typeof buttonIconRecipe>
>;

export const sizeAt = createResponsiveVariants({
  styles: buttonIconSizeOverrides,
  media: defaultMedia,
});

export const variantAt = createResponsiveVariants({
  styles: buttonVariantStyles,
  media: defaultMedia,
});
