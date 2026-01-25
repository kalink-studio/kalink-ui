import { createThemeContract } from '@vanilla-extract/css';

export const refs = createThemeContract({
  colors: {
    neutral: {
      0: null,
      100: null,
    },
    primary: {
      50: null,
    },
  },

  fluidity: {
    min: null,
    max: null,
    interpolation: null,
  },

  typeface: {
    brand: null,
    plain: null,
  },

  lineHeight: {
    md: null,
    lg: null,
    xl: null,
  },
});
