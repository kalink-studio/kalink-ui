import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { createResponsiveVariants, defaultMedia, sys } from '../../styles';
import { components } from '../../styles/layers.css';

export const headingAlignStyles = {
  start: {
    '@layer': {
      [components]: {
        alignItems: 'flex-start',
        textAlign: 'start',
      },
    },
  },
  center: {
    '@layer': {
      [components]: {
        alignItems: 'center',
        textAlign: 'center',
      },
    },
  },
  end: {
    '@layer': {
      [components]: {
        alignItems: 'flex-end',
        textAlign: 'end',
      },
    },
  },
  justify: {
    '@layer': {
      [components]: {
        alignItems: 'stretch',
        textAlign: 'justify',
      },
    },
  },
} as const;

export const headingRootRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
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
          [components]: {
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
          [components]: {
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
