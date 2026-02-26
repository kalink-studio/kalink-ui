import {
  assignVars,
  createGlobalTheme,
  globalStyle,
} from '@vanilla-extract/css';

import { toFluidClampFor } from '../scale';
import { sys } from '../system-contract.css';

const lightThemeVars = {
  slate: {
    '1': 'oklch(98.4% 0.003 247.858)',
    '2': 'oklch(96.95% 0.0066 247.893)',
    '3': 'oklch(93.61% 0.0119 254.124)',
    '4': 'oklch(88.54% 0.0195 253.607)',
    '5': 'oklch(76.4% 0.0335 255.372)',
    '6': 'oklch(62.22% 0.0433 257.131)',
    '7': 'oklch(55.4% 0.046 257.417)',
    '8': 'oklch(41.91% 0.0434 257.283)',
    '9': 'oklch(34.66% 0.0432 258.035)',
    '10': 'oklch(26.61% 0.0412 261.072)',
    '11': 'oklch(20.08% 0.042 265.659)',
    '12': 'oklch(12.9% 0.042 264.695)',
  },
  fuchsia: {
    '1': 'oklch(97.7% 0.0178 320.058)',
    '2': 'oklch(95.43% 0.0369 318.962)',
    '3': 'oklch(91.19% 0.0723 319.48)',
    '4': 'oklch(85.21% 0.1323 320.939)',
    '5': 'oklch(77.38% 0.2141 321.896)',
    '6': 'oklch(66.7% 0.295 322.15)',
    '7': 'oklch(63.25% 0.3084 322.489)',
    '8': 'oklch(56.61% 0.2895 323.202)',
    '9': 'oklch(50% 0.2533 324.124)',
    '10': 'oklch(44.27% 0.2134 324.777)',
    '11': 'oklch(39.12% 0.175 325.616)',
    '12': 'oklch(29.3% 0.1426 325.661)',
  },
} as const;

const darkThemeVars = {
  slate: {
    '1': 'oklch(20% 0.0166 257.417)',
    '2': 'oklch(27.8% 0.0231 257.417)',
    '3': 'oklch(35.26% 0.0293 257.417)',
    '4': 'oklch(42.16% 0.035 257.417)',
    '5': 'oklch(49.68% 0.0412 257.417)',
    '6': 'oklch(55.4% 0.046 257.417)',
    '7': 'oklch(65.32% 0.0349 257.417)',
    '8': 'oklch(72.84% 0.0255 257.417)',
    '9': 'oklch(79.74% 0.0178 257.417)',
    '10': 'oklch(87.2% 0.0105 257.417)',
    '11': 'oklch(95% 0.0037 257.417)',
  },
  fuchsia: {
    '1': 'oklch(20% 0.0903 322.15)',
    '2': 'oklch(27.8% 0.1254 322.15)',
    '3': 'oklch(35.26% 0.1592 322.15)',
    '4': 'oklch(42.16% 0.1902 322.15)',
    '5': 'oklch(49.68% 0.2247 322.15)',
    '6': 'oklch(57.5% 0.2598 322.15)',
    '7': 'oklch(66.7% 0.295 322.15)',
    '8': 'oklch(72.84% 0.2231 322.15)',
    '9': 'oklch(79.74% 0.1538 322.15)',
    '10': 'oklch(87.2% 0.0892 322.15)',
    '11': 'oklch(95% 0.032 322.15)',
  },
} as const;

const typefaces = {
  brand: 'Charter, "Bitstream Charter", "Sitka Text", Cambria, serif;',
  plain:
    'Avenir, Montserrat, Corbel, "URW Gothic", source-sans-pro, sans-serif;',
};

const fluidTypographySize = (px: number) => {
  return toFluidClampFor(px, {
    lowMin: 12,
    lowMax: 40,
    highMin: 13,
    highMax: 52,
    exponent: 1.25,
    rounding: 'none',
  });
};

const fluidSpacing = (px: number) => {
  if (px === 0) {
    return '0px';
  }

  return toFluidClampFor(px, {
    lowMin: 2,
    lowMax: 72,
    highMin: 2,
    highMax: 96,
    exponent: 1.1,
    rounding: 'none',
  });
};

