import { style } from '@vanilla-extract/css';

import { sys } from '../../styles';

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: sys.spacing[8],
  inlineSize: '100%',
});
