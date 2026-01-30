import { recipe } from '@vanilla-extract/recipes';

import { components } from '../../styles/layers.css';

export const cardFooterRecipe = recipe({
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
