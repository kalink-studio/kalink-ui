import { createVar, globalStyle, style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { components } from '../../styles/layers.css';

const ratioVar = createVar();

const baseFrame = style({
  '@layer': {
    [components]: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      overflow: 'hidden',

      aspectRatio: ratioVar,
    },
  },
});

export const frameRecipe = recipe({
  base: baseFrame,

  variants: {
    ratio: {
      '1:1': {
        '@layer': {
          [components]: {
            vars: {
              [ratioVar]: '1 / 1',
            },
          },
        },
      },
      '3:2': {
        '@layer': {
          [components]: {
            vars: {
              [ratioVar]: '3 / 2',
            },
          },
        },
      },
      '2:3': {
        '@layer': {
          [components]: {
            vars: {
              [ratioVar]: '2 / 3',
            },
          },
        },
      },
      '4:3': {
        '@layer': {
          [components]: {
            vars: {
              [ratioVar]: '4 / 3',
            },
          },
        },
      },
      '16:9': {
        '@layer': {
          [components]: {
            vars: {
              [ratioVar]: '16 / 9',
            },
          },
        },
      },
      '9:16': {
        '@layer': {
          [components]: {
            vars: {
              [ratioVar]: '9 / 16',
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
