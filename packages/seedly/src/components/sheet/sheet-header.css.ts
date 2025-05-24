import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { sys } from '../../styles';

export const sheetHeader = recipe({
  base: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    gap: sys.spacing[4],
  },

  variants: {
    side: {
      top: {
        flexDirection: 'row',
      },
      right: {
        flexDirection: 'row-reverse',
      },
      bottom: {
        flexDirection: 'row',
      },
      left: {
        flexDirection: 'row',
      },
    },
  },
});

export const sheetHeaderCloseBtn = style({
  flexShrink: 0,
});
