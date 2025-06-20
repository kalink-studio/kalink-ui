import {
  assignVars,
  createThemeContract,
  fallbackVar,
  globalStyle,
} from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { sys, typography } from '../../styles';
import { components } from '../../styles/layers.css';
import { transition } from '../../styles/transition';

export const buttonVars = createThemeContract({
  borderRadius: null,
  textTransform: null,
  color: {
    text: null,
    background: null,
  },
  spacing: {
    block: null,
    inline: null,
    inner: null,
  },
  border: {
    width: null,
    style: null,
    color: null,
  },
  shadow: {
    level: null,
  },
});

export const buttonRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: buttonVars.spacing.inner,

        paddingBlock: buttonVars.spacing.block,
        paddingInline: buttonVars.spacing.inline,

        color: buttonVars.color.text,
        textTransform: fallbackVar(buttonVars.textTransform, 'unset'),
        backgroundColor: buttonVars.color.background,
        borderRadius: fallbackVar(
          buttonVars.borderRadius,
          sys.shape.corner.none,
        ),
        borderWidth: buttonVars.border.width,
        borderStyle: buttonVars.border.style,
        borderColor: buttonVars.border.color,
        boxShadow: buttonVars.shadow.level,

        transition: transition(
          ['background-color', 'box-shadow', 'border-color', 'color'],
          { duration: 'short.3' },
        ),

        ':disabled': {
          cursor: 'not-allowed',
        },
      },
    },
  },

  variants: {
    /**
     * The main variation of the button
     */
    variant: {
      bare: {},
      plain: {
        '@layer': {
          [components]: {
            vars: {
              ...assignVars(buttonVars.color, {
                text: sys.color.background,
                background: sys.color.foreground,
              }),
              ...assignVars(buttonVars.border, {
                width: '1px',
                style: 'solid',
                color: 'transparent',
              }),
            },
            ':hover': {
              vars: {
                [buttonVars.color.background]:
                  `color-mix(in srgb, ${sys.color.foreground}, ${sys.color.background} calc(100% * ${sys.state.hovered.opacity}))`,
                [buttonVars.shadow.level]: sys.elevation.minimal,
              },
            },
            ':disabled': {
              vars: {
                ...assignVars(buttonVars.color, {
                  text: `color-mix(in srgb, ${sys.color.background} calc(100% * ${sys.state.muted.light}), transparent)`,
                  background: `color-mix(in srgb, ${sys.color.foreground} calc(100% * ${sys.state.muted.dark}), transparent)`,
                }),
                [buttonVars.shadow.level]: sys.elevation.none,
                [buttonVars.border.color]: `transparent`,
              },
            },
          },
        },
      },
      outline: {
        '@layer': {
          [components]: {
            vars: {
              ...assignVars(buttonVars.color, {
                text: sys.color.foreground,
                background: 'unset',
              }),
              ...assignVars(buttonVars.border, {
                width: '1px',
                style: 'solid',
                color: sys.color.foreground,
              }),
            },
            selectors: {
              '&:hover': {
                vars: {
                  [buttonVars.color.background]:
                    `color-mix(in srgb, ${sys.color.foreground} calc(100% * ${sys.state.hovered.opacity}), transparent)`,
                },
              },
              '&:disabled': {
                vars: {
                  [buttonVars.color.background]: 'unset',
                  [buttonVars.color.text]:
                    `color-mix(in srgb, ${sys.color.foreground} calc(100% * ${sys.state.muted.dark}), transparent)`,
                  [buttonVars.border.color]:
                    `color-mix(in srgb, ${sys.color.foreground} calc(100% * ${sys.state.muted.dark}), transparent)`,
                },
              },
            },
          },
        },
      },
      ghost: {
        '@layer': {
          [components]: {
            vars: {
              ...assignVars(buttonVars.color, {
                text: sys.color.foreground,
                background: 'unset',
              }),
              ...assignVars(buttonVars.border, {
                width: '1px',
                style: 'solid',
                color: 'transparent',
              }),
            },
            selectors: {
              '&:hover': {
                vars: {
                  [buttonVars.color.background]:
                    `color-mix(in srgb, ${sys.color.foreground} calc(100% * ${sys.state.hovered.opacity}), transparent)`,
                },
              },
              '&:disabled': {
                vars: {
                  [buttonVars.color.background]: 'unset',
                  [buttonVars.color.text]:
                    `color-mix(in srgb, ${sys.color.foreground} calc(100% * ${sys.state.muted.dark}), transparent)`,
                },
              },
            },
          },
        },
      },
      link: {
        '@layer': {
          [components]: {
            display: 'inline-flex',

            textDecoration: 'none',

            vars: {
              ...assignVars(buttonVars.color, {
                text: sys.color.foreground,
                background: 'unset',
              }),
              ...assignVars(buttonVars.spacing, {
                block: '0',
                inline: '0',
                inner: '0',
              }),
            },
            selectors: {
              '&:hover': {
                textDecoration: 'underline',
              },

              '&:disabled': {
                textDecoration: 'none',
                vars: {
                  [buttonVars.color.text]:
                    `color-mix(in srgb, ${sys.color.foreground} calc(100% * ${sys.state.muted.dark}), transparent)`,
                },
              },
            },
          },
        },
      },
    },

    size: {
      sm: {
        '@layer': {
          [components]: {
            vars: assignVars(buttonVars.spacing, {
              block: sys.spacing[2],
              inline: sys.spacing[3],
              inner: sys.spacing[3],
            }),
          },
        },
      },
      md: {
        '@layer': {
          [components]: {
            vars: assignVars(buttonVars.spacing, {
              block: sys.spacing[2],
              inline: sys.spacing[4],
              inner: sys.spacing[4],
            }),
          },
        },
      },
      lg: {
        '@layer': {
          [components]: {
            vars: assignVars(buttonVars.spacing, {
              block: sys.spacing[3],
              inline: sys.spacing[6],
              inner: sys.spacing[6],
            }),
          },
        },
      },
    },
  },

  compoundVariants: [
    {
      variants: {
        variant: 'bare',
        size: 'sm',
      },
      style: {
        '@layer': {
          [components]: {
            vars: {
              [buttonVars.spacing.block]: '0',
              [buttonVars.spacing.inline]: '0',
            },
          },
        },
      },
    },
    {
      variants: {
        variant: 'bare',
        size: 'md',
      },
      style: {
        '@layer': {
          [components]: {
            vars: {
              [buttonVars.spacing.block]: '0',
              [buttonVars.spacing.inline]: '0',
            },
          },
        },
      },
    },
    {
      variants: {
        variant: 'bare',
        size: 'lg',
      },
      style: {
        '@layer': {
          [components]: {
            vars: {
              [buttonVars.spacing.block]: '0',
              [buttonVars.spacing.inline]: '0',
            },
          },
        },
      },
    },
    {
      variants: {
        variant: 'link',
        size: 'sm',
      },
      style: {
        '@layer': {
          [components]: {
            vars: {
              [buttonVars.spacing.block]: '0',
              [buttonVars.spacing.inline]: '0',
            },
          },
        },
      },
    },
    {
      variants: {
        variant: 'link',
        size: 'md',
      },
      style: {
        '@layer': {
          [components]: {
            vars: {
              [buttonVars.spacing.block]: '0',
              [buttonVars.spacing.inline]: '0',
            },
          },
        },
      },
    },
    {
      variants: {
        variant: 'link',
        size: 'lg',
      },
      style: {
        '@layer': {
          [components]: {
            vars: {
              [buttonVars.spacing.block]: '0',
              [buttonVars.spacing.inline]: '0',
            },
          },
        },
      },
    },
  ],
});

