import { assignVars, createThemeContract } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { sys } from '../../styles';
import { layouts } from '../../styles/layers.css';
import {
  layoutCornerStyles,
  layoutElevationStyles,
  layoutRecipe,
  layoutSpacingStyles,
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
      [layouts]: {
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
      [layouts]: {
        vars: {
          [containerVars.color.rootBackground]: rootBackground,
          [containerVars.color.rootOutline]: rootOutline,
        },
      },
    },
  };
};

export const containerRecipe = recipe({
  base: [
    layoutRecipe.classNames.base,
    {
      '@layer': {
        [layouts]: {
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
    variant: {
      solid: createContainerVariantStyle(
        containerVars.color.rootLevelBackground,
        'transparent',
      ),
      outline: createContainerVariantStyle(
        'transparent',
        subtleContainerOutline,
      ),
      bare: createContainerVariantStyle('transparent', 'transparent'),
    },
    level: {
      low: createContainerLevelStyle(sys.color.container.low),
      base: createContainerLevelStyle(sys.color.container.base),
      high: createContainerLevelStyle(sys.color.container.high),
      top: createContainerLevelStyle(sys.color.container.top),
    },
    spacing: layoutSpacingStyles,
    elevation: layoutElevationStyles,
    corner: layoutCornerStyles,
  },

  defaultVariants: {
    variant: 'solid',
    level: 'base',
  },
});

export type ContainerVariants = NonNullable<
  RecipeVariants<typeof containerRecipe>
>;
