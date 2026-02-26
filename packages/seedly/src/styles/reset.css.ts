import { globalStyle } from '@vanilla-extract/css';

import { base } from './layers.css';
import { sys } from './system-contract.css';

globalStyle('*, *::before, *::after', {
  '@layer': {
    [base]: {
      boxSizing: 'border-box',
    },
  },
});

globalStyle('*', {
  '@layer': {
    [base]: {
      margin: 0,

      color: 'currentColor',
    },
  },
});

globalStyle('body', {
  '@layer': {
    [base]: {
      position: 'relative',

      color: sys.color.content.base,
      WebkitFontSmoothing: 'antialiased',
    },
  },
});

globalStyle('img, picture, video, canvas, svg', {
  '@layer': {
    [base]: {
      display: 'block',
      maxWidth: '100%',
    },
  },
});

globalStyle('input, button, textarea, select', {
  '@layer': {
    [base]: {
      font: 'inherit',
    },
  },
});

globalStyle('button', {
  '@layer': {
    [base]: {
      padding: '0',

      backgroundColor: 'transparent',
      border: 'none',

      cursor: 'pointer',
    },
  },
});
