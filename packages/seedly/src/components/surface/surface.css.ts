import { assignVars, createThemeContract } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { sys } from '../../styles';
import { components } from '../../styles/layers.css';
import {
  layoutRecipe,
  layoutSpacingStyles,
  layoutElevationStyles,
  layoutRadiusStyles,
} from '../layout/layout.css';

export const surfaceVars = createThemeContract({
  color: {
    base: null,
    background: null,
    foreground: null,
    outline: null,
  },
});

const surfaceColorDefaults = assignVars(surfaceVars.color, {
  base: sys.color.surface.base,
  background: sys.color.surface.base,
  foreground: sys.color.content.base,
  outline: 'transparent',
});

const surfaceLevelStyles = {
  dim: {
    '@layer': {
      [components]: {
        vars: {
          [surfaceVars.color.base]: sys.color.surface.dim,
          [surfaceVars.color.background]: sys.color.surface.dim,
        },
      },
    },
  },
  base: {
    '@layer': {
      [components]: {
        vars: {
          [surfaceVars.color.base]: sys.color.surface.base,
          [surfaceVars.color.background]: sys.color.surface.base,
        },
      },
    },
  },
  bright: {
    '@layer': {
      [components]: {
        vars: {
          [surfaceVars.color.base]: sys.color.surface.bright,
          [surfaceVars.color.background]: sys.color.surface.bright,
        },
      },
    },
  },
} as const;

const surfaceVariantStyles = {
  solid: {
    '@layer': {
      [components]: {
        vars: {
          [surfaceVars.color.outline]: 'transparent',
          [surfaceVars.color.background]: surfaceVars.color.base,
        },
      },
    },
  },
  outline: {
    '@layer': {
      [components]: {
        vars: {
          [surfaceVars.color.background]: 'transparent',
          [surfaceVars.color.outline]:
            `color-mix(in srgb, ${sys.color.content.base} calc(${sys.state.muted.text} * 100%), ${surfaceVars.color.base})`,
        },
      },
    },
  },
  bare: {
    '@layer': {
      [components]: {
        vars: {
          [surfaceVars.color.background]: 'transparent',
          [surfaceVars.color.outline]: 'transparent',
        },
      },
    },
  },
} as const;

export const surfaceRecipe = recipe({
  base: [
    layoutRecipe.classNames.base,
    {
      '@layer': {
        [components]: {
          color: surfaceVars.color.foreground,
          backgroundColor: surfaceVars.color.background,

          vars: {
            ...surfaceColorDefaults,
          },

          selectors: {
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              border: '1px solid',
              borderColor: surfaceVars.color.outline,
              borderRadius: 'inherit',
              pointerEvents: 'none',
              boxSizing: 'border-box',
            },
          },
        },
      },
    },
  ],

  variants: {
    variant: surfaceVariantStyles,
    level: surfaceLevelStyles,
    spacing: layoutSpacingStyles,
    elevation: layoutElevationStyles,
    radius: layoutRadiusStyles,
  },

  defaultVariants: {
    variant: 'solid',
    level: 'base',
  },
});

export type SurfaceVariants = NonNullable<RecipeVariants<typeof surfaceRecipe>>;
