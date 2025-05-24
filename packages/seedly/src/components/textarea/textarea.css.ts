import { style } from '@vanilla-extract/css';

import { inputAppearance } from '../input';

export const textarea = style([
  inputAppearance(),
  {
    lineHeight: 'auto',
  },
]);
