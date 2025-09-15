import {
  style,
  globalStyle,
  createThemeContract,
  assignVars,
  fallbackVar,
} from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { sys, transition, typography } from '../../styles';
import { components } from '../../styles/layers.css';
import { formFieldVars } from '../form-field';

export const inputVars = createThemeContract({
  color: {
    foreground: null,
    background: null,
    outline: null,
  },

  spacing: {
    block: null,
    inline: null,
  },

  shape: {
    corner: null,
  },
});

export const inputAppearance = recipe({
  base: [
    {
      '@layer': {
        [components]: {
          boxSizing: 'border-box',
          position: 'relative',

          color: inputVars.color.foreground,

          backgroundColor: inputVars.color.background,
          borderRadius: inputVars.shape.corner,

          cursor: 'inherit',

          transition: transition(
            ['background-color', 'border-color', 'box-shadow'],
            {
              duration: 'short.2',
            },
          ),

          selectors: {
            '&:disabled, &:has(:disabled)': {
              backgroundColor: `color-mix(in srgb, ${inputVars.color.foreground} calc(${sys.state.muted.dark} * 100%), transparent)`,

              vars: {
                [inputVars.color.foreground]:
                  `color(from ${sys.color.foreground} srgb r g b / 0.38)`,
              },
            },

            '&:focus, &:focus-within, &:focus-visible': {
              boxShadow: `0 0 0 1px ${inputVars.color.outline} inset`,
              outline: 'none',
            },

            '&[aria-invalid], &:has([aria-invalid])': {
              vars: {
                [inputVars.color.foreground]: fallbackVar(
                  formFieldVars.color.foreground,
                  'red',
                ),
              },
            },
          },

          vars: {
            ...assignVars(inputVars.color, {
              foreground: fallbackVar(
                formFieldVars.color.foreground,
                sys.color.foreground,
              ),
              background: fallbackVar(
                formFieldVars.color.background,
                sys.color.background,
                'transparent',
              ),
              outline: fallbackVar(
                formFieldVars.color.outline,
                sys.color.foreground,
              ),
            }),

            ...assignVars(inputVars.spacing, {
              block: sys.spacing[2],
              inline: sys.spacing[4],
            }),

            ...assignVars(inputVars.shape, {
              corner: sys.shape.corner.none,
            }),
          },
        },
      },
    },
  ],

  variants: {
    variant: {
      outlined: {
        '@layer': {
          [components]: {
            paddingInline: inputVars.spacing.inline,
            paddingBlock: inputVars.spacing.block,

            borderColor: inputVars.color.outline,
            borderStyle: 'solid',
            borderWidth: 1,
          },
        },
      },

      plain: {
        '@layer': {
          [components]: {
            paddingInline: inputVars.spacing.inline,
            paddingBlock: inputVars.spacing.block,

            backgroundColor: inputVars.color.background,
            borderRadius: inputVars.shape.corner,

            vars: {
              [inputVars.color.background]:
                `color-mix(in srgb, ${inputVars.color.foreground} calc(${sys.state.muted.dark} * 100%), transparent)`,
            },
          },
        },
      },

      bare: {},
    },

    size: {
      sm: [
        typography.body.small,
        {
          '@layer': {
            [components]: {
              /**
               * Force the font size to 16px to avoid zooming on mobile
               */
              fontSize: `max(16px, ${sys.typography.body.small.size})`,

              vars: {
                ...assignVars(inputVars.spacing, {
                  block: sys.spacing[1],
                  inline: sys.spacing[1],
                }),
              },
            },
          },
        },
      ],

      md: [
        typography.body.medium,
        {
          '@layer': {
            [components]: {
              /**
               * Force the font size to 16px to avoid zooming on mobile
               */
              fontSize: `max(16px, ${sys.typography.body.medium.size})`,

              vars: {
                ...assignVars(inputVars.spacing, {
                  block: sys.spacing[2],
                  inline: sys.spacing[2],
                }),
              },
            },
          },
        },
      ],

      lg: [
        typography.body.large,
        {
          '@layer': {
            [components]: {
              /**
               * Force the font size to 16px to avoid zooming on mobile
               */
              fontSize: `max(16px, ${sys.typography.body.large.size})`,

              vars: {
                ...assignVars(inputVars.spacing, {
                  block: sys.spacing[3],
                  inline: sys.spacing[3],
                }),
              },
            },
          },
        },
      ],
    },
  },

  defaultVariants: {
    variant: 'outlined',
    size: 'md',
  },
});

export const inputWrapper = style({
  '@layer': {
    [components]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: inputVars.spacing.inline,

      width: '100%',

      position: 'relative',

      cursor: 'text',

      selectors: {
        '&:disabled, &:has(:disabled)': {
          cursor: 'inherit',
        },
      },
    },
  },
});

export const input = style({
  '@layer': {
    [components]: {
      appearance: 'none',

      flexGrow: 1,
      flexBasis: 1,
      width: '100%',

      paddingTop: 0,
      paddingBottom: 0,

      color: 'inherit',
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'inherit',
    },
  },
});

export const inputAddornment = style({
  '@layer': {
    [components]: {
      flexShrink: 0,

      color: 'inherit',
    },
  },
});

globalStyle(
  `${inputAppearance.classNames.base} input:is(:focus, :focus-visible)`,
  {
    '@layer': {
      [components]: {
        outline: 'none',
      },
    },
  },
);

export type InputAppearanceVariants = NonNullable<
  RecipeVariants<typeof inputAppearance>
>;
