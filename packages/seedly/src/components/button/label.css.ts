import { style } from '@vanilla-extract/css';

import { atoms } from '../../styles/layers.css';

export const buttonLabel = style({
  '@layer': {
    [atoms]: {
      display: 'inline-flex',
      alignItems: 'center',
      whiteSpace: 'nowrap',
    },
  },
});
