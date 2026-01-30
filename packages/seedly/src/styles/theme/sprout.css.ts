import { createTheme } from '@vanilla-extract/css';

import { sys } from '../system-contract.css';

import { refs } from './sprout-ref.css';

export const sprout = createTheme(sys, {
  layout: {
    measure: '75ch',
    direction: '1',
  },

  surface: {
    background: refs.colors.neutral[100],
    foreground: refs.colors.neutral[10],
  },

  tone: {
    neutral: refs.colors.neutral[10],
    onNeutral: refs.colors.neutral[90],
    primary: refs.colors.primary[50],
    onPrimary: refs.colors.primary[10],
    destructive: '#d80000',
    onDestructive: refs.colors.neutral[100],
    success: '#2e7d32',
    onSuccess: refs.colors.neutral[100],
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
      medium: '0.5rem',
      rounded: '0.75rem',
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
        size: refs.typeScale.displayLarge,
      },

      medium: {
        font: refs.typeface.brand,
        weight: '700',
        lineHeight: refs.lineHeight.md,
        tracking: '0.1',
        size: refs.typeScale.displayMedium,
      },

      small: {
        font: refs.typeface.brand,
        weight: '700',
        lineHeight: refs.lineHeight.md,
        tracking: '0.1',
        size: refs.typeScale.displaySmall,
      },
    },

    headline: {
      large: {
        font: refs.typeface.brand,
        weight: '700',
        lineHeight: refs.lineHeight.md,
        tracking: '0.1',
        size: refs.typeScale.headlineLarge,
      },

      medium: {
        font: refs.typeface.brand,
        weight: '700',
        lineHeight: refs.lineHeight.md,
        tracking: '0.1',
        size: refs.typeScale.headlineMedium,
      },

      small: {
        font: refs.typeface.brand,
        weight: '700',
        lineHeight: refs.lineHeight.md,
        tracking: '0.1',
        size: refs.typeScale.headlineSmall,
      },
    },

    title: {
      large: {
        font: refs.typeface.brand,
        weight: '700',
        lineHeight: refs.lineHeight.md,
        tracking: '0.1',
        size: refs.typeScale.titleLarge,
      },

      medium: {
        font: refs.typeface.brand,
        weight: '700',
        lineHeight: refs.lineHeight.md,
        tracking: '0.1',
        size: refs.typeScale.titleMedium,
      },

      small: {
        font: refs.typeface.brand,
        weight: '700',
        lineHeight: refs.lineHeight.md,
        tracking: '0.1',
        size: refs.typeScale.titleSmall,
      },
    },

    body: {
      large: {
        font: refs.typeface.plain,
        weight: '400',
        lineHeight: refs.lineHeight.lg,
        tracking: 'normal',
        size: refs.typeScale.bodyLarge,
      },

      medium: {
        font: refs.typeface.plain,
        weight: '400',
        lineHeight: refs.lineHeight.xl,
        tracking: 'normal',
        size: refs.typeScale.bodyMedium,
      },

      small: {
        font: refs.typeface.plain,
        weight: '400',
        lineHeight: refs.lineHeight.lg,
        tracking: 'normal',
        size: refs.typeScale.bodySmall,
      },
    },

    label: {
      large: {
        font: refs.typeface.plain,
        weight: '700',
        lineHeight: refs.lineHeight.xl,
        tracking: '0.1',
        size: refs.typeScale.labelLarge,
      },

      medium: {
        font: refs.typeface.plain,
        weight: '700',
        lineHeight: refs.lineHeight.lg,
        tracking: '0.1',
        size: refs.typeScale.labelMedium,
      },

      small: {
        font: refs.typeface.plain,
        weight: '700',
        lineHeight: refs.lineHeight.md,
        tracking: '0.1',
        size: refs.typeScale.labelSmall,
      },
    },
  },

  spacing: {
    0: '0px',
    1: refs.spacing[1],
    2: refs.spacing[2],
    3: refs.spacing[3],
    4: refs.spacing[4],
    5: refs.spacing[5],
    6: refs.spacing[6],
    7: refs.spacing[7],
    8: refs.spacing[8],
    9: refs.spacing[9],
    10: refs.spacing[10],
    11: refs.spacing[11],
    12: refs.spacing[12],
    13: refs.spacing[13],
    14: refs.spacing[14],
    15: refs.spacing[15],
    16: refs.spacing[16],
    17: refs.spacing[17],
    18: refs.spacing[18],
  },
});
