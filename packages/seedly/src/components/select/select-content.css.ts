import { style } from '@vanilla-extract/css';

import { sys } from '../../styles';
import { components } from '../../styles/layers.css';

export const selectContent = style({
  '@layer': {
    [components]: {
      backgroundColor: sys.surface.background,
    },
  },
});

export const selectContentViewport = style({
  '@layer': {
    [components]: {
      height: 'auto',
      maxHeight: 'var(--radix-select-content-available-height)',
      minWidth: 'var(--radix-select-trigger-width)',
    },
  },
});
