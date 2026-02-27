import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import {
  mapContractVars,
  resolveColorProfileValues,
  sys,
  typography,
  transition,
} from '../../styles';
import { components } from '../../styles/layers.css';

import type { ColorTone, ColorVariant, ProfileColorValues } from '../../styles';

export const buttonVars = createThemeContract({
  color: {
    foreground: null,
    background: null,
    border: null,
    focusRing: null,
  },

  spacing: {
    block: null,
    inline: null,
    gap: null,
  },

  shape: {
    corner: null,
  },

  icon: {
    size: null,
  },
});

const buttonStateVars = createThemeContract({
  color: {
    hoverForeground: null,
    hoverBackground: null,
    hoverBorder: null,

    activeForeground: null,
    activeBackground: null,
    activeBorder: null,

    disabledForeground: null,
    disabledBackground: null,
    disabledBorder: null,

    loadingForeground: null,
    loadingBackground: null,
    loadingBorder: null,
  },
});

export { buttonStateVars };

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
      foreground: values.foreground,
      background: values.background,
      border: values.border,
      focusRing: values.focusRing,
    }),

    ...assignVars(buttonStateVars.color, {
      hoverForeground: values.hoverForeground,
      hoverBackground: values.hoverBackground,
      hoverBorder: values.hoverBorder,

      activeForeground: values.activeForeground,
      activeBackground: values.activeBackground,
      activeBorder: values.activeBorder,

      disabledForeground: values.disabledForeground,
      disabledBackground: values.disabledBackground,
      disabledBorder: values.disabledBorder,

      loadingForeground: values.loadingForeground,
      loadingBackground: values.loadingBackground,
      loadingBorder: values.loadingBorder,
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
              block: sys.spacing[4],
              inline: sys.spacing[6],
              gap: sys.spacing[3],
            }),

            ...assignVars(buttonVars.icon, {
              size: sys.spacing[5],
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
              block: sys.spacing[6],
              inline: sys.spacing[8],
              gap: sys.spacing[4],
            }),

            ...assignVars(buttonVars.icon, {
              size: sys.spacing[6],
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
              block: sys.spacing[8],
              inline: sys.spacing[10],
              gap: sys.spacing[5],
            }),

            ...assignVars(buttonVars.icon, {
              size: sys.spacing[7],
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

      paddingBlock: buttonVars.spacing.block,
      paddingInline: buttonVars.spacing.inline,

      textDecorationLine: 'none',
      color: buttonVars.color.foreground,
      backgroundColor: buttonVars.color.background,
      borderRadius: buttonVars.shape.corner,
      border: `1px solid ${buttonVars.color.border}`,

      transition: transition(
        ['background-color', 'border-color', 'color', 'box-shadow'],
        {
          duration: 'short.3',
          easing: 'standard',
        },
      ),

      selectors: {
        '&:hover:not(:disabled):not([data-disabled]):not([data-loading])': {
          '@media': {
            '(hover: hover)': {
              color: buttonStateVars.color.hoverForeground,
              backgroundColor: buttonStateVars.color.hoverBackground,
              borderColor: buttonStateVars.color.hoverBorder,
            },
          },
        },

        '&:active:not(:disabled):not([data-disabled]):not([data-loading])': {
          color: buttonStateVars.color.activeForeground,
          backgroundColor: buttonStateVars.color.activeBackground,
          borderColor: buttonStateVars.color.activeBorder,
        },

        '&:disabled, &[data-disabled]': {
          color: buttonStateVars.color.disabledForeground,
          backgroundColor: buttonStateVars.color.disabledBackground,
          borderColor: buttonStateVars.color.disabledBorder,
          boxShadow: 'none',
        },

        '&[data-loading]': {
          color: buttonStateVars.color.loadingForeground,
          backgroundColor: buttonStateVars.color.loadingBackground,
          borderColor: buttonStateVars.color.loadingBorder,
        },
      },
    },
  },
});

export const buttonBaseClass = style({
  '@layer': {
    [components]: {
      vars: {
        [buttonVars.spacing.gap]: sys.spacing[4],

        ...assignVars(buttonVars.icon, {
          size: sys.spacing[6],
        }),
      },

      display: 'inline-flex',
      alignItems: 'center',
      gap: buttonVars.spacing.gap,
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
              [buttonVars.spacing.gap]: sys.spacing[0],
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
              paddingInline: buttonVars.spacing.block,
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