createGlobalTheme(':root', sys, {
  layout: {
    direction: '1',
    measure: '75ch',
  },

  color: {
    surface: {
      dim: lightThemeVars.slate[2],
      base: lightThemeVars.slate[1],
      bright: lightThemeVars.slate[1],
    },
    container: {
      low: lightThemeVars.slate[4],
      base: lightThemeVars.slate[3],
      high: lightThemeVars.slate[2],
      top: lightThemeVars.slate[1],
    },
    content: {
      base: lightThemeVars.slate[10],
    },
    border: {
      low: `color-mix(in srgb, ${sys.color.content.base} 18%, transparent)`,
      base: `color-mix(in srgb, ${sys.color.content.base} 26%, transparent)`,
      high: `color-mix(in srgb, ${sys.color.content.base} 32%, transparent)`,
    },
    tone: {
      neutral: lightThemeVars.slate[8],
      onNeutral: lightThemeVars.slate[1],
      neutralContainer: lightThemeVars.slate[3],
      onNeutralContainer: lightThemeVars.slate[10],
      primary: lightThemeVars.fuchsia[7],
      onPrimary: lightThemeVars.fuchsia[1],
      primaryContainer: lightThemeVars.fuchsia[3],
      onPrimaryContainer: lightThemeVars.fuchsia[11],
      secondary: lightThemeVars.slate[7],
      onSecondary: lightThemeVars.slate[1],
      secondaryContainer: lightThemeVars.slate[3],
      onSecondaryContainer: lightThemeVars.slate[10],
      tertiary: 'oklch(51.7% 0.1338 304.01)',
      onTertiary: 'oklch(97.7% 0.0178 320.058)',
      tertiaryContainer: 'oklch(89.65% 0.0486 305.13)',
      onTertiaryContainer: 'oklch(32.11% 0.1036 304.72)',
      error: 'oklch(54.06% 0.2052 26.94)',
      onError: 'oklch(97.6% 0.0034 28.01)',
      errorContainer: 'oklch(92.17% 0.0337 24.31)',
      onErrorContainer: 'oklch(32.2% 0.098 26.49)',
    },
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
      text: '0.6',
      surface: '0.12',
    },
    disabled: {
      text: '0.5',
      border: '0.12',
      background: '0.08',
    },
  },

  shape: {
    corner: {
      none: '0',
      sharp: '0.125rem',
      small: '0.25rem',
      medium: '0.375rem',
      rounded: '0.5rem',
      circle: '100%',
    },
  },

  elevation: {
    none: 'none',
    minimal: '0 1px 2px 0 rgb(0 0 0 / 0.12), 0 1px 3px 1px rgb(0 0 0 / 0.08)',
    low: '0 2px 4px -1px rgb(0 0 0 / 0.14), 0 4px 8px 0 rgb(0 0 0 / 0.10), 0 1px 12px 0 rgb(0 0 0 / 0.08)',
    moderate:
      '0 4px 6px -2px rgb(0 0 0 / 0.18), 0 8px 14px 1px rgb(0 0 0 / 0.12), 0 2px 18px 3px rgb(0 0 0 / 0.10)',
    high: '0 6px 10px -4px rgb(0 0 0 / 0.20), 0 14px 24px 2px rgb(0 0 0 / 0.14), 0 4px 30px 5px rgb(0 0 0 / 0.12)',
    peak: '0 9px 15px -6px rgb(0 0 0 / 0.24), 0 22px 38px 3px rgb(0 0 0 / 0.18), 0 6px 46px 8px rgb(0 0 0 / 0.14)',
  },

  motion: {
    duration: {
      short: {
        1: '50ms',
        2: '100ms',
        3: '125ms',
        4: '150ms',
      },
      medium: {
        1: '200ms',
        2: '250ms',
        3: '300ms',
        4: '350ms',
      },
      long: {
        1: '400ms',
        2: '450ms',
        3: '500ms',
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
        font: typefaces.brand,
        weight: '700',
        lineHeight: '1.1',
        tracking: '0.01em',
        size: fluidTypographySize(40),
      },
      medium: {
        font: typefaces.brand,
        weight: '700',
        lineHeight: '1.1',
        tracking: '0.01em',
        size: fluidTypographySize(32),
      },
      small: {
        font: typefaces.brand,
        weight: '700',
        lineHeight: '1.1',
        tracking: '0.01em',
        size: fluidTypographySize(28),
      },
    },
    headline: {
      large: {
        font: typefaces.brand,
        weight: '700',
        lineHeight: '1.2',
        tracking: 'normal',
        size: fluidTypographySize(24),
      },
      medium: {
        font: typefaces.brand,
        weight: '700',
        lineHeight: '1.2',
        tracking: 'normal',
        size: fluidTypographySize(22),
      },
      small: {
        font: typefaces.brand,
        weight: '700',
        lineHeight: '1.2',
        tracking: 'normal',
        size: fluidTypographySize(20),
      },
    },
    title: {
      large: {
        font: typefaces.plain,
        weight: '500',
        lineHeight: '1.5rem',
        tracking: '-0.0025em',
        size: fluidTypographySize(18),
      },
      medium: {
        font: typefaces.plain,
        weight: '500',
        lineHeight: '1.5rem',
        tracking: 'normal',
        size: fluidTypographySize(16),
      },
      small: {
        font: typefaces.plain,
        weight: '500',
        lineHeight: '1.25rem',
        tracking: 'normal',
        size: fluidTypographySize(14),
      },
    },
    label: {
      large: {
        font: typefaces.plain,
        weight: '500',
        lineHeight: '1.5rem',
        tracking: 'normal',
        size: fluidTypographySize(16),
      },
      medium: {
        font: typefaces.plain,
        weight: '500',
        lineHeight: '1.25rem',
        tracking: 'normal',
        size: fluidTypographySize(14),
      },
      small: {
        font: typefaces.plain,
        weight: '500',
        lineHeight: '1rem',
        tracking: 'normal',
        size: fluidTypographySize(12),
      },
    },
    body: {
      large: {
        font: typefaces.plain,
        weight: '400',
        lineHeight: '1.5rem',
        tracking: 'normal',
        size: fluidTypographySize(16),
      },
      medium: {
        font: typefaces.plain,
        weight: '400',
        lineHeight: '1.25rem',
        tracking: 'normal',
        size: fluidTypographySize(14),
      },
      small: {
        font: typefaces.plain,
        weight: '400',
        lineHeight: '1rem',
        tracking: 'normal',
        size: fluidTypographySize(12),
      },
    },
  },

  spacing: {
    0: fluidSpacing(0),
    1: fluidSpacing(2),
    2: fluidSpacing(4),
    3: fluidSpacing(6),
    4: fluidSpacing(8),
    5: fluidSpacing(10),
    6: fluidSpacing(12),
    7: fluidSpacing(14),
    8: fluidSpacing(16),
    9: fluidSpacing(20),
    10: fluidSpacing(24),
    11: fluidSpacing(28),
    12: fluidSpacing(32),
    13: fluidSpacing(36),
    14: fluidSpacing(40),
    15: fluidSpacing(48),
    16: fluidSpacing(56),
    17: fluidSpacing(64),
    18: fluidSpacing(72),
  },
});

