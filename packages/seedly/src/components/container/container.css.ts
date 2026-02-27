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

const containerVars = createThemeContract({
  color: {
    rootBackground: null,
    rootForeground: null,
    rootLevelBackground: null,
    rootOutline: null,
  },
});

const containerDefaults = assignVars(containerVars, {
  color: {
    rootBackground: sys.color.container.base,
    rootForeground: sys.color.content.base,
    rootLevelBackground: sys.color.container.base,
    rootOutline: 'transparent',
  },
});

const subtleContainerOutline = `color-mix(in srgb, ${sys.color.content.base} calc(${sys.state.muted.text} * 100%), ${containerVars.color.rootLevelBackground})`;

const createContainerLevelStyle = (rootLevelBackground: string) => {
  return {
    '@layer': {
      [components]: {
        vars: {
          [containerVars.color.rootLevelBackground]: rootLevelBackground,
        },
      },
    },
  };
};

const createContainerVariantStyle = (
  rootBackground: string,
  rootOutline: string,
) => {
  return {
    '@layer': {
      [components]: {
        vars: {
          [containerVars.color.rootBackground]: rootBackground,
          [containerVars.color.rootOutline]: rootOutline,
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
  solid: createContainerVariantStyle(
    containerVars.color.rootLevelBackground,
    'transparent',
  ),
  outline: createContainerVariantStyle('transparent', subtleContainerOutline),
  bare: createContainerVariantStyle('transparent', 'transparent'),
} as const;

export const containerRecipe = recipe({
  base: [
    layoutRecipe.classNames.base,
    {
      '@layer': {
        [components]: {
          vars: {
            ...containerDefaults,
          },

          backgroundColor: containerVars.color.rootBackground,
          color: containerVars.color.rootForeground,

          selectors: {
            '&::before': {
              border: '1px solid',
              borderColor: containerVars.color.rootOutline,
              borderRadius: 'inherit',
              content: '""',
              inset: 0,
              pointerEvents: 'none',
              position: 'absolute',
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
