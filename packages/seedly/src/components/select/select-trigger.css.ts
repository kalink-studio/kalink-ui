import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe } from '@vanilla-extract/recipes';

import { sys, transition } from '../../styles';
import { components } from '../../styles/layers.css';
import { inputAppearance } from '../input/input.css';

export const selectTrigger = style([
  inputAppearance({ tone: 'neutral' }),
  {
    '@layer': {
      [components]: {
        display: 'flex',
        alignItems: 'stretch',
        gap: sys.spacing[4],
        justifyContent: 'flex-start',

        ':before': {
          content: '\x00',
          width: 0,
          overflow: 'hidden',
          marginInlineEnd: calc.negate(sys.spacing[4]),
        },
      },
    },
  },
]);

export const openIndicator = recipe({
  base: {
    '@layer': {
      [components]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: '1 / 1',
        marginInlineStart: 'auto',

        transition: transition(['transform'], {
          duration: 'short.2',
          easing: 'standard',
        }),

        selectors: {
          '[data-state="open"] &': {
            transform: 'rotate(180deg)',
          },
        },
      },
    },
  },

  variants: {
    fallback: {
      true: {
        '@layer': {
          [components]: {
            '::after': {
              content: '""',
              display: 'block',

              height: 12,
              width: 12,

              borderTop: `2px solid currentcolor`,
              borderRight: `2px solid currentcolor`,
              transform: 'rotate(135deg) translateX(-25%) translateY(25%)',
            },
          },
        },
      },
    },
  },
});
