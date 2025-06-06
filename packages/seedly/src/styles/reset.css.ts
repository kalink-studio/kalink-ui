/**
 * Minimal reset based on Josh's Custom CSS Reset
 * https://www.joshwcomeau.com/css/custom-css-reset/
 */
import { globalStyle } from '@vanilla-extract/css';

import { base } from './layers.css';

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
    },
  },
});

globalStyle('body', {
  '@layer': {
    [base]: {
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

globalStyle('p, h1, h2, h3, h4, h5, h6', {
  '@layer': {
    [base]: {
      overflowWrap: 'break-word',
    },
  },
});

globalStyle('p', {
  '@layer': {
    [base]: {
      textWrap: 'pretty',
    },
  },
});

globalStyle('h1, h2, h3, h4, h5, h6', {
  '@layer': {
    [base]: {
      textWrap: 'balance',
    },
  },
});

globalStyle('button', {
  '@layer': {
    [base]: {
      border: 'none',
      backgroundColor: 'transparent',

      cursor: 'pointer',
    },
  },
});

globalStyle('a', {
  '@layer': {
    [base]: {
      color: 'currentColor',
      textDecoration: 'none',
    },
  },
});

globalStyle('fieldset', {
  '@layer': {
    [base]: {
      padding: 0,

      border: 'none',
    },
  },
});

globalStyle('legend', {
  '@layer': {
    [base]: {
      width: '100%',
    },
  },
});

globalStyle('pre', {
  '@layer': {
    [base]: {
      whiteSpace: 'pre-wrap',
    },
  },
});
