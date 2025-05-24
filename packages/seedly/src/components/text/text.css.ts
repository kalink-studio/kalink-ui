import { createVar, style } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { components } from '../../styles/layers.css';

export const lineClampNumber = createVar();
export const textAlign = createVar();

const lineClamp = style({
  '@layer': {
    [components]: {
      display: '-webkit-box',
      WebkitLineClamp: lineClampNumber,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    },
  },
});

export const textRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        textAlign,

        vars: {
          [textAlign]: 'inherit',
        },
      },
    },
  },
  variants: {
    /**
     * Controls the wrapping of the text.
     */
    wrap: {
      true: {
        '@layer': {
          [components]: {
            textWrap: 'wrap',
          },
        },
      },
      false: {
        '@layer': {
          [components]: {
            textWrap: 'nowrap',
          },
        },
      },
      balance: {
        '@layer': {
          [components]: {
            textWrap: 'balance',
          },
        },
      },
      pretty: {
        '@layer': {
          [components]: {
            textWrap: 'pretty',
          },
        },
      },
    },

    /**
     * If true, use an ellipsis when the text overflows the element.
     */
    truncate: {
      true: {
        '@layer': {
          [components]: {
            display: 'inline-block',
            maxWidth: '100%',
            overflow: 'hidden',

            textOverflow: 'ellipsis',
          },
        },
      },
    },

    /**
     * If provided, the text will be truncated and displayed with a maximum of
     * the provided number of lines.
     */
    lineClamp: {
      2: [
        lineClamp,
        {
          '@layer': {
            [components]: {
              vars: {
                [lineClampNumber]: '2',
              },
            },
          },
        },
      ],
      3: [
        lineClamp,
        {
          '@layer': {
            [components]: {
              vars: {
                [lineClampNumber]: '3',
              },
            },
          },
        },
      ],
      4: [
        lineClamp,
        {
          '@layer': {
            [components]: {
              vars: {
                [lineClampNumber]: '4',
              },
            },
          },
        },
      ],
      5: [
        lineClamp,
        {
          '@layer': {
            [components]: {
              vars: {
                [lineClampNumber]: '5',
              },
            },
          },
        },
      ],
    },

    /**
     * Controls the alignment of the text.
     */
    align: {
      start: {
        '@layer': {
          [components]: {
            vars: {
              [textAlign]: 'start',
            },
          },
        },
      },
      center: {
        '@layer': {
          [components]: {
            vars: {
              [textAlign]: 'center',
            },
          },
        },
      },
      end: {
        '@layer': {
          [components]: {
            vars: {
              [textAlign]: 'end',
            },
          },
        },
      },
      justify: {
        '@layer': {
          [components]: {
            vars: {
              [textAlign]: 'justify',
            },
          },
        },
      },
    },
  },
});

export const textEllipsisWrapper = style({
  '@layer': {
    [components]: {
      whiteSpace: 'nowrap',
    },
  },
});

export type TextVariants = NonNullable<RecipeVariants<typeof textRecipe>>;
