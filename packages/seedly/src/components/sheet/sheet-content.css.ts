import { createVar, keyframes } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { sys } from '../../styles';

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

export const sheetContent = recipe({
  base: {
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

  variants: {
    side: {
      top: {
        height: size,
        width: '100vw',

        insetBlockStart: 0,
        insetInline: 0,

        vars: {
          [from]: 'translateY(-100%)',
          [to]: 'translateY(0)',
        },
      },
      right: {
        height: '100vh',
        width: size,

        insetBlock: 0,
        insetInlineEnd: 0,

        vars: {
          [from]: 'translateX(100%)',
          [to]: 'translateX(0)',
        },
      },
      bottom: {
        height: size,
        width: '100vw',

        insetBlockEnd: 0,
        insetInline: 0,

        vars: {
          [from]: 'translateY(100%)',
          [to]: 'translateY(0)',
        },
      },
      left: {
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

    size: {
      sm: {
        vars: {
          [size]: '300px',
        },
      },
      base: {
        vars: {
          [size]: '400px',
        },
      },
      md: {
        vars: {
          [size]: '500px',
        },
      },
      lg: {
        vars: {
          [size]: '600px',
        },
      },
    },
  },

  defaultVariants: {
    side: 'right',
    size: 'base',
  },
});

export type SheetContentVariants = NonNullable<
  RecipeVariants<typeof sheetContent>
>;
