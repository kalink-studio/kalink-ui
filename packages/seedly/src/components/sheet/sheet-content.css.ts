import { createVar, keyframes } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { mapContractVars, sys } from '../../styles';
import { components } from '../../styles/layers.css';

const from = createVar();
const to = createVar();
const size = createVar();

const enter = keyframes({
  '0%': {
    transform: from,
  },

  '100%': {
    transform: to,
  },
});

const leave = keyframes({
  '0%': {
    transform: to,
  },

  '100%': {
    transform: from,
  },
});

export const sheetContentRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        display: 'flex',
        flexDirection: 'column',

        zIndex: 50,
        maxWidth: '100vw',
        maxHeight: '100vh',

        position: 'fixed',

        boxShadow: sys.elevation.high,

        animationDuration: sys.motion.duration.medium[2],
        animationTimingFunction: sys.motion.easing.standard,
        animationFillMode: 'both',

        selectors: {
          '&[data-state="open"]': {
            animationName: enter,

            pointerEvents: 'auto',
          },

          '&[data-state="closed"]': {
            animationName: leave,

            pointerEvents: 'none',
          },
        },
      },
    },
  },

  variants: {
    side: {
      top: {
        '@layer': {
          [components]: {
            height: size,
            width: '100vw',

            insetBlockStart: 0,
            insetInline: 0,

            vars: {
              [from]: 'translateY(-100%)',
              [to]: 'translateY(0)',
            },
          },
        },
      },
      right: {
        '@layer': {
          [components]: {
            height: '100vh',
            width: size,

            insetBlock: 0,
            insetInlineEnd: 0,

            vars: {
              [from]: 'translateX(100%)',
              [to]: 'translateX(0)',
            },
          },
        },
      },
      bottom: {
        '@layer': {
          [components]: {
            height: size,
            width: '100vw',

            insetBlockEnd: 0,
            insetInline: 0,

            vars: {
              [from]: 'translateY(100%)',
              [to]: 'translateY(0)',
            },
          },
        },
      },
      left: {
        '@layer': {
          [components]: {
            height: '100vh',
            width: size,

            insetBlock: 0,
            insetInlineStart: 0,

            vars: {
              [from]: 'translateX(-100%)',
              [to]: 'translateX(0)',
            },
          },
        },
      },
    },

    size: {
      sm: {
        '@layer': {
          [components]: {
            vars: {
              [size]: '300px',
            },
          },
        },
      },
      base: {
        '@layer': {
          [components]: {
            vars: {
              [size]: '400px',
            },
          },
        },
      },
      md: {
        '@layer': {
          [components]: {
            vars: {
              [size]: '500px',
            },
          },
        },
      },
      lg: {
        '@layer': {
          [components]: {
            vars: {
              [size]: '600px',
            },
          },
        },
      },
    },

    spacing: mapContractVars(sys.spacing, (key) => ({
      '@layer': {
        [components]: {
          gap: sys.spacing[key],
        },
      },
    })),
  },

  defaultVariants: {
    side: 'right',
    size: 'base',
  },
});

export type SheetContentVariants = NonNullable<
  RecipeVariants<typeof sheetContentRecipe>
>;
