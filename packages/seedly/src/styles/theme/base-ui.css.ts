import { assignVars, globalStyle } from '@vanilla-extract/css';

import { base } from '../layers.css';
import { sys } from '../system-contract.css';

const lightThemeVars = {
  '--color-blue': 'oklch(45% 50% 264deg)',
  '--color-red': 'oklch(50% 55% 31deg)',
  '--color-red-800': 'var(--color-red)',
  '--color-gray-50': 'oklch(98% 0.25% 264deg)',
  '--color-gray-100': 'oklch(12% 9.5% 264deg / 5%)',
  '--color-gray-200': 'oklch(12% 9% 264deg / 7%)',
  '--color-gray-300': 'oklch(12% 8.5% 264deg / 17%)',
  '--color-gray-400': 'oklch(12% 8% 264deg / 38%)',
  '--color-gray-500': 'oklch(12% 7.5% 264deg / 50%)',
  '--color-gray-600': 'oklch(12% 7% 264deg / 67%)',
  '--color-gray-700': 'oklch(12% 6% 264deg / 77%)',
  '--color-gray-800': 'oklch(12% 5% 264deg / 85%)',
  '--color-gray-900': 'oklch(12% 5% 264deg / 90%)',
  '--color-gray-950': 'oklch(12% 5% 264deg / 95%)',
  '--radius-sm': '0.25rem',
} as const;

const darkThemeVars = {
  '--color-blue': 'oklch(69% 50% 264deg)',
  '--color-red': 'oklch(80% 55% 31deg)',
  '--color-red-800': 'var(--color-red)',
  '--color-gray-50': 'oklch(17% 0.25% 264deg)',
  '--color-gray-100': 'oklch(28% 0.75% 264deg / 65%)',
  '--color-gray-200': 'oklch(29% 0.75% 264deg / 80%)',
  '--color-gray-300': 'oklch(35% 0.75% 264deg / 80%)',
  '--color-gray-400': 'oklch(47% 0.875% 264deg / 80%)',
  '--color-gray-500': 'oklch(64% 1% 264deg / 80%)',
  '--color-gray-600': 'oklch(82% 1% 264deg / 80%)',
  '--color-gray-700': 'oklch(92% 1.125% 264deg / 80%)',
  '--color-gray-800': 'oklch(93% 0.875% 264deg / 85%)',
  '--color-gray-900': 'oklch(95% 0.5% 264deg / 90%)',
  '--color-gray-950': 'oklch(94% 0.375% 264deg / 95%)',
  '--radius-sm': '0.25rem',
} as const;

globalStyle(':root', {
  '@layer': {
    [base]: {
      vars: {
        ...lightThemeVars,
        ...assignVars(sys, {
          layout: {
            direction: '1',
            measure: '75ch',
          },

          color: {
            surface: {
              dim: 'var(--color-gray-100)',
              base: 'var(--color-gray-50)',
              bright: 'var(--color-gray-50)',
            },
            container: {
              low: 'var(--color-gray-100)',
              base: 'var(--color-gray-50)',
              high: 'var(--color-gray-200)',
              top: 'var(--color-gray-300)',
            },
            content: {
              base: 'var(--color-gray-900)',
            },
            tone: {
              neutral: 'var(--color-gray-900)',
              onNeutral: 'var(--color-gray-50)',
              primary: 'var(--color-blue)',
              onPrimary: 'var(--color-gray-50)',
              destructive: 'var(--color-red)',
              onDestructive: 'var(--color-gray-50)',
              success: 'oklch(58% 0.14 152deg)',
              onSuccess: 'var(--color-gray-50)',
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
              small: 'var(--radius-sm)',
              medium: '0.375rem',
              rounded: '0.5rem',
              circle: '100%',
            },
          },

          elevation: {
            none: 'none',
            minimal: 'inset 0 0 0 1px var(--color-gray-200)',
            low: '0 2px 10px rgb(0 0 0 / 0.1)',
            moderate:
              '0 10px 15px -3px var(--color-gray-200), 0 4px 6px -4px var(--color-gray-200)',
            high: '0 0 1px 1px var(--color-gray-100), 0 1px 1px var(--color-gray-100), 1px 2px 4px -1px var(--color-gray-100)',
            peak: '0 0 1px 1px rgb(0 0 0 / 25%), 0 1px 1px rgb(0 0 0 / 25%), 1px 2px 4px -1px rgb(0 0 0 / 25%)',
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
                font: 'inherit',
                weight: '700',
                lineHeight: '1.1',
                tracking: '0.01em',
                size: '2.5rem',
              },
              medium: {
                font: 'inherit',
                weight: '700',
                lineHeight: '1.1',
                tracking: '0.01em',
                size: '2rem',
              },
              small: {
                font: 'inherit',
                weight: '700',
                lineHeight: '1.1',
                tracking: '0.01em',
                size: '1.75rem',
              },
            },
            headline: {
              large: {
                font: 'inherit',
                weight: '700',
                lineHeight: '1.2',
                tracking: 'normal',
                size: '1.5rem',
              },
              medium: {
                font: 'inherit',
                weight: '700',
                lineHeight: '1.2',
                tracking: 'normal',
                size: '1.375rem',
              },
              small: {
                font: 'inherit',
                weight: '700',
                lineHeight: '1.2',
                tracking: 'normal',
                size: '1.25rem',
              },
            },
            title: {
              large: {
                font: 'inherit',
                weight: '500',
                lineHeight: '1.5rem',
                tracking: '-0.0025em',
                size: '1.125rem',
              },
              medium: {
                font: 'inherit',
                weight: '500',
                lineHeight: '1.5rem',
                tracking: 'normal',
                size: '1rem',
              },
              small: {
                font: 'inherit',
                weight: '500',
                lineHeight: '1.25rem',
                tracking: 'normal',
                size: '0.875rem',
              },
            },
            label: {
              large: {
                font: 'inherit',
                weight: '500',
                lineHeight: '1.5rem',
                tracking: 'normal',
                size: '1rem',
              },
              medium: {
                font: 'inherit',
                weight: '500',
                lineHeight: '1.25rem',
                tracking: 'normal',
                size: '0.875rem',
              },
              small: {
                font: 'inherit',
                weight: '500',
                lineHeight: '1rem',
                tracking: 'normal',
                size: '0.75rem',
              },
            },
            body: {
              large: {
                font: 'inherit',
                weight: '400',
                lineHeight: '1.5rem',
                tracking: 'normal',
                size: '1rem',
              },
              medium: {
                font: 'inherit',
                weight: '400',
                lineHeight: '1.25rem',
                tracking: 'normal',
                size: '0.875rem',
              },
              small: {
                font: 'inherit',
                weight: '400',
                lineHeight: '1rem',
                tracking: 'normal',
                size: '0.75rem',
              },
            },
          },

          spacing: {
            0: '0px',
            1: '0.125rem',
            2: '0.25rem',
            3: '0.375rem',
            4: '0.5rem',
            5: '0.625rem',
            6: '0.75rem',
            7: '0.875rem',
            8: '1rem',
            9: '1.25rem',
            10: '1.5rem',
            11: '1.75rem',
            12: '2rem',
            13: '2.25rem',
            14: '2.5rem',
            15: '3rem',
            16: '3.5rem',
            17: '4rem',
            18: '4.5rem',
          },
        }),
      },
    },
  },
});

globalStyle(':root', {
  '@layer': {
    [base]: {
      '@media': {
        '(prefers-color-scheme: dark)': {
          vars: darkThemeVars,
        },
      },
    },
  },
});

export const baseUiTheme = 'base-ui';
