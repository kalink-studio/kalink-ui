import {
  assignVars,
  createGlobalTheme,
  globalStyle,
} from '@vanilla-extract/css';

import { base } from '../layers.css';
import { toFluidClampFor } from '../scale';
import { sys } from '../system-contract.css';

const lightThemeVars = {
  neutral: {
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
  primary: {
    '1': 'oklch(96.91% 0.0093 258.337)',
    '2': 'oklch(94.24% 0.0175 258.995)',
    '3': 'oklch(90.98% 0.0284 258.77)',
    '4': 'oklch(87% 0.0428 257.837)',
    '5': 'oklch(81.68% 0.0643 256.432)',
    '6': 'oklch(74.72% 0.091 257.719)',
    '7': 'oklch(67.89% 0.1169 260.21)',
    '8': 'oklch(61.86% 0.1397 263.5)',
    '9': 'oklch(56.38% 0.1539 265.422)',
    '10': 'oklch(50% 0.156 263.5)',
    '11': 'oklch(47.53% 0.1527 267.682)',
    '12': 'oklch(43% 0.1323 268.507)',
    '13': 'oklch(39.57% 0.1088 268.702)',
    '14': 'oklch(34.88% 0.084 269.42)',
    '15': 'oklch(27.91% 0.0587 271.159)',
  },
} as const;

const darkThemeVars = {
  neutral: {
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
  primary: {
    '1': 'oklch(19.15% 0.0291 270.401)',
    '2': 'oklch(20.61% 0.0334 270.364)',
    '3': 'oklch(24.57% 0.0599 266.196)',
    '4': 'oklch(28.89% 0.0898 262.344)',
    '5': 'oklch(32.48% 0.1111 261.125)',
    '6': 'oklch(35.96% 0.121 261.684)',
    '7': 'oklch(39.44% 0.1264 262.535)',
    '8': 'oklch(43.18% 0.1334 263.177)',
    '9': 'oklch(47.25% 0.1443 263.444)',
    '10': 'oklch(50% 0.156 263.5)',
    '11': 'oklch(56.27% 0.2119 262.148)',
    '12': 'oklch(59.96% 0.2081 262.905)',
    '13': 'oklch(68.37% 0.1772 264.446)',
    '14': 'oklch(79.85% 0.1104 262.372)',
    '15': 'oklch(90.9% 0.0484 258.78)',
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
      dim: lightThemeVars.neutral[2],
      base: lightThemeVars.neutral[1],
      bright: lightThemeVars.neutral[1],
    },
    container: {
      low: lightThemeVars.neutral[4],
      base: lightThemeVars.neutral[3],
      high: lightThemeVars.neutral[2],
      top: lightThemeVars.neutral[1],
    },
    content: {
      base: lightThemeVars.neutral[10],
    },
    border: {
      low: `color-mix(in srgb, ${sys.color.content.base} 18%, transparent)`,
      base: `color-mix(in srgb, ${sys.color.content.base} 26%, transparent)`,
      high: `color-mix(in srgb, ${sys.color.content.base} 32%, transparent)`,
    },
    tone: {
      neutral: lightThemeVars.neutral[8],
      onNeutral: lightThemeVars.neutral[1],
      neutralContainer: lightThemeVars.neutral[3],
      onNeutralContainer: lightThemeVars.neutral[10],
      primary: lightThemeVars.primary[10],
      onPrimary: lightThemeVars.neutral[1],
      primaryContainer: lightThemeVars.primary[3],
      onPrimaryContainer: lightThemeVars.primary[11],
      secondary: lightThemeVars.neutral[7],
      onSecondary: lightThemeVars.neutral[1],
      secondaryContainer: lightThemeVars.neutral[3],
      onSecondaryContainer: lightThemeVars.neutral[10],
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
  '@layer': {
    [base]: {
      '@media': {
        '(prefers-color-scheme: dark)': {
          vars: {
            ...assignVars(sys.color, {
              surface: {
                dim: darkThemeVars.neutral[2],
                base: darkThemeVars.neutral[1],
                bright: darkThemeVars.neutral[1],
              },
              container: {
                low: darkThemeVars.neutral[4],
                base: darkThemeVars.neutral[3],
                high: darkThemeVars.neutral[2],
                top: darkThemeVars.neutral[1],
              },
              content: {
                base: darkThemeVars.neutral[10],
              },
              border: {
                low: `color-mix(in srgb, ${sys.color.content.base} 18%, transparent)`,
                base: `color-mix(in srgb, ${sys.color.content.base} 26%, transparent)`,
                high: `color-mix(in srgb, ${sys.color.content.base} 32%, transparent)`,
              },
              tone: {
                neutral: darkThemeVars.neutral[6],
                onNeutral: darkThemeVars.neutral[1],
                neutralContainer: darkThemeVars.neutral[3],
                onNeutralContainer: darkThemeVars.neutral[10],
                primary: darkThemeVars.primary[9],
                onPrimary: darkThemeVars.neutral[11],
                primaryContainer: darkThemeVars.primary[3],
                onPrimaryContainer: darkThemeVars.primary[10],
                secondary: darkThemeVars.neutral[7],
                onSecondary: darkThemeVars.neutral[1],
                secondaryContainer: darkThemeVars.neutral[4],
                onSecondaryContainer: darkThemeVars.neutral[10],
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
    },
  },
});
