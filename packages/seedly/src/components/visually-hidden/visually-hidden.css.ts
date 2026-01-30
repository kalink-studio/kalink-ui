import { style } from '@vanilla-extract/css';

import { components } from '../../styles/layers.css';

export const visuallyHiddenStyle = style({
  '@layer': {
    [components]: {
      width: 1,
      height: 1,
      padding: 0,
      margin: -1,
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',

      position: 'absolute',

      whiteSpace: 'nowrap',
      wordWrap: 'normal',

      border: 0,
    },
  },
});
