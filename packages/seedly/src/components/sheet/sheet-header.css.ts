import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { sys } from '../../styles';
import { components } from '../../styles/layers.css';

export const sheetHeaderRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
        gap: sys.spacing[4],
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 'auto',
      },
    },
  },

  variants: {
    side: {
      top: {
        '@layer': {
          [components]: {
            flexDirection: 'row',
          },
        },
      },
      right: {
        '@layer': {
          [components]: {
            flexDirection: 'row-reverse',
          },
        },
      },
      bottom: {
        '@layer': {
          [components]: {
            flexDirection: 'row',
          },
        },
      },
      left: {
        '@layer': {
          [components]: {
            flexDirection: 'row',
          },
        },
      },
    },
  },
});

export const sheetHeaderCloseBtn = style({
  flexShrink: 0,
});
