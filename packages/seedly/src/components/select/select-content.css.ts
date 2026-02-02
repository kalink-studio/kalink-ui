import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { createToneStyles, sys } from '../../styles';
import { components } from '../../styles/layers.css';

export const selectContentVars = createThemeContract({
  color: {
    background: null,
  },
});

const selectContentToneVars = createThemeContract({
  base: null,
  onBase: null,
});

const selectContentToneStyles = createToneStyles(
  selectContentToneVars,
  ({ base }) => ({
    [selectContentVars.color.background]: base,
  }),
);

export const selectContentRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        backgroundColor: selectContentVars.color.background,

        vars: {
          ...assignVars(selectContentVars.color, {
            background: sys.color.container.base,
          }),
        },
      },
    },
  },

  variants: {
    tone: selectContentToneStyles,
  },
});

export const selectContentViewport = style({
  '@layer': {
    [components]: {
      height: 'auto',
      maxHeight: 'var(--radix-select-content-available-height)',
      minWidth: 'var(--radix-select-trigger-width)',
    },
  },
});

export type SelectContentVariants = NonNullable<
  RecipeVariants<typeof selectContentRecipe>
>;
