import { createTheme } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { vars } from '@/styles';

export const [buttonTheme, buttonVars] = createTheme({
  color: {
    light: vars.color.light,
    dark: vars.color.dark,
  },
});

export const buttonRecipe = recipe({
  base: {
    padding: '0',

    backgroundColor: 'unset',
    border: 'unset',

    cursor: 'pointer',
  },
  variants: {
    variant: {
      bare: {},
      plain: {},
      outline: {},
      ghost: {},
      link: {},
    },
  },
});

export type ButtonVariants = NonNullable<RecipeVariants<typeof buttonRecipe>>;
