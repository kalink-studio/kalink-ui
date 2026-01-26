import { createGlobalTheme } from '@vanilla-extract/css';

import { base } from '../layers.css';
import { toFluidClampFor } from '../scale';

const spacingClamp = (value: number) =>
  toFluidClampFor(value, {
    lowMin: 4,
    lowMax: 72,
    highMin: 6,
    highMax: 176,
    exponent: 2,
    rounding: 'none',
  });

const typeScaleClamp = (value: number) =>
  toFluidClampFor(value, {
    lowMin: 12,
    lowMax: 40,
    highMin: 14,
    highMax: 85,
    exponent: 2,
    rounding: 'none',
  });

export const refs = createGlobalTheme(':root', {
  '@layer': base,

  colors: {
    neutral: {
      0: '#000000',
      10: '#161c1d',
      20: '#2c383a',
      30: '#435456',
      40: '#597173',
      50: '#6f8d90',
      60: '#8ca4a6',
      70: '#a9bbbc',
      80: '#c5d1d3',
      90: '#e2e8e9',
      100: '#ffffff',
    },
    primary: {
      0: '#000000',
      10: '#1a1110',
      20: '#401d10',
      30: '#7f3a1a',
      40: '#bf5b21',
      50: '#f27f1b',
      60: '#f2a950',
      70: '#e6bd8a',
      80: '#e4cebc',
      90: '#ece8e2',
      100: '#ffffff',
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

  spacing: {
    1: spacingClamp(4),
    2: spacingClamp(8),
    3: spacingClamp(12),
    4: spacingClamp(16),
    5: spacingClamp(20),
    6: spacingClamp(24),
    7: spacingClamp(28),
    8: spacingClamp(32),
    9: spacingClamp(36),
    10: spacingClamp(40),
    11: spacingClamp(44),
    12: spacingClamp(48),
    13: spacingClamp(52),
    14: spacingClamp(56),
    15: spacingClamp(60),
    16: spacingClamp(64),
    17: spacingClamp(68),
    18: spacingClamp(72),
  },

  typeScale: {
    displayLarge: typeScaleClamp(40),
    displayMedium: typeScaleClamp(34),
    displaySmall: typeScaleClamp(28),
    headlineLarge: typeScaleClamp(32),
    headlineMedium: typeScaleClamp(28),
    headlineSmall: typeScaleClamp(24),
    titleLarge: typeScaleClamp(24),
    titleMedium: typeScaleClamp(18),
    titleSmall: typeScaleClamp(17),
    bodyLarge: typeScaleClamp(19),
    bodyMedium: typeScaleClamp(14),
    bodySmall: typeScaleClamp(12),
    labelLarge: typeScaleClamp(16),
    labelMedium: typeScaleClamp(14),
    labelSmall: typeScaleClamp(12),
  },
});
