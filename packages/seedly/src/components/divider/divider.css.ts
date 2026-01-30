import { style } from '@vanilla-extract/css';

import { sys } from '../../styles';
import { components } from '../../styles/layers.css';

export const divider = style({
  '@layer': {
    [components]: {
      height: 1,
      width: '100%',

      border: 'none',
      backgroundColor: sys.surface.foreground,
    },
  },
});
