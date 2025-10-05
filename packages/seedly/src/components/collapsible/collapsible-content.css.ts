import { keyframes, style } from '@vanilla-extract/css';

import { sys } from '../../styles';
import { components } from '../../styles/layers.css';

const slideDown = keyframes({
  '0%': {
    height: 0,
    opacity: 0,
  },
  '100%': {
    height: 'var(--radix-collapsible-content-height)',
    opacity: 1,
  },
});

const slideUp = keyframes({
  '0%': {
    height: 'var(--radix-collapsible-content-height)',
    opacity: 1,
  },
  '100%': {
    height: 0,
    opacity: 0,
  },
});

export const collapsibleContent = style({
  '@layer': {
    [components]: {
      overflow: 'hidden',

      animationDuration: sys.motion.duration.medium[2],
      animationTimingFunction: sys.motion.easing.standard,
      animationFillMode: 'both',
      willChange: 'height',

      selectors: {
        '&[data-state="open"]': {
          animationName: slideDown,
        },
        '&[data-state="closed"]': {
          animationName: slideUp,
        },
      },
    },
  },
});
