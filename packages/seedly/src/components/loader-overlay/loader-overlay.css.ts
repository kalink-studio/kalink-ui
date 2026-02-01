import { assignVars, createThemeContract } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { createToneStyles, sys } from '../../styles';
import { components } from '../../styles/layers.css';

const loaderOverlayToneVars = createThemeContract({
  base: null,
  onBase: null,
});

const loaderOverlayToneDefaults = assignVars(loaderOverlayToneVars, {
  base: sys.surface.foreground,
  onBase: sys.surface.foreground,
});
const loaderOverlayToneStyles = createToneStyles(loaderOverlayToneVars);

export const loaderOverlayRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        height: '100%',
        width: '100%',

        zIndex: 1000,

        backgroundColor: `color-mix(in srgb, ${loaderOverlayToneVars.base} 5%, transparent)`,

        vars: {
          ...loaderOverlayToneDefaults,
        },
      },
    },
  },

  variants: {
    position: {
      absolute: {
        '@layer': {
          [components]: {
            position: 'absolute',
            top: 0,
            left: 0,
          },
        },
      },
      relative: {
        '@layer': {
          [components]: {
            position: 'relative',
          },
        },
      },
    },

    tone: loaderOverlayToneStyles,
  },
});

export type LoaderOverlayVariants = NonNullable<
  RecipeVariants<typeof loaderOverlayRecipe>
>;
