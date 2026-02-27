import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import {
  mapContractVars,
  resolveColorProfileValues,
  stateColor,
  sys,
  typography,
  transition,
} from '../../styles';
import { components } from '../../styles/layers.css';

import type { ColorTone, ColorVariant, ProfileColorValues } from '../../styles';

export const buttonVars = createThemeContract({
  color: {
    rootActiveBackground: null,
    rootActiveBorder: null,
    rootActiveForeground: null,
    rootBackground: null,
    rootBorder: null,
    rootDisabledBackground: null,
    rootDisabledBorder: null,
    rootDisabledForeground: null,
    rootFocusRing: null,
    rootForeground: null,
    rootHoverBackground: null,
    rootHoverBorder: null,
    rootHoverForeground: null,
    rootLoadingBackground: null,
    rootLoadingBorder: null,
    rootLoadingForeground: null,
  },

  motion: {
    rootTransitionDuration: null,
    rootTransitionEasing: null,
  },

  shape: {
    rootCorner: null,
  },

  size: {
    rootIcon: null,
  },

  spacing: {
    rootGap: null,
    rootPaddingBlock: null,
    rootPaddingInline: null,
  },
});

const buttonTones = [
  'neutral',
  'primary',
  'secondary',
  'tertiary',
  'error',
] as const satisfies readonly ColorTone[];

const buttonStyledVariants = [
  'solid',
  'outline',
  'ghost',
] as const satisfies readonly ColorVariant[];

const assignButtonColorVars = (values: ProfileColorValues) => {
  return {
    ...assignVars(buttonVars.color, {
      rootActiveBackground: values.activeBackground,
      rootActiveBorder: values.activeBorder,
      rootActiveForeground: values.activeForeground,
      rootBackground: values.background,
      rootBorder: values.border,
      rootDisabledBackground: values.disabledBackground,
      rootDisabledBorder: values.disabledBorder,
      rootDisabledForeground: values.disabledForeground,
      rootFocusRing: values.focusRing,
      rootForeground: values.foreground,
      rootHoverBackground: values.hoverBackground,
      rootHoverBorder: values.hoverBorder,
      rootHoverForeground: values.hoverForeground,
      rootLoadingBackground: values.loadingBackground,
      rootLoadingBorder: values.loadingBorder,
      rootLoadingForeground: values.loadingForeground,
    }),
  };
};

const buttonSizeStyles = {
  sm: [
    typography.label.small,
    {
      '@layer': {
        [components]: {
          vars: {
            ...assignVars(buttonVars.spacing, {
              rootGap: sys.spacing[3],
              rootPaddingBlock: sys.spacing[4],
              rootPaddingInline: sys.spacing[6],
            }),

            ...assignVars(buttonVars.size, {
              rootIcon: sys.spacing[5],
            }),
          },
        },
      },
    },
  ],

  md: [
    typography.label.medium,
    {
      '@layer': {
        [components]: {
          vars: {
            ...assignVars(buttonVars.spacing, {
              rootGap: sys.spacing[4],
              rootPaddingBlock: sys.spacing[6],
              rootPaddingInline: sys.spacing[8],
            }),

            ...assignVars(buttonVars.size, {
              rootIcon: sys.spacing[6],
            }),
          },
        },
      },
    },
  ],

  lg: [
    typography.label.large,
    {
      '@layer': {
        [components]: {
          vars: {
            ...assignVars(buttonVars.spacing, {
              rootGap: sys.spacing[5],
              rootPaddingBlock: sys.spacing[8],
              rootPaddingInline: sys.spacing[10],
            }),

            ...assignVars(buttonVars.size, {
              rootIcon: sys.spacing[7],
            }),
          },
        },
      },
    },
  ],
};

export const buttonStyledVariantClass = style({
  '@layer': {
    [components]: {
      justifyContent: 'center',

      paddingBlock: buttonVars.spacing.rootPaddingBlock,
      paddingInline: buttonVars.spacing.rootPaddingInline,

      textDecorationLine: 'none',
      color: buttonVars.color.rootForeground,
      backgroundColor: buttonVars.color.rootBackground,
      borderRadius: buttonVars.shape.rootCorner,
      border: `1px solid ${buttonVars.color.rootBorder}`,

      transition: transition(
        ['background-color', 'border-color', 'color', 'box-shadow'],
        {
          duration: buttonVars.motion.rootTransitionDuration,
          easing: buttonVars.motion.rootTransitionEasing,
        },
      ),

      selectors: {
        '&:hover:not(:disabled):not([data-disabled]):not([data-loading])': {
          '@media': {
            '(hover: hover)': {
              color: buttonVars.color.rootHoverForeground,
              backgroundColor: buttonVars.color.rootHoverBackground,
              borderColor: buttonVars.color.rootHoverBorder,
            },
          },
        },

        '&:active:not(:disabled):not([data-disabled]):not([data-loading])': {
          color: buttonVars.color.rootActiveForeground,
          backgroundColor: buttonVars.color.rootActiveBackground,
          borderColor: buttonVars.color.rootActiveBorder,
        },

        '&:focus-visible:not(:disabled):not([data-disabled])': {
          outline: `2px solid ${buttonVars.color.rootFocusRing}`,
          outlineOffset: '-1px',
        },

        '&:disabled, &[data-disabled]': {
          color: buttonVars.color.rootDisabledForeground,
          backgroundColor: buttonVars.color.rootDisabledBackground,
          borderColor: buttonVars.color.rootDisabledBorder,
          boxShadow: 'none',
        },

        '&[data-loading]': {
          color: buttonVars.color.rootLoadingForeground,
          backgroundColor: buttonVars.color.rootLoadingBackground,
          borderColor: buttonVars.color.rootLoadingBorder,
        },
      },
    },
  },
});

