import { createVar, globalStyle, style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { components } from '../../styles/layers.css';

export const frameRatioVar = createVar();

const baseFrame = style({
  '@layer': {
    [components]: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      overflow: 'hidden',

      aspectRatio: frameRatioVar,
    },
  },
});

export const frameRecipe = recipe({
  base: baseFrame,

  variants: {
    /**
     * The ratio of the frame
     */
    ratio: {
      '1:1': {
        '@layer': {
          [components]: {
            vars: {
              [frameRatioVar]: '1 / 1',
            },
          },
        },
      },
      '3:2': {
        '@layer': {
          [components]: {
            vars: {
              [frameRatioVar]: '3 / 2',
            },
          },
        },
      },
      '2:3': {
        '@layer': {
          [components]: {
            vars: {
              [frameRatioVar]: '2 / 3',
            },
          },
        },
      },
      '4:3': {
        '@layer': {
          [components]: {
            vars: {
              [frameRatioVar]: '4 / 3',
            },
          },
        },
      },
      '16:9': {
        '@layer': {
          [components]: {
            vars: {
              [frameRatioVar]: '16 / 9',
            },
          },
        },
      },
      '9:16': {
        '@layer': {
          [components]: {
            vars: {
              [frameRatioVar]: '9 / 16',
            },
          },
        },
      },
    },
  },
});

globalStyle(`${baseFrame} > img, ${baseFrame} > video`, {
  '@layer': {
    [components]: {
      inlineSize: '100%',
      blockSize: '100%',
      objectFit: 'cover',
    },
  },
});

export type FrameVariants = NonNullable<RecipeVariants<typeof frameRecipe>>;
