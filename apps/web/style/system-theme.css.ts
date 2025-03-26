import { sys } from '@kalink-ui/seedly/styles';
import { createGlobalTheme } from '@vanilla-extract/css';

import { refs } from './refs.css';

createGlobalTheme(':root', sys, {
  layout: {
    measure: '75ch',
    direction: '1',
  },

  color: {
    background: refs.colors.neutral[100],
    foreground: refs.colors.neutral[0],
  },

  state: {
    hovered: {
      opacity: '0.08',
    },
    focused: {
      opacity: '0.12',
    },
    pressed: {
      opacity: '0.2',
    },
    muted: {
      dark: '0.4',
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
      /* Display Large from 36px to 72px */
      large: {
        font: refs.typeface.brand,
        weight: '700',
        lineHeight: refs.lineHeight.md,
        tracking: '0.1',
        size: `clamp( 2.25rem, calc(2.25rem + (4.5 - 2.25) * ${refs.fluidity.interpolation}), 4.5rem) `,
      },

      /* Display Medium from 33px to 57px */
      medium: {
        font: refs.typeface.brand,
        weight: '700',
        lineHeight: refs.lineHeight.md,
        tracking: '0.1',
        size: `clamp(2.125rem, calc(2.125rem + (4.0625 - 2.125) * ${refs.fluidity.interpolation}), 4.0625rem)`,
      },

      /* Display Small from 28px to 43px */
      small: {
        font: refs.typeface.brand,
        weight: '700',
        lineHeight: refs.lineHeight.md,
        tracking: '0.1',
        size: `clamp(1.75rem, calc(1.75rem + (3.125 - 1.75) * ${refs.fluidity.interpolation}), 3.125rem)`,
      },
    },

    headline: {
      /* Heading Large from 26px to 37px */
      large: {
        font: refs.typeface.brand,
        weight: '700',
        lineHeight: refs.lineHeight.md,
        tracking: '0.1',
        size: `clamp(2rem, calc(2rem + (4.25 - 2) * ${refs.fluidity.interpolation}), 4.25rem)`,
      },

      /* Heading Medium from 24px to 32px */
      medium: {
        font: refs.typeface.brand,
        weight: '700',
        lineHeight: refs.lineHeight.md,
        tracking: '0.1',
        size: `clamp(1.75rem, calc(1.75rem + (3.375 - 1.75) * ${refs.fluidity.interpolation}), 3.375rem)`,
      },

      /* Heading Small from 22px to 27px */
      small: {
        font: refs.typeface.brand,
        weight: '700',
        lineHeight: refs.lineHeight.md,
        tracking: '0.1',
        size: `clamp(1.5rem, calc(1.5rem + (2.75 - 1.5) * ${refs.fluidity.interpolation}), 2.75rem)`,
      },
    },

    /* Title Large from 20px to 23px */
    title: {
      large: {
        font: refs.typeface.brand,
        weight: '700',
        lineHeight: refs.lineHeight.md,
        tracking: '0.1',
        size: `clamp(1.5rem, calc(1.5rem + (2.25 - 1.5) * ${refs.fluidity.interpolation}), 2.25rem)`,
      },

      /* Title Medium from 18px to 20px */
      medium: {
        font: refs.typeface.brand,
        weight: '700',
        lineHeight: refs.lineHeight.md,
        tracking: '0.1',
        size: `clamp(1.125rem, calc(1.125rem + (1.5 - 1.125) * ${refs.fluidity.interpolation}), 1.5rem)`,
      },

      /* Title Small from 16px to 18px */
      small: {
        font: refs.typeface.brand,
        weight: '700',
        lineHeight: refs.lineHeight.md,
        tracking: '0.1',
        size: `clamp(1.0625rem, calc(1.0625rem + (1.3125 - 1.0625) * ${refs.fluidity.interpolation}), 1.3125rem)`,
      },
    },

    body: {
      /* Body Large from 18px to 20px */
      large: {
        font: refs.typeface.plain,
        weight: '400',
        lineHeight: refs.lineHeight.lg,
        tracking: 'normal',
        size: `clamp(1.125rem, calc(1.125rem + (1.25 - 1.125) * ${refs.fluidity.interpolation}), 1.25rem)`,
      },

      /* Body Medium from 16px to 17px */
      medium: {
        font: refs.typeface.plain,
        weight: '400',
        lineHeight: refs.lineHeight.xl,
        tracking: 'normal',
        size: `clamp(1rem, calc(1rem + (1.0625 - 1) * ${refs.fluidity.interpolation}), 1.0625rem)`,
      },

      /* Body Small from 14px to 15px */
      small: {
        font: refs.typeface.plain,
        weight: '400',
        lineHeight: refs.lineHeight.lg,
        tracking: 'normal',
        size: `clamp(0.875rem, calc(0.875rem + (0.9375 - 0.875) * ${refs.fluidity.interpolation}), 0.9375rem)`,
      },
    },

    label: {
      /* Label Large from 16px to 17px */
      large: {
        font: refs.typeface.plain,
        weight: '700',
        lineHeight: refs.lineHeight.md,
        tracking: '0.1',
        size: `clamp(1rem, calc(1rem + (1.0625 - 1) * ${refs.fluidity.interpolation}), 1.0625rem)`,
      },

      /* Label Medium from 14px to 15px */
      medium: {
        font: refs.typeface.plain,
        weight: '700',
        lineHeight: refs.lineHeight.xl,
        tracking: '0.1',
        size: `clamp(0.875rem, calc(0.875rem + (0.9375 - 0.875) * ${refs.fluidity.interpolation}), 0.9375rem)`,
      },

      /* Label Small from 12px to 13px */
      small: {
        font: refs.typeface.plain,
        weight: '700',
        lineHeight: refs.lineHeight.md,
        tracking: '0.1',
        size: `clamp(0.75rem, calc(0.75rem + (0.8125 - 0.75) * ${refs.fluidity.interpolation}), 0.8125rem)`,
      },
    },
  },

  spacing: {
    0: '0px',

    /* from 4px to 6px */
    1: `clamp(0.25rem, calc(0.25rem + (0.375 - 0.25) * ${refs.fluidity.interpolation}), 0.375rem)`,

    /* from 8px to 13px */
    2: `clamp(0.5rem, calc(0.5rem + (0.8125 - 0.5) * ${refs.fluidity.interpolation}), 0.8125rem)`,

    /* from 12px to 21px */
    3: `clamp(0.75rem, calc(0.75rem + (1.3125 - 0.75) * ${refs.fluidity.interpolation}), 1.3125rem)`,

    /* from 16px to 29px */
    4: `clamp(1rem, calc(1rem + (1.8125 - 1) * ${refs.fluidity.interpolation}), 1.8125rem)`,

    /* from 20px to 38px */
    5: `clamp(1.25rem, calc(1.25rem + (2.375 - 1.25) * ${refs.fluidity.interpolation}), 2.375rem)`,

    /* from 24px to 47px */
    6: `clamp(1.5rem, calc(1.5rem + (2.9375 - 1.5) * ${refs.fluidity.interpolation}), 2.9375rem)`,

    /* from 28px to 57px */
    7: `clamp(1.75rem, calc(1.75rem + (3.5625 - 1.75) * ${refs.fluidity.interpolation}), 3.5625rem)`,

    /* from 32px to 66px */
    8: `clamp(2rem, calc(2rem + (4.125 - 2) * ${refs.fluidity.interpolation}), 4.125rem)`,

    /* from 36px to 76px */
    9: `clamp(2.25rem, calc(2.25rem + (4.75 - 2.25) * ${refs.fluidity.interpolation}), 4.75rem)`,

    /* from 40px to 87px */
    10: `clamp(2.5rem, calc(2.5rem + (5.4375 - 2.5) * ${refs.fluidity.interpolation}), 5.4375rem)`,

    /* from 44px to 97px */
    11: `clamp(2.75rem, calc(2.75rem + (6.0625 - 2.75) * ${refs.fluidity.interpolation}), 6.0625rem)`,

    /* from 48px to 108px */
    12: `clamp(3rem, calc(3rem + (6.75 - 3) * ${refs.fluidity.interpolation}), 6.75rem)`,

    /* from 52px to 119px */
    13: `clamp(3.25rem, calc(3.25rem + (7.4375 - 3.25) * ${refs.fluidity.interpolation}), 7.4375rem)`,

    /* from 56px to 130px */
    14: `clamp(3.5rem, calc(3.5rem + (8.125 - 3.5) * ${refs.fluidity.interpolation}), 8.125rem)`,

    /* from 60px to 141px */
    15: `clamp(3.75rem, calc(3.75rem + (8.8125 - 3.75) * ${refs.fluidity.interpolation}), 8.8125rem)`,

    /* from 64px to 153px */
    16: `clamp(4rem, calc(4rem + (9.5625 - 4) * ${refs.fluidity.interpolation}), 9.5625rem)`,

    /* from 68px to 164px */
    17: `clamp(4.25rem, calc(4.25rem + (10.25 - 4.25) * ${refs.fluidity.interpolation}), 10.25rem)`,

    /* from 72px to 176px */
    18: `clamp(4.5rem, calc(4.5rem + (11 - 4.5) * ${refs.fluidity.interpolation}), 11rem)`,
  },
});
