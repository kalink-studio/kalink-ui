import {
  createGlobalTheme,
  createVar,
  globalStyle,
} from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import { refs } from './refs.css';

const sysFluidityMin = createVar();
const sysFluidityMax = createVar();
const sysFluidityInterpolation = createVar();

globalStyle(':root', {
  vars: {
    [sysFluidityMin]: '23.5',
    [sysFluidityMax]: '80',
    [sysFluidityInterpolation]: calc.divide(
      calc.subtract('100vw', calc.multiply(sysFluidityMin, '1rem')),
      calc.subtract(sysFluidityMax, sysFluidityMin),
    ),
  },
});

createGlobalTheme(':root', refs, {
  colors: {
    neutral: {
      0: '#000000',
      100: '#FFFFFF',
    },
  },

  fluidity: {
    min: sysFluidityMin,
    max: sysFluidityMax,
    interpolation: sysFluidityInterpolation,
  },

  typeface: {
    brand: 'ernst, Serif',
    plain: 'montserrat, Sans Serif',
  },

  lineHeight: {
    md: '1',
    lg: '1.2',
    xl: '1.4',
  },
});
