import { assignVars, createThemeContract } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import {
  createResponsiveVariants,
  createToneStyles,
  defaultMedia,
  mapContractVars,
  sys,
} from '../../styles';
import { components } from '../../styles/layers.css';
import { toneTokens } from '../../styles/tone';

export const boxVars = createThemeContract({
  color: {
    container: null,
    content: null,
    outline: null,
  },
  spacing: {
    block: null,
    inline: null,
  },
  shape: {
    corner: null,
  },
  elevation: {
    level: null,
  },
});

const boxToneVars = createThemeContract({
  base: null,
  onBase: null,
});

const boxColorDefaults = assignVars(boxVars.color, {
  container: 'transparent',
  content: sys.surface.foreground,
  outline: sys.surface.foreground,
});

const boxToneStyles = createToneStyles(boxToneVars, ({ base }) => ({
  [boxVars.color.content]: base,
  [boxVars.color.outline]: base,
}));

const boxSpacingDefaults = assignVars(boxVars.spacing, {
  block: sys.spacing[0],
  inline: sys.spacing[0],
});

const boxShapeDefaults = assignVars(boxVars.shape, {
  corner: sys.shape.corner.none,
});

const boxElevationDefaults = assignVars(boxVars.elevation, {
  level: sys.elevation.none,
});

export const boxVariantStyles = {
  solid: {
    '@layer': {
      [components]: {
        vars: {
          ...assignVars(boxVars.color, {
            container: sys.surface.background,
            content: sys.surface.foreground,
            outline: 'transparent',
          }),
        },
      },
    },
  },
  outline: {
    '@layer': {
      [components]: {
        borderColor: boxVars.color.outline,
        borderStyle: 'solid',
        borderWidth: '1px',

        vars: {
          ...assignVars(boxVars.color, {
            container: 'transparent',
            content: boxVars.color.outline,
            outline: boxVars.color.outline,
          }),
        },
      },
    },
  },
} as const;

const boxToneCompoundVariants = (
  Object.keys(toneTokens) as (keyof typeof toneTokens)[]
).map((tone) => ({
  variants: { variant: 'solid' as const, tone } as const,
  style: {
    '@layer': {
      [components]: {
        vars: {
          ...assignVars(boxVars.color, {
            container: boxToneVars.base,
            content: boxToneVars.onBase,
            outline: 'transparent',
          }),
        },
      },
    },
  },
}));

// Shared variant styles to support responsive overrides
export const boxSpacingStyles = mapContractVars(sys.spacing, (key) => ({
  '@layer': {
    [components]: {
      vars: {
        ...assignVars(boxVars.spacing, {
          block: sys.spacing[key],
          inline: sys.spacing[key],
        }),
      },
    },
  },
}));

export const boxElevationStyles = mapContractVars(sys.elevation, (key) => ({
  '@layer': {
    [components]: {
      vars: {
        ...assignVars(boxVars.elevation, {
          level: sys.elevation[key],
        }),
      },
    },
  },
}));

export const boxRadiusStyles = mapContractVars(sys.shape.corner, (key) => ({
  '@layer': {
    [components]: {
      vars: {
        ...assignVars(boxVars.shape, {
          corner: sys.shape.corner[key],
        }),
      },
    },
  },
}));

export const boxRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        paddingBlock: boxVars.spacing.block,
        paddingInline: boxVars.spacing.inline,

        color: boxVars.color.content,

        backgroundColor: boxVars.color.container,
        borderRadius: boxVars.shape.corner,
        boxShadow: boxVars.elevation.level,

        vars: {
          ...boxColorDefaults,
          ...boxSpacingDefaults,
          ...boxShapeDefaults,
          ...boxElevationDefaults,
        },
      },
    },
  },

  variants: {
    /**
     * The main variation of the box
     */
    variant: boxVariantStyles,

    /**
     * The spacing between the box borders and its contents
     */
    spacing: boxSpacingStyles,

    /**
     * The elevation of the box
     */
    elevation: boxElevationStyles,

    /**
     * The radius of the box
     */
    radius: boxRadiusStyles,

    /**
     * The color tone of the box
     */
    tone: boxToneStyles,
  },

  compoundVariants: boxToneCompoundVariants,
});

export type BoxVariants = NonNullable<RecipeVariants<typeof boxRecipe>>;

export const spacingAt = createResponsiveVariants({
  styles: boxSpacingStyles,
  media: defaultMedia,
});

export const radiusAt = createResponsiveVariants({
  styles: boxRadiusStyles,
  media: defaultMedia,
});

export const elevationAt = createResponsiveVariants({
  styles: boxElevationStyles,
  media: defaultMedia,
});