export const buttonLabel = recipe({
  variants: {
    size: {
      sm: [typography.label.small],
      md: [typography.label.medium],
      lg: [typography.label.large],
    },
  },
});

export const buttonSlot = recipe({
  base: {
    flexShrink: 0,
  },

  variants: {
    position: {
      start: {},
      end: {},
    },
  },
});

globalStyle(`${buttonRecipe.classNames.variants.size.sm} svg`, {
  '@layer': {
    [components]: {
      width: calc.multiply(
        sys.typography.label.small.lineHeight,
        sys.typography.label.small.size,
      ),
      height: calc.multiply(
        sys.typography.label.small.lineHeight,
        sys.typography.label.small.size,
      ),
    },
  },
});

globalStyle(`${buttonRecipe.classNames.variants.size.md} svg`, {
  '@layer': {
    [components]: {
      width: calc.multiply(
        sys.typography.label.medium.lineHeight,
        sys.typography.label.medium.size,
      ),
      height: calc.multiply(
        sys.typography.label.medium.lineHeight,
        sys.typography.label.medium.size,
      ),
    },
  },
});

globalStyle(`${buttonRecipe.classNames.variants.size.lg} svg`, {
  '@layer': {
    [components]: {
      width: calc.multiply(
        sys.typography.label.large.lineHeight,
        sys.typography.label.large.size,
      ),
      height: calc.multiply(
        sys.typography.label.large.lineHeight,
        sys.typography.label.large.size,
      ),
    },
  },
});

export type ButtonVariants = NonNullable<RecipeVariants<typeof buttonRecipe>>;
