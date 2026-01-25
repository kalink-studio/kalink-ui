import { assignVars, createThemeContract } from '@vanilla-extract/css';
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

const formFieldToneVars = createThemeContract({
  base: null,
  onBase: null,
});

const formFieldToneDefaults = assignVars(formFieldToneVars, {
  base: sys.tone.neutral,
  onBase: sys.tone.onNeutral,
});

const formFieldTonePrimary = assignVars(formFieldToneVars, {
  base: sys.tone.primary,
  onBase: sys.tone.onPrimary,
});

const formFieldToneDestructive = assignVars(formFieldToneVars, {
  base: sys.tone.destructive,
  onBase: sys.tone.onDestructive,
});

const formFieldToneSuccess = assignVars(formFieldToneVars, {
  base: sys.tone.success,
  onBase: sys.tone.onSuccess,
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
            foreground: sys.surface.foreground,
            background: sys.surface.background,
            outline: sys.surface.foreground,
          }),
          ...formFieldToneDefaults,
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
              ...formFieldToneDestructive,
            },
          },
        },
      },
    },
  },

  variants: {
    tone: {
      neutral: {
        '@layer': {
          [components]: {
            vars: {
              [formFieldVars.color.foreground]: sys.tone.neutral,
              [formFieldVars.color.outline]: sys.tone.neutral,
              ...formFieldToneDefaults,
            },
          },
        },
      },
      primary: {
        '@layer': {
          [components]: {
            vars: {
              [formFieldVars.color.foreground]: sys.tone.primary,
              [formFieldVars.color.outline]: sys.tone.primary,
              ...formFieldTonePrimary,
            },
          },
        },
      },
      destructive: {
        '@layer': {
          [components]: {
            vars: {
              [formFieldVars.color.foreground]: sys.tone.destructive,
              [formFieldVars.color.outline]: sys.tone.destructive,
              ...formFieldToneDestructive,
            },
          },
        },
      },
      success: {
        '@layer': {
          [components]: {
            vars: {
              [formFieldVars.color.foreground]: sys.tone.success,
              [formFieldVars.color.outline]: sys.tone.success,
              ...formFieldToneSuccess,
            },
          },
        },
      },
    },

    error: {
      true: {
        '@layer': {
          [components]: {
            vars: {
              [formFieldVars.color.foreground]: sys.tone.destructive,
              [formFieldVars.color.outline]: sys.tone.destructive,
              ...formFieldToneDestructive,
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

  defaultVariants: {
    tone: 'neutral',
  },
});

export const formFieldMessageStyle = recipe({
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
  RecipeVariants<typeof formFieldStyle>
>;

export type FormFieldMessageVariants = NonNullable<
  RecipeVariants<typeof formFieldMessageStyle>
>;
