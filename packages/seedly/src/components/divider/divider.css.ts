import { assignVars, createThemeContract } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { createToneStyles, sys } from '../../styles';
import { components } from '../../styles/layers.css';

const dividerToneVars = createThemeContract({
  base: null,
  onBase: null,
});

const dividerToneDefaults = assignVars(dividerToneVars, {
  base: sys.surface.foreground,
  onBase: sys.surface.foreground,
});
const dividerToneStyles = createToneStyles(dividerToneVars);

export const dividerRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        height: 1,
        width: '100%',

        border: 'none',
        backgroundColor: dividerToneVars.base,

        vars: {
          ...dividerToneDefaults,
        },
      },
    },
  },

  variants: {
    tone: dividerToneStyles,
  },
});

export type DividerVariants = NonNullable<RecipeVariants<typeof dividerRecipe>>;
