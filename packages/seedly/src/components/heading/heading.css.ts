import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { createResponsiveVariants, defaultMedia, sys } from '../../styles';
import { molecules } from '../../styles/layers.css';

export const headingAlignStyles = {
  start: {
    '@layer': {
      [molecules]: {
        alignItems: 'flex-start',
        textAlign: 'start',
      },
    },
  },
  center: {
    '@layer': {
      [molecules]: {
        alignItems: 'center',
        textAlign: 'center',
      },
    },
  },
  end: {
    '@layer': {
      [molecules]: {
        alignItems: 'flex-end',
        textAlign: 'end',
      },
    },
  },
  justify: {
    '@layer': {
      [molecules]: {
        alignItems: 'stretch',
        textAlign: 'justify',
      },
    },
  },
} as const;

export const headingRootRecipe = recipe({
  base: {
    '@layer': {
      [molecules]: {
        display: 'flex',
        flexDirection: 'column',
      },
    },
  },
  variants: {
    align: headingAlignStyles,
  },
});

export const pretitleSpacingStyles = Object.fromEntries(
  Object.entries(sys.spacing).map(([key, value]) => {
    return [
      key,
      {
        '@layer': {
          [molecules]: {
            marginBlockEnd: value,
          },
        },
      },
    ];
  }),
);

export const pretitleRecipe = recipe({
  variants: {
    spacing: pretitleSpacingStyles,
  },
});

export const subtitleSpacingStyles = Object.fromEntries(
  Object.entries(sys.spacing).map(([key, value]) => {
    return [
      key,
      {
        '@layer': {
          [molecules]: {
            marginBlockStart: value,
          },
        },
      },
    ];
  }),
);

export const subtitleRecipe = recipe({
  variants: {
    spacing: subtitleSpacingStyles,
  },
});

export type HeadingRootVariants = NonNullable<
  RecipeVariants<typeof headingRootRecipe>
>;

export const alignAt = createResponsiveVariants({
  styles: headingAlignStyles,
  media: defaultMedia,
});

export const pretitleSpacingAt = createResponsiveVariants({
  styles: pretitleSpacingStyles,
  media: defaultMedia,
});

export const subtitleSpacingAt = createResponsiveVariants({
  styles: subtitleSpacingStyles,
  media: defaultMedia,
});
