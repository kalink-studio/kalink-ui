import { vars } from '@kalink/ui/styles';
import { createGlobalTheme } from '@vanilla-extract/css';

export const cubicBezier = [0.4, 0, 0.2, 1] satisfies [
  number,
  number,
  number,
  number,
];

createGlobalTheme(':root', vars, {
  color: {
    light: '#fff',
    dark: '#000',

    outline: '#000',
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
  },

  measure: '75ch',

  typeface: {
    brand: 'Serif',
    plain: 'Sans Serif',
  },

  fontSize: {
    '2xs': '11px',
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '28px',
    '4xl': '32px',
    '5xl': '36px',
    '6xl': '40px',
    '7xl': '44px',
    '8xl': '48px',
    '9xl': '52px',
  },

  spacing: {
    none: '0',
    '2xs': '4px',
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
    '4xl': '80px',
    '5xl': '96px',
    '6xl': '112px',
    '7xl': '128px',
    '8xl': '144px',
    '9xl': '160px',
  },

  screen: {
    xs: '376px',
    sm: '560px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1440px',
    '3xl': '1920px',
  },

  radius: {
    none: '0', // 0px
    sharp: '0.125rem', // 2px
    small: '0.25rem', // 4px
    default: '0.5rem', // 8px
    rounded: '0.75rem', // 12px
    circle: '50%',
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

  duration: {
    swift: '150ms',
    short: '250ms',
    standard: '300ms',
    long: '400ms',
    extended: '500ms',
  },

  easing: {
    inOut: `cubic-bezier(${cubicBezier.join(', ')})`,
    linear: 'linear',
  },
});
