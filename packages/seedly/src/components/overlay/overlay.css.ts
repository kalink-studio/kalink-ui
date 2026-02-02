import {
  assignVars,
  createThemeContract,
  keyframes,
} from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { createToneStyles, sys } from '../../styles';
import { components } from '../../styles/layers.css';

const enterAnimation = keyframes({
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

const exitAnimation = keyframes({
  '0%': {
    opacity: 1,
  },
  '100%': {
    opacity: 0,
  },
});

export const overlayVars = createThemeContract({
  color: {
    background: null,
  },
});

const overlayToneVars = createThemeContract({
  base: null,
  onBase: null,
});

const overlayToneStyles = createToneStyles(
  overlayToneVars,
  ({ base }, tone) => ({
    [overlayVars.color.background]:
      tone === 'neutral' ? sys.surface.background : base,
  }),
);

export const overlayRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        zIndex: 50,

        position: 'fixed',
        inset: 0,

        backgroundColor: `color-mix(in srgb, ${overlayVars.color.background} 50%, transparent)`,

        animationDuration: sys.motion.duration.medium[2],
        animationTimingFunction: sys.motion.easing.standard,
        backdropFilter: 'blur(4px)',

        vars: {
          ...assignVars(overlayVars.color, {
            background: sys.surface.background,
          }),
        },

        selectors: {
          '&[data-state="open"]': {
            animationName: enterAnimation,
          },
          '&[data-state="closed"]': {
            animationName: exitAnimation,
          },
        },
      },
    },
  },

  variants: {
    tone: overlayToneStyles,
  },
});

export const overlay = overlayRecipe();

export type OverlayVariants = NonNullable<RecipeVariants<typeof overlayRecipe>>;
