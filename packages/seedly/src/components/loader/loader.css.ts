import { createVar, keyframes, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { sys, transition } from '../../styles';

export const loader = recipe({
  variants: {
    active: {
      true: {
        opacity: 1,
        visibility: 'visible',

        animationPlayState: 'running',
      },
      false: {
        opacity: 0,
        visibility: 'hidden',

        animationPlayState: 'paused',
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

export const loaderWrapper = recipe({
  base: {
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

  variants: {
    size: {
      sm: {
        vars: {
          [size]: sys.spacing[4],
        },
      },
      md: {
        vars: {
          [size]: sys.spacing[5],
        },
      },
      lg: {
        vars: {
          [size]: sys.spacing[6],
        },
      },
    },
  },
});

export const ellipse = style({
  width: size,
  height: size,

  position: 'absolute',
  insetBlockStart: 0,
  insetInlineStart: 0,

  borderRadius: '100%',
  borderWidth: moonSize,
  borderStyle: 'solid',
  borderColor: `color-mix(in srgb, ${sys.color.foreground} 30%, transparent)`,
});

export const moon = style({
  width: moonSize,
  height: moonSize,

  position: 'absolute',
  insetBlockStart: calc.subtract(
    calc.divide(size, 2),
    calc.divide(moonSize, 2),
  ),
  insetInlineStart: 0,

  backgroundColor: sys.color.foreground,

  borderRadius: '100%',
});

export type LoaderVariants = NonNullable<RecipeVariants<typeof loader>>;
export type MoonLoaderVariants = NonNullable<
  RecipeVariants<typeof loaderWrapper>
>;
