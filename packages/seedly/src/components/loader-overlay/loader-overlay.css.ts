import {
  assignVars,
  createThemeContract,
  keyframes,
} from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { createToneStyles, sys } from '../../styles';
import { components } from '../../styles/layers.css';

const fadeIn = keyframes({
  '0%': { opacity: 0, transform: 'scale(0.95)' },
  '100%': { opacity: 1, transform: 'scale(1)' },
});

const loaderOverlayToneVars = createThemeContract({
  base: null,
  onBase: null,
});

const loaderOverlayToneDefaults = assignVars(loaderOverlayToneVars, {
  base: sys.color.content.base,
  onBase: sys.color.content.base,
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
        animationName: fadeIn,
        animationDuration: sys.motion.duration.medium[1],
        animationTimingFunction: sys.motion.easing.decelerate.standard,
        animationFillMode: 'both',
        willChange: 'transform, opacity',
        '@media': {
          '(prefers-reduced-motion: reduce)': {
            animation: 'none',
          },
        },
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