globalStyle(':root', {
  '@media': {
    '(prefers-color-scheme: dark)': {
      vars: {
        ...assignVars(sys.color, {
          surface: {
            dim: darkThemeVars.slate[2],
            base: darkThemeVars.slate[1],
            bright: darkThemeVars.slate[1],
          },
          container: {
            low: darkThemeVars.slate[4],
            base: darkThemeVars.slate[3],
            high: darkThemeVars.slate[2],
            top: darkThemeVars.slate[1],
          },
          content: {
            base: darkThemeVars.slate[10],
          },
          border: {
            low: `color-mix(in srgb, ${sys.color.content.base} 18%, transparent)`,
            base: `color-mix(in srgb, ${sys.color.content.base} 26%, transparent)`,
            high: `color-mix(in srgb, ${sys.color.content.base} 32%, transparent)`,
          },
          tone: {
            neutral: darkThemeVars.slate[6],
            onNeutral: darkThemeVars.slate[1],
            neutralContainer: darkThemeVars.slate[3],
            onNeutralContainer: darkThemeVars.slate[10],
            primary: darkThemeVars.fuchsia[7],
            onPrimary: darkThemeVars.fuchsia[1],
            primaryContainer: darkThemeVars.fuchsia[3],
            onPrimaryContainer: darkThemeVars.fuchsia[10],
            secondary: darkThemeVars.slate[7],
            onSecondary: darkThemeVars.slate[1],
            secondaryContainer: darkThemeVars.slate[4],
            onSecondaryContainer: darkThemeVars.slate[10],
            tertiary: 'oklch(72.84% 0.1168 303.21)',
            onTertiary: 'oklch(20.3% 0.0836 304.52)',
            tertiaryContainer: 'oklch(35.14% 0.0925 304.88)',
            onTertiaryContainer: 'oklch(90.15% 0.0454 305.12)',
            error: 'oklch(74.53% 0.1432 24.62)',
            onError: 'oklch(25.44% 0.0758 26.12)',
            errorContainer: 'oklch(39.03% 0.1129 26.08)',
            onErrorContainer: 'oklch(92.17% 0.0337 24.31)',
          },
        }),
        ...assignVars(sys.elevation, {
          none: 'none',
          minimal: `0 0 0 1px color-mix(in srgb, ${sys.color.content.base} 10%, transparent), 0 2px 4px 0 rgb(0 0 0 / 0.45)`,
          low: `0 0 0 1px color-mix(in srgb, ${sys.color.content.base} 12%, transparent), 0 4px 8px -1px rgb(0 0 0 / 0.50)`,
          moderate: `0 0 0 1px color-mix(in srgb, ${sys.color.content.base} 14%, transparent), 0 8px 16px -2px rgb(0 0 0 / 0.54)`,
          high: `0 0 0 1px color-mix(in srgb, ${sys.color.content.base} 16%, transparent), 0 14px 24px -3px rgb(0 0 0 / 0.58)`,
          peak: `0 0 0 1px color-mix(in srgb, ${sys.color.content.base} 18%, transparent), 0 22px 36px -4px rgb(0 0 0 / 0.62)`,
        }),
      },
    },
  },
});
