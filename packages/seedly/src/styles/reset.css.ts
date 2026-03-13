import { globalStyle } from '@vanilla-extract/css';

import { reset } from './layers.css';
import { sys } from './system-contract.css';

globalStyle('*, *::before, *::after', {
  '@layer': {
    [reset]: {
      boxSizing: 'border-box',
    },
  },
});

globalStyle('*', {
  '@layer': {
    [reset]: {
      margin: 0,

      color: 'currentColor',
    },
  },
});

globalStyle('body', {
  '@layer': {
    [reset]: {
      position: 'relative',

      color: sys.color.content.base,
      WebkitFontSmoothing: 'antialiased',
    },
  },
});

globalStyle('img, picture, video, canvas, svg', {
  '@layer': {
    [reset]: {
      display: 'block',
      maxWidth: '100%',
    },
  },
});

globalStyle('input, button, textarea, select', {
  '@layer': {
    [reset]: {
      font: 'inherit',
    },
  },
});

globalStyle('button', {
  '@layer': {
    [reset]: {
      padding: '0',

      backgroundColor: 'transparent',
      border: 'none',

      cursor: 'pointer',
    },
  },
});
