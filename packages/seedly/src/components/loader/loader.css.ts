import { createVar, keyframes, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import {
  createResponsiveVariants,
  defaultMedia,
  sys,
  transition,
} from '../../styles';
import { components } from '../../styles/layers.css';

export const loaderRecipe = recipe({
  variants: {
    active: {
      true: {
        '@layer': {
          [components]: {
            opacity: 1,
            visibility: 'visible',

            animationPlayState: 'running',
          },
        },
      },
      false: {
        '@layer': {
          [components]: {
            opacity: 0,
            visibility: 'hidden',

            animationPlayState: 'paused',
          },
        },
      },
    },
  },
});

const size = createVar();
const moonSize = createVar();

const loaderAnimation = keyframes({
  '100%': {
    transform: 'rotate(360deg)',
  },
});

// Shared size variant styles for responsive overrides
const loaderWrapperSizeStyles = {
  sm: {
    '@layer': {
      [components]: {
        vars: {
          [size]: sys.spacing[4],
        },
      },
    },
  },
  md: {
    '@layer': {
      [components]: {
        vars: {
          [size]: sys.spacing[5],
        },
      },
    },
  },
  lg: {
    '@layer': {
      [components]: {
        vars: {
          [size]: sys.spacing[6],
        },
      },
    },
  },
} as const;

export const loaderWrapperRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        overflow: 'hidden',
        width: size,
        height: size,

        animationName: loaderAnimation,
        animationDuration: '1s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
        animationFillMode: 'forwards',

        transition: transition(['opacity', 'visibility']),
        pointerEvents: 'none',

        vars: {
          [moonSize]: calc.divide(size, 7),
        },
      },
    },
  },

  variants: {
    size: loaderWrapperSizeStyles,
  },

  defaultVariants: {
    size: 'md',
  },
});

export const ellipse = style({
  '@layer': {
    [components]: {
      width: size,
      height: size,

      position: 'absolute',
      insetBlockStart: 0,
      insetInlineStart: 0,

      borderRadius: '100%',
      borderWidth: moonSize,
      borderStyle: 'solid',
      borderColor: `color-mix(in srgb, ${sys.surface.foreground} 30%, transparent)`,
    },
  },
});

export const moon = style({
  '@layer': {
    [components]: {
      width: moonSize,
      height: moonSize,

      position: 'absolute',
      insetBlockStart: calc.subtract(
        calc.divide(size, 2),
        calc.divide(moonSize, 2),
      ),
      insetInlineStart: 0,

      backgroundColor: sys.surface.foreground,

      borderRadius: '100%',
    },
  },
});

export type LoaderVariants = NonNullable<RecipeVariants<typeof loaderRecipe>>;
export type MoonLoaderVariants = NonNullable<
  RecipeVariants<typeof loaderWrapperRecipe>
>;

export const sizeAt = createResponsiveVariants({
  styles: loaderWrapperSizeStyles,
  media: defaultMedia,
});
