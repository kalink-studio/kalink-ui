import {
  assignVars,
  createThemeContract,
  fallbackVar,
  style,
} from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { sys, typography } from '../../styles';
import { components } from '../../styles/layers.css';
import { transition } from '../../styles/transition';

export const buttonVars = createThemeContract({
  borderRadius: null,
  textTransform: null,
});

const vars = createThemeContract({
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
        gap: vars.spacing.inner,

        paddingBlock: vars.spacing.block,
        paddingInline: vars.spacing.inline,

        color: vars.color.text,
        textTransform: fallbackVar(buttonVars.textTransform, 'unset'),
        backgroundColor: vars.color.background,
        borderRadius: fallbackVar(
          buttonVars.borderRadius,
          sys.shape.corner.none,
        ),
        borderWidth: vars.border.width,
        borderStyle: vars.border.style,
        borderColor: vars.border.color,
        boxShadow: vars.shadow.level,

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
              ...assignVars(vars.color, {
                text: sys.color.background,
                background: sys.color.foreground,
              }),
              ...assignVars(vars.border, {
                width: '1px',
                style: 'solid',
                color: 'transparent',
              }),
            },
            ':hover': {
              vars: {
                [vars.color.background]:
                  `color-mix(in srgb, ${sys.color.foreground}, ${sys.color.background} calc(100% * ${sys.state.hovered.opacity}))`,
                [vars.shadow.level]: sys.elevation.minimal,
              },
            },
            ':disabled': {
              vars: {
                ...assignVars(vars.color, {
                  text: `color-mix(in srgb, ${sys.color.background} calc(100% * ${sys.state.muted.light}), transparent)`,
                  background: `color-mix(in srgb, ${sys.color.foreground} calc(100% * ${sys.state.muted.dark}), transparent)`,
                }),
                [vars.shadow.level]: sys.elevation.none,
                [vars.border.color]: `transparent`,
              },
            },
          },
        },
      },
      outline: {
        '@layer': {
          [components]: {
            vars: {
              ...assignVars(vars.color, {
                text: sys.color.foreground,
                background: 'unset',
              }),
              ...assignVars(vars.border, {
                width: '1px',
                style: 'solid',
                color: sys.color.foreground,
              }),
            },
            selectors: {
              '&:hover': {
                vars: {
                  [vars.color.background]:
                    `color-mix(in srgb, ${sys.color.foreground} calc(100% * ${sys.state.hovered.opacity}), transparent)`,
                },
              },
              '&:disabled': {
                vars: {
                  [vars.color.background]: 'unset',
                  [vars.color.text]:
                    `color-mix(in srgb, ${sys.color.foreground} calc(100% * ${sys.state.muted.dark}), transparent)`,
                  [vars.border.color]:
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
              ...assignVars(vars.color, {
                text: sys.color.foreground,
                background: 'unset',
              }),
              ...assignVars(vars.border, {
                width: '1px',
                style: 'solid',
                color: 'transparent',
              }),
            },
            selectors: {
              '&:hover': {
                vars: {
                  [vars.color.background]:
                    `color-mix(in srgb, ${sys.color.foreground} calc(100% * ${sys.state.hovered.opacity}), transparent)`,
                },
              },
              '&:disabled': {
                vars: {
                  [vars.color.background]: 'unset',
                  [vars.color.text]:
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
              ...assignVars(vars.color, {
                text: sys.color.foreground,
                background: 'unset',
              }),
              ...assignVars(vars.spacing, {
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
                  [vars.color.text]:
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
            vars: assignVars(vars.spacing, {
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
            vars: assignVars(vars.spacing, {
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
            vars: assignVars(vars.spacing, {
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
              [vars.spacing.block]: '0',
              [vars.spacing.inline]: '0',
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
              [vars.spacing.block]: '0',
              [vars.spacing.inline]: '0',
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
              [vars.spacing.block]: '0',
              [vars.spacing.inline]: '0',
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
              [vars.spacing.block]: '0',
              [vars.spacing.inline]: '0',
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
              [vars.spacing.block]: '0',
              [vars.spacing.inline]: '0',
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
              [vars.spacing.block]: '0',
              [vars.spacing.inline]: '0',
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

export const buttonStartSlot = style({});
export const buttonEndSlot = style({});

export type ButtonVariants = NonNullable<RecipeVariants<typeof buttonRecipe>>;
