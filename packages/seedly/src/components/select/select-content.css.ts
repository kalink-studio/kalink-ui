import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { createToneStyles, sys } from '../../styles';
import { components } from '../../styles/layers.css';

const selectContentVars = createThemeContract({
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
  ({ base }, tone) => ({
    [selectContentVars.color.background]:
      tone === 'neutral'
        ? sys.surface.background
        : `color-mix(in srgb, ${base} calc(${sys.state.muted.surface} * 100%), ${sys.surface.background})`,
  }),
);

export const selectContentRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        backgroundColor: selectContentVars.color.background,

        vars: {
          ...assignVars(selectContentVars.color, {
            background: sys.surface.background,
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
