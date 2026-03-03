import {
  assignVars,
  createThemeContract,
  createVar,
  keyframes,
  style,
} from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import {
  createResponsiveVariants,
  createToneStyles,
  defaultMedia,
  sys,
  transition,
} from '../../styles';
import { components } from '../../styles/layers.css';

const loaderToneVars = createThemeContract({
  base: null,
  onBase: null,
});

const loaderToneStyles = createToneStyles(loaderToneVars);

export const loaderRecipe = recipe({
  variants: {
    active: {
      true: {
        '@layer': {
          [components]: {
            opacity: 1,
            visibility: 'visible',
            animationPlayState: 'running',
            scale: 1,
          },
        },
      },
      false: {
        '@layer': {
          [components]: {
            opacity: 0,
            visibility: 'hidden',
            animationPlayState: 'paused',
            scale: 0.95,
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

const moonPulseAnimation = keyframes({
  '0%, 100%': {
    opacity: 1,
  },
  '50%': {
    opacity: 0.3,
  },
});

const loaderWrapperSizeStyles = {
  sm: {
    '@layer': {
      [components]: {
        vars: {
          [size]: sys.spacing[7],
        },
      },
    },
  },
  md: {
    '@layer': {
      [components]: {
        vars: {
          [size]: sys.spacing[9],
        },
      },
    },
  },
  lg: {
    '@layer': {
      [components]: {
        vars: {
          [size]: sys.spacing[11],
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
        willChange: 'transform, opacity, scale',
        '@media': {
          '(prefers-reduced-motion: reduce)': {
            animation: 'none',
            transition: 'none',
          },
        },
        transition: transition(['opacity', 'visibility', 'scale'], {
          easing: 'decelerate.standard',
        }),
        pointerEvents: 'none',
        vars: {
          [moonSize]: calc.divide(size, 7),
          ...assignVars(loaderToneVars, {
            base: sys.color.content.base,
            onBase: sys.color.content.base,
          }),
        },
      },
    },
  },
  variants: {
    size: loaderWrapperSizeStyles,
    tone: loaderToneStyles,
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
      borderColor: `color-mix(in srgb, ${loaderToneVars.base} 30%, transparent)`,
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
      backgroundColor: loaderToneVars.base,
      borderRadius: '100%',
      animationName: moonPulseAnimation,
      animationDuration: '1.33s' /* Dephased from the 1s rotation */,
      animationIterationCount: 'infinite',
      animationTimingFunction: 'ease-in-out',
      willChange: 'opacity',
      '@media': {
        '(prefers-reduced-motion: reduce)': {
          animation: 'none',
        },
      },
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
