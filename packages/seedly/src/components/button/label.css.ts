import { style } from '@vanilla-extract/css';

import { components } from '../../styles/layers.css';

export const buttonLabel = style({
  '@layer': {
    [components]: {
      display: 'inline-flex',
      alignItems: 'center',
      whiteSpace: 'nowrap',
    },
  },
});
