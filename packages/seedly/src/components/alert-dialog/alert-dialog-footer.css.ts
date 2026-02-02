import { assignVars, createThemeContract } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { createToneStyles, sys } from '../../styles';
import { components } from '../../styles/layers.css';

export const alertDialogFooterVars = createThemeContract({
  color: {
    background: null,
  },
});

const alertDialogFooterToneVars = createThemeContract({
  base: null,
  onBase: null,
});

const alertDialogFooterToneStyles = createToneStyles(
  alertDialogFooterToneVars,
  ({ base }, tone) => ({
    [alertDialogFooterVars.color.background]:
      tone === 'neutral'
        ? sys.surface.background
        : `color-mix(in srgb, ${base} calc(${sys.state.muted.surface} * 100%), ${sys.surface.background})`,
  }),
);

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

              backgroundImage: `linear-gradient(to bottom, transparent, ${alertDialogFooterVars.color.background})`,
            },

            vars: {
              ...assignVars(alertDialogFooterVars.color, {
                background: sys.surface.background,
              }),
            },
          },
        },
      },
    },

    tone: alertDialogFooterToneStyles,
  },
});

export type AlertDialogFooterVariants = NonNullable<
  RecipeVariants<typeof alertDialogFooterRecipe>
>;
