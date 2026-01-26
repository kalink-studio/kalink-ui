import {
  assignVars,
  createThemeContract,
  globalStyle,
  style,
} from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { createResponsiveVariants, defaultMedia } from '../../styles';
import { components } from '../../styles/layers.css';

export const frameVars = createThemeContract({
  layout: {
    ratio: null,
  },
});

const frameLayoutDefaults = assignVars(frameVars.layout, {
  ratio: 'auto',
});

export const frameRatioStyles = {
  '1:1': {
    '@layer': {
      [components]: {
        vars: {
          ...assignVars(frameVars.layout, {
            ratio: '1 / 1',
          }),
        },
      },
    },
  },
  '3:2': {
    '@layer': {
      [components]: {
        vars: {
          ...assignVars(frameVars.layout, {
            ratio: '3 / 2',
          }),
        },
      },
    },
  },
  '2:3': {
    '@layer': {
      [components]: {
        vars: {
          ...assignVars(frameVars.layout, {
            ratio: '2 / 3',
          }),
        },
      },
    },
  },
  '4:3': {
    '@layer': {
      [components]: {
        vars: {
          ...assignVars(frameVars.layout, {
            ratio: '4 / 3',
          }),
        },
      },
    },
  },
  '16:9': {
    '@layer': {
      [components]: {
        vars: {
          ...assignVars(frameVars.layout, {
            ratio: '16 / 9',
          }),
        },
      },
    },
  },
  '9:16': {
    '@layer': {
      [components]: {
        vars: {
          ...assignVars(frameVars.layout, {
            ratio: '9 / 16',
          }),
        },
      },
    },
  },
} as const;

const baseFrame = style({
  '@layer': {
    [components]: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      overflow: 'hidden',

      aspectRatio: frameVars.layout.ratio,

      vars: {
        ...frameLayoutDefaults,
      },
    },
  },
});

export const frameRecipe = recipe({
  base: baseFrame,

  variants: {
    /**
     * The ratio of the frame
     */
    ratio: frameRatioStyles,
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

export const ratioAt = createResponsiveVariants({
  styles: frameRatioStyles,
  media: defaultMedia,
});
