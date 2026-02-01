import { assignVars, createThemeContract } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import {
  createToneAssignments,
  createToneStyles,
  sys,
  typography,
} from '../../styles';
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

const formFieldToneVars = createThemeContract({
  base: null,
  onBase: null,
});

const formFieldToneAssignments = createToneAssignments(formFieldToneVars);

const formFieldToneStyles = createToneStyles(formFieldToneVars, ({ base }) => ({
  [formFieldVars.color.foreground]: base,
  [formFieldVars.color.outline]: base,
}));

export const formFieldRecipe = recipe({
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
            foreground: sys.surface.foreground,
            background: sys.surface.background,
            outline: sys.surface.foreground,
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
                `color-mix(in srgb, ${sys.surface.foreground} calc(${sys.state.disabled.text} * 100%), transparent)`,
              [formFieldVars.color.outline]:
                `color-mix(in srgb, ${sys.surface.foreground} calc(${sys.state.disabled.border} * 100%), transparent)`,
            },
          },

          '&[aria-invalid], &:has([aria-invalid])': {
            vars: {
              [formFieldVars.color.foreground]: sys.tone.destructive,
              [formFieldVars.color.outline]: sys.tone.destructive,
              ...formFieldToneAssignments.destructive,
            },
          },
        },
      },
    },
  },

  variants: {
    tone: formFieldToneStyles,

    error: {
      true: {
        '@layer': {
          [components]: {
            vars: {
              [formFieldVars.color.foreground]: sys.tone.destructive,
              [formFieldVars.color.outline]: sys.tone.destructive,
              ...formFieldToneAssignments.destructive,
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
                `color-mix(in srgb, ${sys.surface.foreground} calc(${sys.state.disabled.text} * 100%), transparent)`,
              [formFieldVars.color.outline]:
                `color-mix(in srgb, ${sys.surface.foreground} calc(${sys.state.disabled.border} * 100%), transparent)`,
            },
          },
        },
      },
    },
  },
});

export const formFieldMessageRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        display: 'block',

        selectors: {
          '&[data-tone="neutral"]': {
            color: sys.tone.neutral,
          },
          '&[data-tone="primary"]': {
            color: sys.tone.primary,
          },
          '&[data-tone="destructive"]': {
            color: sys.tone.destructive,
          },
          '&[data-tone="success"]': {
            color: sys.tone.success,
          },
        },
      },
    },
  },

  variants: {
    size: {
      sm: typography.body.small,
      md: typography.body.medium,
      lg: typography.body.large,
    },
  },

  defaultVariants: {
    size: 'sm',
  },
});

export type FormFieldVariants = NonNullable<
  RecipeVariants<typeof formFieldRecipe>
>;

export type FormFieldMessageVariants = NonNullable<
  RecipeVariants<typeof formFieldMessageRecipe>
>;
