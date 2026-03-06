import { createVar, style, type StyleRule } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { createResponsiveVariants, defaultMedia } from '../../styles';
import { atoms } from '../../styles/layers.css';

export const lineClampNumber = createVar();
export const textAlign = createVar();

const lineClamp = {
  '@layer': {
    [atoms]: {
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
      [atoms]: {
        vars: {
          [textAlign]: 'start',
        },
      },
    },
  },
  center: {
    '@layer': {
      [atoms]: {
        vars: {
          [textAlign]: 'center',
        },
      },
    },
  },
  end: {
    '@layer': {
      [atoms]: {
        vars: {
          [textAlign]: 'end',
        },
      },
    },
  },
  justify: {
    '@layer': {
      [atoms]: {
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
      [atoms]: {
        textWrap: 'wrap',
      },
    },
  },
  false: {
    '@layer': {
      [atoms]: {
        textWrap: 'nowrap',
      },
    },
  },
  balance: {
    '@layer': {
      [atoms]: {
        textWrap: 'balance',
      },
    },
  },
  pretty: {
    '@layer': {
      [atoms]: {
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
        [atoms]: {
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
        [atoms]: {
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
        [atoms]: {
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
        [atoms]: {
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
      [atoms]: {
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
          [atoms]: {
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
    [atoms]: {
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
