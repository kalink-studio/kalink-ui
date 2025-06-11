import { createVar, style } from '@vanilla-extract/css';

import { sys, transition } from '../../styles';
import { components } from '../../styles/layers.css';

const outlineColor = createVar();

export const commandInputWrapper = style({
  '@layer': {
    [components]: {
      padding: sys.spacing[2],

      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: outlineColor,

      transition: transition(['border-color', 'box-shadow'], {
        duration: 'short.2',
      }),

      selectors: {
        '&:focus, &:focus-within, &:focus-visible': {
          boxShadow: 'unset',

          vars: {
            [outlineColor]: sys.color.foreground,
          },
        },
      },

      vars: {
        [outlineColor]: sys.color.foreground,
      },
    },
  },
});
