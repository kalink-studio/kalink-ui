import { style } from '@vanilla-extract/css';

import { components } from '../../styles/layers.css';

export const textareaStyle = style({
  '@layer': {
    [components]: {},
  },
});

export const textarea = style({
  '@layer': {
    [components]: {
      lineHeight: 'normal',
    },
  },
});
