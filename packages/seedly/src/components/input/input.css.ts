import {
  style,
  globalStyle,
  createThemeContract,
  assignVars,
  type StyleRule,
} from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import {
  createToneAssignments,
  createToneStyles,
  createResponsiveVariants,
  defaultMedia,
  sys,
  transition,
} from '../../styles';
import { components } from '../../styles/layers.css';

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

const inputToneVars = createThemeContract({
  base: null,
  onBase: null,
});

const inputColorDefaults = assignVars(inputVars.color, {
  foreground: sys.surface.foreground,
  background: sys.surface.background,
  outline: sys.surface.foreground,
});

const inputToneAssignments = createToneAssignments(inputToneVars);

const inputToneStyles = createToneStyles(inputToneVars, ({ base }) => ({
  [inputVars.color.foreground]: base,
  [inputVars.color.outline]: base,
}));

const inputSizeStyles = {
  sm: {
    '@layer': {
      [components]: {
        fontFamily: sys.typography.body.small.font,
        fontWeight: sys.typography.body.small.weight,
        lineHeight: sys.typography.body.small.lineHeight,
        letterSpacing: sys.typography.body.small.tracking,
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

  md: {
    '@layer': {
      [components]: {
        fontFamily: sys.typography.body.medium.font,
        fontWeight: sys.typography.body.medium.weight,
        lineHeight: sys.typography.body.medium.lineHeight,
        letterSpacing: sys.typography.body.medium.tracking,
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

  lg: {
    '@layer': {
      [components]: {
        fontFamily: sys.typography.body.large.font,
        fontWeight: sys.typography.body.large.weight,
        lineHeight: sys.typography.body.large.lineHeight,
        letterSpacing: sys.typography.body.large.tracking,
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
} satisfies Record<'sm' | 'md' | 'lg', StyleRule | StyleRule[]>;

export const inputAppearanceRecipe = recipe({
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
              backgroundColor: `color-mix(in srgb, ${inputVars.color.foreground} calc(${sys.state.disabled.background} * 100%), transparent)`,

              vars: {
                [inputVars.color.foreground]:
                  `color-mix(in srgb, ${inputVars.color.foreground} calc(${sys.state.disabled.text} * 100%), transparent)`,
                [inputVars.color.outline]:
                  `color-mix(in srgb, ${inputVars.color.foreground} calc(${sys.state.disabled.border} * 100%), transparent)`,
              },
            },

            '&:focus, &:focus-within, &:focus-visible': {
              boxShadow: `0 0 0 1px ${inputVars.color.outline} inset`,
              outline: 'none',
            },

            '&[aria-invalid], &:has([aria-invalid])': {
              vars: {
                ...inputColorDefaults,
                [inputVars.color.foreground]: sys.tone.destructive,
                [inputVars.color.outline]: sys.tone.destructive,
                ...inputToneAssignments.destructive,
              },
            },
          },

          vars: {
            ...inputColorDefaults,
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
                `color-mix(in srgb, ${inputVars.color.foreground} calc(${sys.state.muted.surface} * 100%), transparent)`,
            },
          },
        },
      },

      bare: {},
    },

    tone: inputToneStyles,

    size: inputSizeStyles,
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
  `${inputAppearanceRecipe.classNames.base} input:is(:focus, :focus-visible)`,
  {
    '@layer': {
      [components]: {
        outline: 'none',
      },
    },
  },
);

export type InputAppearanceVariants = NonNullable<
  RecipeVariants<typeof inputAppearanceRecipe>
>;

export const sizeAt = createResponsiveVariants({
  styles: inputSizeStyles,
  media: defaultMedia,
});
