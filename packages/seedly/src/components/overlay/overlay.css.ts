import { keyframes, style } from '@vanilla-extract/css';

import { sys } from '../../styles';
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

export const overlay = style({
  '@layer': {
    [components]: {
      zIndex: 50,

      position: 'fixed',
      inset: 0,

      backgroundColor: `color-mix(in srgb, ${sys.surface.background} 50%, transparent)`,

      animationDuration: sys.motion.duration.medium[2],
      animationTimingFunction: sys.motion.easing.standard,
      backdropFilter: 'blur(4px)',

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
});
