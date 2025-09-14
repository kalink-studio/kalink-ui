import { assignVars, createThemeContract, style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { sys, typography } from '../../styles';
import { components } from '../../styles/layers.css';

export const formFieldVars = createThemeContract({
  spacing: {
    vertical: null,
  },

  color: {
    foreground: null,
    background: null,
    outline: null,
  },
});

export const formFieldStyle = recipe({
  base: {
    '@layer': {
      [components]: {
        display: 'flex',
        flexDirection: 'column',
        gap: formFieldVars.spacing.vertical,

        width: '100%',
        maxWidth: '100%',

        color: formFieldVars.color.foreground,

        vars: {
          ...assignVars(formFieldVars.color, {
            foreground: sys.color.foreground,
            background: sys.color.background,
            outline: sys.color.foreground,
          }),

          ...assignVars(formFieldVars.spacing, {
            vertical: sys.spacing[2],
          }),
        },

        selectors: {
          '&:disabled, &:has(:disabled)': {
            cursor: 'not-allowed',

            vars: {
              [formFieldVars.color.foreground]:
                `color(from ${sys.color.foreground} srgb r g b / 0.38)`,
            },
          },

          '&[aria-invalid], &:has([aria-invalid])': {
            vars: {
              [formFieldVars.color.foreground]: 'red',
            },
          },
        },
      },
    },
  },

  variants: {
    error: {
      true: {
        '@layer': {
          [components]: {
            vars: {
              [formFieldVars.color.foreground]: 'red',
            },
          },
        },
      },
    },

    disabled: {
      true: {
        '@layer': {
          [components]: {
            cursor: 'not-allowed',

            vars: {
              [formFieldVars.color.foreground]:
                `color(from ${sys.color.foreground} srgb r g b / ${sys.state.muted.light})`,
            },
          },
        },
      },
    },
  },
});

export const formFieldMessageStyle = style([
  typography.body.small,
  {
    '@layer': {
      [components]: {
        display: 'block',
      },
    },
  },
]);

export type FormFieldVariants = NonNullable<
  RecipeVariants<typeof formFieldStyle>
>;
