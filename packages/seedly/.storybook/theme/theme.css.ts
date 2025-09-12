import { createGlobalTheme } from '@vanilla-extract/css';

import { toFluidClampFor } from '../../src/styles';
import { base } from '../../src/styles/layers.css';
import { sys } from '../../src/styles/system-contract.css';

import { refs } from './ref.css';

const typoMap = {
  lowMin: 12,
  lowMax: 40,
  highMin: 14,
  highMax: 85,
  exponent: 2 as const,
  rounding: 'none' as const,
};

const spaceMap = {
  lowMin: 4,
  lowMax: 72,
  highMin: 6,
  highMax: 176,
  exponent: 2 as const,
  rounding: 'none' as const,
};

createGlobalTheme(':root', sys, {
  '@layer': base,

  layout: {
    measure: '75ch',
    direction: '1',
  },

  color: {
    background: refs.colors.neutral[100],
    foreground: refs.colors.neutral[10],
  },

  state: {
    hovered: {
      opacity: '0.1',
    },
    focused: {
      opacity: '0.12',
    },
    pressed: {
      opacity: '0.2',
    },
    muted: {
      dark: '0.1',
      light: '0.9',
    },
  },

  shape: {
    corner: {
      none: '0',
      sharp: '0.125rem', // 2px
      small: '0.25rem', // 4px
      medium: '0.5rem', // 8px
      rounded: '0.75rem', // 12px
      circle: '50%',
    },
  },

  elevation: {
    none: 'none',
    minimal:
      '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
    low: '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
    moderate:
      '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
    high: '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
    peak: '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
  },

  motion: {
    duration: {
      short: {
        1: '50ms',
        2: '100ms',
        3: '150ms',
        4: '200ms',
      },
      medium: {
        1: '250ms',
        2: '300ms',
        3: '350ms',
        4: '400ms',
      },
      long: {
        1: '450ms',
        2: '500ms',
        3: '550ms',
        4: '600ms',
      },
    },
    easing: {
      standard: 'cubic-bezier(0.2, 0, 0, 1)',
      decelerate: {
        standard: 'cubic-bezier(0.4, 0, 1, 1)',
        emphasized: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
      },
      accelerate: {
        standard: 'cubic-bezier(0.4, 0, 1, 1)',
        emphasized: 'cubic-bezier(0.3, 0, 0.8, 0.15)',
      },
    },
  },

  typography: {
    display: {
      large: {
        font: refs.typeface.brand,
        weight: '700',
        lineHeight: refs.lineHeight.md,
        tracking: '0.1',
        size: toFluidClampFor(40, typoMap),
      },

      medium: {
        font: refs.typeface.brand,
        weight: '700',
        lineHeight: refs.lineHeight.md,
        tracking: '0.1',
        size: toFluidClampFor(34, typoMap),
      },

      small: {
        font: refs.typeface.brand,
        weight: '700',
        lineHeight: refs.lineHeight.md,
        tracking: '0.1',
        size: toFluidClampFor(28, typoMap),
      },
    },

    headline: {
      large: {
        font: refs.typeface.brand,
        weight: '700',
        lineHeight: refs.lineHeight.md,
        tracking: '0.1',
        size: toFluidClampFor(32, typoMap),
      },

      medium: {
        font: refs.typeface.brand,
        weight: '700',
        lineHeight: refs.lineHeight.md,
        tracking: '0.1',
        size: toFluidClampFor(28, typoMap),
      },

      small: {
        font: refs.typeface.brand,
        weight: '700',
        lineHeight: refs.lineHeight.md,
        tracking: '0.1',
        size: toFluidClampFor(24, typoMap),
      },
    },

    title: {
      large: {
        font: refs.typeface.brand,
        weight: '700',
        lineHeight: refs.lineHeight.md,
        tracking: '0.1',
        size: toFluidClampFor(24, typoMap),
      },

      medium: {
        font: refs.typeface.brand,
        weight: '700',
        lineHeight: refs.lineHeight.md,
        tracking: '0.1',
        size: toFluidClampFor(18, typoMap),
      },

      small: {
        font: refs.typeface.brand,
        weight: '700',
        lineHeight: refs.lineHeight.md,
        tracking: '0.1',
        size: toFluidClampFor(17, typoMap),
      },
    },

    body: {
      large: {
        font: refs.typeface.plain,
        weight: '400',
        lineHeight: refs.lineHeight.lg,
        tracking: 'normal',
        size: toFluidClampFor(19, typoMap),
      },

      medium: {
        font: refs.typeface.plain,
        weight: '400',
        lineHeight: refs.lineHeight.xl,
        tracking: 'normal',
        size: toFluidClampFor(14, typoMap),
      },

      small: {
        font: refs.typeface.plain,
        weight: '400',
        lineHeight: refs.lineHeight.lg,
        tracking: 'normal',
        size: toFluidClampFor(12, typoMap),
      },
    },

    label: {
      large: {
        font: refs.typeface.plain,
        weight: '700',
        lineHeight: refs.lineHeight.xl,
        tracking: '0.1',
        size: toFluidClampFor(16, typoMap),
      },

      medium: {
        font: refs.typeface.plain,
        weight: '700',
        lineHeight: refs.lineHeight.lg,
        tracking: '0.1',
        size: toFluidClampFor(14, typoMap),
      },

      small: {
        font: refs.typeface.plain,
        weight: '700',
        lineHeight: refs.lineHeight.md,
        tracking: '0.1',
        size: toFluidClampFor(12, typoMap),
      },
    },
  },

  spacing: {
    0: '0px',
    1: toFluidClampFor(4, spaceMap),
    2: toFluidClampFor(8, spaceMap),
    3: toFluidClampFor(12, spaceMap),
    4: toFluidClampFor(16, spaceMap),
    5: toFluidClampFor(20, spaceMap),
    6: toFluidClampFor(24, spaceMap),
    7: toFluidClampFor(28, spaceMap),
    8: toFluidClampFor(32, spaceMap),
    9: toFluidClampFor(36, spaceMap),
    10: toFluidClampFor(40, spaceMap),
    11: toFluidClampFor(44, spaceMap),
    12: toFluidClampFor(48, spaceMap),
    13: toFluidClampFor(52, spaceMap),
    14: toFluidClampFor(56, spaceMap),
    15: toFluidClampFor(60, spaceMap),
    16: toFluidClampFor(64, spaceMap),
    17: toFluidClampFor(68, spaceMap),
    18: toFluidClampFor(72, spaceMap),
  },
});