export const buttonBaseClass = style({
  '@layer': {
    [components]: {
      vars: {
        ...assignVars(buttonVars, {
          color: {
            rootActiveBackground: sys.color.tone.primary,
            rootActiveBorder: sys.color.tone.primary,
            rootActiveForeground: sys.color.tone.onPrimary,
            rootBackground: sys.color.tone.primary,
            rootBorder: sys.color.tone.primary,
            rootDisabledBackground: sys.color.container.base,
            rootDisabledBorder: 'transparent',
            rootDisabledForeground: stateColor.disabledContent,
            rootFocusRing: sys.color.tone.primary,
            rootForeground: sys.color.tone.onPrimary,
            rootHoverBackground: sys.color.tone.primaryContainer,
            rootHoverBorder: sys.color.tone.primaryContainer,
            rootHoverForeground: sys.color.tone.onPrimary,
            rootLoadingBackground: sys.color.tone.primaryContainer,
            rootLoadingBorder: sys.color.tone.primaryContainer,
            rootLoadingForeground: sys.color.tone.onPrimary,
          },

          motion: {
            rootTransitionDuration: sys.motion.duration.short[3],
            rootTransitionEasing: sys.motion.easing.standard,
          },

          shape: {
            rootCorner: sys.shape.corner.medium,
          },

          size: {
            rootIcon: sys.spacing[6],
          },

          spacing: {
            rootGap: sys.spacing[4],
            rootPaddingBlock: sys.spacing[6],
            rootPaddingInline: sys.spacing[8],
          },
        }),
      },

      display: 'inline-flex',
      alignItems: 'center',
      gap: buttonVars.spacing.rootGap,
      whiteSpace: 'nowrap',

      cursor: 'pointer',

      selectors: {
        '&:disabled, &[data-disabled]': {
          cursor: 'not-allowed',
        },

        '&[data-loading]': {
          cursor: 'wait',
          pointerEvents: 'none',
        },
      },
    },
  },
});

export const buttonRecipe = recipe({
  base: buttonBaseClass,
  variants: {
    variant: {
      bare: {},
      solid: buttonStyledVariantClass,
      outline: buttonStyledVariantClass,
      ghost: buttonStyledVariantClass,
    },

    tone: buttonTones.reduce(
      (styles, tone) => ({
        ...styles,
        [tone]: {},
      }),
      {} as Record<ColorTone, Record<string, never>>,
    ),

    size: buttonSizeStyles,

    shape: mapContractVars(sys.shape.corner, buttonVars.shape),

    flow: {
      default: {
        '@layer': {
          [components]: {
            flexDirection: 'row',
          },
        },
      },
      reverse: {
        '@layer': {
          [components]: {
            flexDirection: 'row-reverse',
          },
        },
      },
    },

    iconOnly: {
      false: {},
      true: {
        '@layer': {
          [components]: {
            vars: {
              [buttonVars.spacing.rootGap]: sys.spacing[0],
            },
          },
        },
      },
    },

    loading: {
      true: {},
      false: {},
    },
  },

  compoundVariants: [
    ...buttonTones.flatMap((tone) => {
      return buttonStyledVariants.map((variant) => {
        return {
          variants: { variant, tone },
          style: {
            '@layer': {
              [components]: {
                vars: {
                  ...assignButtonColorVars(
                    resolveColorProfileValues({
                      profile: 'action',
                      colorSource: 'tone',
                      colorKey: tone,
                      variant,
                    }),
                  ),
                },
              },
            },
          },
        };
      });
    }),

    ...buttonStyledVariants.map((variant) => {
      return {
        variants: {
          variant,
          iconOnly: true,
        },
        style: {
          '@layer': {
            [components]: {
              paddingInline: buttonVars.spacing.rootPaddingBlock,
            },
          },
        },
      };
    }),
  ],

  defaultVariants: {
    variant: 'solid',
    tone: 'primary',
    size: 'md',
    shape: 'medium',
    flow: 'default',
    iconOnly: false,
    loading: false,
  },
});

export type ButtonVariants = Omit<
  NonNullable<RecipeVariants<typeof buttonRecipe>>,
  'iconOnly'
>;
