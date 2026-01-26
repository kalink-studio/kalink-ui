import { createVar, keyframes } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { mapContractVars, sys } from '../../styles';
import { components } from '../../styles/layers.css';

const translateX = createVar();
const offsetX = createVar();
const translateY = createVar();
const offsetY = createVar();
const scale = createVar();

const enter = keyframes({
  '100%': {
    opacity: 1,
    transform: `translateX(${offsetX}) translateY(${offsetY})`,
    pointerEvents: 'auto',
  },
});

const leave = keyframes({
  '0%': {
    opacity: 1,
    transform: `translateX(${offsetX}) translateY(${offsetY})`,
    pointerEvents: 'auto',
  },
});

export const popoverContentRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        animationDuration: sys.motion.duration.short[2],
        animationTimingFunction: sys.motion.easing.standard,
        animationFillMode: 'forwards',

        opacity: 0,
        transform: `translate3d(${translateX}, ${translateY}, 0) scale3d(${scale}, ${scale}, ${scale})`,

        selectors: {
          '&[data-state="open"]': {
            animationName: enter,
          },

          '&[data-state="closed"]': {
            animationName: leave,
          },

          '&[data-side*="top"]': {
            vars: {
              [translateY]: sys.spacing[2],
              [offsetY]: calc.negate(sys.spacing[1]),
            },
          },

          '&[data-side*="right"]': {
            vars: {
              [translateX]: calc.negate(sys.spacing[1]),
              [offsetX]: sys.spacing[2],
            },
          },

          '&[data-side*="bottom"]': {
            vars: {
              [translateY]: calc.negate(sys.spacing[1]),
              [offsetY]: sys.spacing[2],
            },
          },

          '&[data-side*="left"]': {
            vars: {
              [translateX]: sys.spacing[3],
              [offsetY]: calc.negate(sys.spacing[1]),
            },
          },
        },

        vars: {
          [translateX]: '0',
          [translateY]: '0',
          [offsetX]: '0',
          [offsetY]: '0',
          [scale]: '0.98',
          '--popover-trigger-width': 'var(--radix-popover-trigger-width)',
        },
      },
    },
  },

  variants: {
    width: {
      trigger: {
        '@layer': {
          [components]: {
            minWidth: 'var(--popover-trigger-width)',
          },
        },
      },
    },

    scrollable: {
      true: {
        '@layer': {
          [components]: {
            overflow: 'hidden',
          },
        },
      },
    },

    elevation: mapContractVars(sys.elevation, (key) => ({
      '@layer': {
        [components]: {
          boxShadow: sys.elevation[key],
        },
      },
    })),
  },
});

export type PopoverContentVariants = NonNullable<
  RecipeVariants<typeof popoverContentRecipe>
>;
