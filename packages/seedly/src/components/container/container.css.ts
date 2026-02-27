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

const subtleContainerOutline = `color-mix(in srgb, ${sys.color.content.base} calc(${sys.state.muted.text} * 100%), ${containerVars.color.base})`;

const createContainerLevelStyle = (baseColor: string) => {
  return {
    '@layer': {
      [components]: {
        vars: {
          [containerVars.color.base]: baseColor,
          [containerVars.color.background]: baseColor,
        },
      },
    },
  };
};

const createContainerVariantStyle = (background: string, outline: string) => {
  return {
    '@layer': {
      [components]: {
        vars: {
          [containerVars.color.background]: background,
          [containerVars.color.outline]: outline,
        },
      },
    },
  };
};

const containerLevelStyles = {
  low: createContainerLevelStyle(sys.color.container.low),
  base: createContainerLevelStyle(sys.color.container.base),
  high: createContainerLevelStyle(sys.color.container.high),
  top: createContainerLevelStyle(sys.color.container.top),
} as const;

const containerVariantStyles = {
  solid: createContainerVariantStyle(containerVars.color.base, 'transparent'),
  outline: createContainerVariantStyle('transparent', subtleContainerOutline),
  bare: createContainerVariantStyle('transparent', 'transparent'),
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
              inset: 0,
              position: 'absolute',
              border: '1px solid',
              borderColor: containerVars.color.outline,
              borderRadius: 'inherit',
              content: '""',
              pointerEvents: 'none',
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
