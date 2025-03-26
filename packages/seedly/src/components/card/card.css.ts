import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { components } from '../../styles/layers.css';

export const card = style({});
export const cardHeader = style({});
export const cardBody = style({});
export const cardFooter = recipe({
  base: {
    '@layer': {
      [components]: {
        display: 'flex',
      },
    },
  },
  variants: {
    align: {
      start: {
        '@layer': {
          [components]: {
            justifyContent: 'flex-start',
          },
        },
      },
      center: {
        '@layer': {
          [components]: {
            justifyContent: 'center',
          },
        },
      },
      end: {
        '@layer': {
          [components]: {
            justifyContent: 'flex-end',
          },
        },
      },
    },
  },
});
