import { createGlobalTheme } from '@vanilla-extract/css';

import { base } from '../../src/styles/layers.css';

export const refs = createGlobalTheme(':root', {
  '@layer': base,

  colors: {
    neutral: {
      0: '#000000',
      10: '#161C1D',
      20: '#2C383A',
      30: '#435456',
      40: '#597173',
      50: '#6F8D90',
      60: '#8CA4A6',
      70: '#A9BBBC',
      80: '#C5D1D3',
      90: '#E2E8E9',
      100: '#FFFFFF',
    },
    primary: {
      0: '#000000',
      10: '#1A1110',
      20: '#401D10',
      30: '#7F3A1A',
      40: '#BF5B21',
      50: '#F27F1B',
      60: '#F2A950',
      70: '#E6BD8A',
      80: '#E4CEBC',
      90: '#ECE8E2',
      100: '#FFFFFF',
    },
  },

  typeface: {
    brand: 'serif',
    plain: 'sans-serif',
  },

  lineHeight: {
    md: '1',
    lg: '1.2',
    xl: '1.4',
  },
});
