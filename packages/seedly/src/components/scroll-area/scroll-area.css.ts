import { createVar, style } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { sys, transition } from '../../styles';
import { components } from '../../styles/layers.css';

export const viewportMaxHeight = createVar();

export const scrollArea = style({
  '@layer': {
    [components]: {
      overflow: 'hidden',
      height: '100%',

      position: 'relative',
    },
  },
});

export const scrollAreaViewport = style({
  '@layer': {
    [components]: {
      height: '100%',
      maxHeight: viewportMaxHeight,
      width: '100%',

      borderRadius: 'inherit',

      vars: {
        [viewportMaxHeight]: 'initial',
      },
    },
  },
});

export const scrollAreaScrollbarRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        display: 'flex',

        padding: 1,

        transition: transition(['color', 'background-color', 'border-color'], {
          duration: 'medium.2',
        }),
        userSelect: 'none',
      },
    },
  },

  variants: {
    orientation: {
      vertical: {
        '@layer': {
          [components]: {
            height: '100%',
            width: 10,

            borderInlineStartWidth: 1,
            borderInlineStartColor: 'transparent',
          },
        },
      },

      horizontal: {
        '@layer': {
          [components]: {
            height: 10,
            width: '100%',

            borderBlockStartWidth: 1,
            borderBlockStartColor: 'transparent',
          },
        },
      },
    },
  },
});

export const scrollAreaThumb = style({
  '@layer': {
    [components]: {
      flexGrow: 1,

      position: 'relative',

      borderRadius: sys.shape.corner.small,

      backgroundColor: sys.surface.foreground,
    },
  },
});

export type ScrollAreaScrollbarVariants = NonNullable<
  RecipeVariants<typeof scrollAreaScrollbarRecipe>
>;
