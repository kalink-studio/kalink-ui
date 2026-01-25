import { style } from '@vanilla-extract/css';

import { sys } from '../../styles';

export const divider = style({
  height: 1,
  width: '100%',

  border: 'none',
  backgroundColor: sys.surface.foreground,
});
