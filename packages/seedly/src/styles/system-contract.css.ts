import { createThemeContract } from '@vanilla-extract/css';

export const typeContract = {
  font: null,
  weight: null,
  lineHeight: null,
  tracking: null,
  size: null,
} as const;

export const sys = createThemeContract({
  layout: {
    direction: null,
    measure: null,
  },

  color: {
    background: null,
    foreground: null,
    muted: null,
    outline: null,
  },

  state: {
    hovered: {
      opacity: null,
    },
    focused: {
      opacity: null,
    },
    pressed: {
      opacity: null,
    },
  },

  shape: {
    corner: {
      none: null,
      sharp: null,
      small: null,
      medium: null,
      rounded: null,
      circle: null,
    },
  },

  elevation: {
    none: null,
    minimal: null,
    low: null,
    moderate: null,
    high: null,
    peak: null,
  },

  motion: {
    duration: {
      short: {
        1: null,
        2: null,
        3: null,
        4: null,
      },
      medium: {
        1: null,
        2: null,
        3: null,
        4: null,
      },
      long: {
        1: null,
        2: null,
        3: null,
        4: null,
      },
    },

    easing: {
      standard: null,
      decelerate: {
        standard: null,
        emphasized: null,
      },
      accelerate: {
        standard: null,
        emphasized: null,
      },
    },
  },

  typography: {
    display: {
      large: typeContract,
      medium: typeContract,
      small: typeContract,
    },

    headline: {
      large: typeContract,
      medium: typeContract,
      small: typeContract,
    },

    title: {
      large: typeContract,
      medium: typeContract,
      small: typeContract,
    },

    label: {
      large: typeContract,
      medium: typeContract,
      small: typeContract,
    },

    body: {
      large: typeContract,
      medium: typeContract,
      small: typeContract,
    },
  },

  spacing: {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
    11: null,
    12: null,
    13: null,
    14: null,
    15: null,
    16: null,
    17: null,
    18: null,
  },
});
