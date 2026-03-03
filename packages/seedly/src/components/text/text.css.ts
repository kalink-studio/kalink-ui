import { createVar, style, type StyleRule } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { createResponsiveVariants, defaultMedia } from '../../styles';
import { components } from '../../styles/layers.css';

export const lineClampNumber = createVar();
export const textAlign = createVar();

const lineClamp = {
  '@layer': {
    [components]: {
      display: '-webkit-box',
      WebkitLineClamp: lineClampNumber,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    },
  },
} satisfies StyleRule;

export const textAlignStyles = {
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
} as const;

export const textWrapStyles = {
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
} satisfies Record<'true' | 'false' | 'balance' | 'pretty', StyleRule>;

export const textLineClampStyles = {
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
} satisfies Record<2 | 3 | 4 | 5, StyleRule | StyleRule[]>;

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
    wrap: {
      ...textWrapStyles,
    },
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
    lineClamp: {
      ...textLineClampStyles,
    },
    align: textAlignStyles,
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

export const alignAt = createResponsiveVariants({
  styles: textAlignStyles,
  media: defaultMedia,
});

export const wrapAt = createResponsiveVariants({
  styles: textWrapStyles,
  media: defaultMedia,
});

export const lineClampAt = createResponsiveVariants({
  styles: textLineClampStyles,
  media: defaultMedia,
});
