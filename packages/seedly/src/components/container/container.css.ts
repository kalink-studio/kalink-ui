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

export const containerVars = createThemeContract({
  color: {
    base: null,
    background: null,
    foreground: null,
    outline: null,
  },
});

const containerColorDefaults = assignVars(containerVars.color, {
  base: sys.color.container.base,
  background: sys.color.container.base,
  foreground: sys.color.content.base,
  outline: 'transparent',
});

const containerLevelStyles = {
  low: {
    '@layer': {
      [components]: {
        vars: {
          [containerVars.color.base]: sys.color.container.low,
          [containerVars.color.background]: sys.color.container.low,
        },
      },
    },
  },
  base: {
    '@layer': {
      [components]: {
        vars: {
          [containerVars.color.base]: sys.color.container.base,
          [containerVars.color.background]: sys.color.container.base,
        },
      },
    },
  },
  high: {
    '@layer': {
      [components]: {
        vars: {
          [containerVars.color.base]: sys.color.container.high,
          [containerVars.color.background]: sys.color.container.high,
        },
      },
    },
  },
  top: {
    '@layer': {
      [components]: {
        vars: {
          [containerVars.color.base]: sys.color.container.top,
          [containerVars.color.background]: sys.color.container.top,
        },
      },
    },
  },
} as const;

const containerVariantStyles = {
  solid: {
    '@layer': {
      [components]: {
        vars: {
          [containerVars.color.outline]: 'transparent',
          [containerVars.color.background]: containerVars.color.base,
        },
      },
    },
  },
  outline: {
    '@layer': {
      [components]: {
        vars: {
          [containerVars.color.background]: 'transparent',
          [containerVars.color.outline]:
            `color-mix(in srgb, ${sys.color.content.base} calc(${sys.state.muted.text} * 100%), ${containerVars.color.base})`,
        },
      },
    },
  },
  bare: {
    '@layer': {
      [components]: {
        vars: {
          [containerVars.color.background]: 'transparent',
          [containerVars.color.outline]: 'transparent',
        },
      },
    },
  },
} as const;

export const containerRecipe = recipe({
  base: [
    layoutRecipe.classNames.base,
    {
      '@layer': {
        [components]: {
          color: containerVars.color.foreground,
          backgroundColor: containerVars.color.background,

          vars: {
            ...containerColorDefaults,
          },

          selectors: {
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              border: '1px solid',
              borderColor: containerVars.color.outline,
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
    variant: containerVariantStyles,
    level: containerLevelStyles,
    spacing: layoutSpacingStyles,
    elevation: layoutElevationStyles,
    radius: layoutRadiusStyles,
  },

  defaultVariants: {
    variant: 'solid',
    level: 'base',
  },
});

export type ContainerVariants = NonNullable<
  RecipeVariants<typeof containerRecipe>
>;
