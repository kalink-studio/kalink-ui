import { keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { sys } from '../../styles';
import { components } from '../../styles/layers.css';

const enterAnimation = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translate(-50%, -50%) scale(0.95)',
  },
  '100%': {
    opacity: 1,
    transform: 'translate(-50%, -50%) scale(1)',
  },
});

const exitAnimation = keyframes({
  '0%': {
    opacity: 1,
    transform: 'translate(-50%, -50%) scale(1)',
  },
  '100%': {
    opacity: 0,
    transform: 'translate(-50%, -50%) scale(0.95)',
  },
});

export const alertDialogContentRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        zIndex: 50,
        width: '100%',

        position: 'fixed',
        left: '50%',
        top: '50%',

        transform: 'translate(-50%, -50%)',
        animationDuration: sys.motion.duration.medium[1],
        animationTimingFunction: sys.motion.easing.standard,

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
    variant: {
      dialog: {
        '@layer': {
          [components]: {
            maxWidth: '30rem',
          },
        },
      },
      modal: {
        '@layer': {
          [components]: {
            maxInlineSize: 'max-content',
          },
        },
      },
    },
  },

  defaultVariants: {
    variant: 'dialog',
  },
});
