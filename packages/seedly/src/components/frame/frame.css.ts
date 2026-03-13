import {
  assignVars,
  createThemeContract,
  globalStyle,
  style,
} from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { createResponsiveVariants, defaultMedia } from '../../styles';
import { layouts } from '../../styles/layers.css';

export const frameVars = createThemeContract({
  layout: {
    rootAspectRatio: null,
  },
});

const frameDefaults = assignVars(frameVars, {
  layout: {
    rootAspectRatio: 'auto',
  },
});

export const frameRatioStyles = {
  '1:1': {
    '@layer': {
      [layouts]: {
        vars: {
          ...assignVars(frameVars, {
            layout: {
              rootAspectRatio: '1 / 1',
            },
          }),
        },
      },
    },
  },
  '3:2': {
    '@layer': {
      [layouts]: {
        vars: {
          ...assignVars(frameVars, {
            layout: {
              rootAspectRatio: '3 / 2',
            },
          }),
        },
      },
    },
  },
  '2:3': {
    '@layer': {
      [layouts]: {
        vars: {
          ...assignVars(frameVars, {
            layout: {
              rootAspectRatio: '2 / 3',
            },
          }),
        },
      },
    },
  },
  '4:3': {
    '@layer': {
      [layouts]: {
        vars: {
          ...assignVars(frameVars, {
            layout: {
              rootAspectRatio: '4 / 3',
            },
          }),
        },
      },
    },
  },
  '16:9': {
    '@layer': {
      [layouts]: {
        vars: {
          ...assignVars(frameVars, {
            layout: {
              rootAspectRatio: '16 / 9',
            },
          }),
        },
      },
    },
  },
  '9:16': {
    '@layer': {
      [layouts]: {
        vars: {
          ...assignVars(frameVars, {
            layout: {
              rootAspectRatio: '9 / 16',
            },
          }),
        },
      },
    },
  },
} as const;

const baseFrame = style({
  '@layer': {
    [layouts]: {
      vars: frameDefaults,

      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',

      aspectRatio: frameVars.layout.rootAspectRatio,
      overflow: 'hidden',
    },
  },
});

export const frameRecipe = recipe({
  base: baseFrame,

  variants: {
    ratio: frameRatioStyles,
  },
});

globalStyle(`${baseFrame} > img, ${baseFrame} > video`, {
  '@layer': {
    [layouts]: {
      blockSize: '100%',
      inlineSize: '100%',
      objectFit: 'cover',
    },
  },
});

export type FrameVariants = NonNullable<RecipeVariants<typeof frameRecipe>>;

export const ratioAt = createResponsiveVariants({
  styles: frameRatioStyles,
  media: defaultMedia,
});
