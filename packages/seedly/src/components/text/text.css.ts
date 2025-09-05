import { createVar, style, type StyleRule } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { createResponsiveVariants, defaultMedia, sys } from '../../styles';
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

// Extract align styles for responsive overrides
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

// Responsive typography overrides for variant+size combos
const typographyComboEntries = Object.entries(sys.typography).flatMap(
  ([variantKey, sizes]) => {
    return Object.entries(sizes).map(([sizeKey, v]) => {
      const k = `${variantKey}.${sizeKey}`;
      const rule: StyleRule = {
        '@layer': {
          [components]: {
            fontFamily: v.font,
            fontWeight: v.weight,
            lineHeight: v.lineHeight,
            letterSpacing: v.tracking,
            fontSize: v.size,
          },
        },
      };

      return [k, rule] as const;
    });
  },
);

export const typographyAt = createResponsiveVariants({
  styles: Object.fromEntries(typographyComboEntries) as Record<
    string,
    StyleRule
  >,
  media: defaultMedia,
});
