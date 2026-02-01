import {
  assignVars,
  createThemeContract,
  globalStyle,
} from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import {
  createToneStyles,
  createResponsiveVariants,
  defaultMedia,
  sys,
  typography,
} from '../../styles';
import { components } from '../../styles/layers.css';
import { transition } from '../../styles/transition';

export const buttonVars = createThemeContract({
  borderRadius: null,
  textTransform: null,
  color: {
    foreground: null,
    background: null,
    outline: null,
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

const buttonToneVars = createThemeContract({
  base: null,
  onBase: null,
});

// Extracted variant style maps for responsive overrides
const buttonVariantVars = createThemeContract({
  foreground: null,
  background: null,
  outline: null,
});

const buttonColorDefaults = assignVars(buttonVars.color, {
  foreground: sys.surface.foreground,
  background: 'transparent',
  outline: 'transparent',
});

const buttonVariantDefaults = assignVars(buttonVariantVars, {
  foreground: buttonVars.color.foreground,
  background: buttonVars.color.background,
  outline: buttonVars.color.outline,
});

const buttonToneOverlay = assignVars(buttonVariantVars, {
  foreground: buttonToneVars.base,
  background: buttonToneVars.base,
  outline: buttonToneVars.base,
});

const buttonToneDefaults = assignVars(buttonToneVars, {
  base: sys.surface.foreground,
  onBase: sys.surface.background,
});

export const buttonToneStyles = createToneStyles(buttonToneVars);

export const buttonVariantStyles = {
  /**
   * The main variation of the button
   */
  bare: {},
  plain: {
    '@layer': {
      [components]: {
        vars: {
          ...buttonColorDefaults,
          ...buttonToneOverlay,
          [buttonVariantVars.foreground]: buttonToneVars.onBase,
          [buttonVariantVars.background]: buttonToneVars.base,
          [buttonVariantVars.outline]: 'transparent',

          ...assignVars(buttonVars.border, {
            width: '1px',
            style: 'solid',
            color: 'transparent',
          }),
        },
        ':hover': {
          vars: {
            [buttonVariantVars.background]: `color-mix(in srgb, ${buttonToneVars.base}, ${buttonToneVars.onBase} calc(100% * ${sys.state.hovered.opacity}))`,

            [buttonVars.shadow.level]: sys.elevation.minimal,
          },
        },
        ':disabled': {
          vars: {
            [buttonVariantVars.foreground]: `color-mix(in srgb, ${buttonToneVars.base} calc(100% * ${sys.state.disabled.text}), transparent)`,
            [buttonVariantVars.background]: `color-mix(in srgb, ${buttonToneVars.base} calc(100% * ${sys.state.disabled.background}), transparent)`,
            [buttonVars.shadow.level]: sys.elevation.none,
            [buttonVars.border.color]: 'transparent',
          },
        },
      },
    },
  },
  outline: {
    '@layer': {
      [components]: {
        vars: {
          ...buttonColorDefaults,
          ...buttonToneOverlay,
          [buttonVariantVars.background]: 'unset',
          ...assignVars(buttonVars.border, {
            width: '1px',
            style: 'solid',
            color: buttonVariantVars.outline,
          }),
        },
        selectors: {
          '&:hover': {
            vars: {
              [buttonVariantVars.background]: `color-mix(in srgb, ${buttonToneVars.base} calc(100% * ${sys.state.hovered.opacity}), transparent)`,
            },
          },
          '&:disabled': {
            vars: {
              [buttonVariantVars.background]: 'unset',
              [buttonVariantVars.foreground]: `color-mix(in srgb, ${buttonToneVars.base} calc(100% * ${sys.state.disabled.text}), transparent)`,
              [buttonVars.border.color]:
                `color-mix(in srgb, ${buttonToneVars.base} calc(100% * ${sys.state.disabled.border}), transparent)`,
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
          ...buttonColorDefaults,
          ...buttonToneOverlay,
          [buttonVariantVars.background]: 'unset',
          [buttonVariantVars.outline]: 'transparent',
          ...assignVars(buttonVars.border, {
            width: '1px',
            style: 'solid',
            color: 'transparent',
          }),
        },
        selectors: {
          '&:hover': {
            vars: {
              [buttonVariantVars.background]: `color-mix(in srgb, ${buttonToneVars.base} calc(100% * ${sys.state.hovered.opacity}), transparent)`,
            },
          },
          '&:disabled': {
            vars: {
              [buttonVariantVars.background]: 'unset',
              [buttonVariantVars.foreground]: `color-mix(in srgb, ${buttonToneVars.base} calc(100% * ${sys.state.disabled.text}), transparent)`,
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
          ...buttonColorDefaults,
          ...buttonToneOverlay,
          [buttonVariantVars.background]: 'unset',
          [buttonVariantVars.outline]: 'transparent',
          ...assignVars(buttonVars.spacing, {
            block: '0',
            inline: '0',
            inner: '0',
          }),
          ...assignVars(buttonVars.border, {
            width: '0',
            style: 'solid',
            color: 'transparent',
          }),
        },
        selectors: {
          '&:hover': {
            textDecoration: 'underline',
          },
          '&:disabled': {
            textDecoration: 'none',
            vars: {
              [buttonVariantVars.foreground]: `color-mix(in srgb, ${buttonToneVars.base} calc(100% * ${sys.state.disabled.text}), transparent)`,
            },
          },
        },
      },
    },
  },
} as const;

const compactSpacingStyle = {
  '@layer': {
    [components]: {
      vars: {
        [buttonVars.spacing.block]: '0',
        [buttonVars.spacing.inline]: '0',
      },
    },
  },
};

const compactSpacingVariants = (['sm', 'md', 'lg'] as const).flatMap((size) => [
  {
    variants: {
      variant: 'bare',
      size,
    },
    style: compactSpacingStyle,
  },
  {
    variants: {
      variant: 'link',
      size,
    },
    style: compactSpacingStyle,
  },
]) as {
  variants: {
    variant: 'bare' | 'link';
    size: 'sm' | 'md' | 'lg';
  };
  style: typeof compactSpacingStyle;
}[];

export const buttonSizeStyles = {
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
} as const;

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

        color: buttonVariantVars.foreground,
        textTransform: buttonVars.textTransform,

        backgroundColor: buttonVariantVars.background,
        borderRadius: buttonVars.borderRadius,
        borderWidth: buttonVars.border.width,
        borderStyle: buttonVars.border.style,
        borderColor: buttonVars.border.color,
        boxShadow: buttonVars.shadow.level,

        vars: {
          ...buttonColorDefaults,
          ...buttonVariantDefaults,
          ...buttonToneDefaults,
          [buttonVars.borderRadius]: sys.shape.corner.none,
          [buttonVars.textTransform]: 'unset',
          [buttonVars.border.width]: '0',
          [buttonVars.border.style]: 'solid',
          [buttonVars.border.color]: 'transparent',
          [buttonVars.shadow.level]: sys.elevation.none,
        },

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
    variant: buttonVariantStyles,
    size: buttonSizeStyles,
    tone: buttonToneStyles,
  },

  compoundVariants: compactSpacingVariants,
});

export const buttonLabelRecipe = recipe({
  variants: {
    size: {
      sm: [typography.label.small],
      md: [typography.label.medium],
      lg: [typography.label.large],
    },
  },
});

export const buttonSlotRecipe = recipe({
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

export const sizeAt = createResponsiveVariants({
  styles: buttonSizeStyles,
  media: defaultMedia,
});

export const variantAt = createResponsiveVariants({
  styles: buttonVariantStyles,
  media: defaultMedia,
});

export const toneAt = createResponsiveVariants({
  styles: buttonToneStyles,
  media: defaultMedia,
});

// Note: buttonLabel uses typography class composition. For responsive
// behaviors on text, prefer driving size via the root button's size.
