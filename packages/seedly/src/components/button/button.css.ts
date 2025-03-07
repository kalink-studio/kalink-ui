import { createTheme } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { sys } from '@/styles/system-contract.css';

export const [buttonTheme, buttonsys] = createTheme({
  color: {
    light: sys.color.foreground,
    dark: sys.color.background,
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
