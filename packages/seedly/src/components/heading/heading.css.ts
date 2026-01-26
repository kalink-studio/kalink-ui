import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import {
  createResponsiveVariants,
  defaultMedia,
  mapContractVars,
  sys,
} from '../../styles';
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

export const pretitleSpacingStyles = mapContractVars(sys.spacing, (key) => ({
  '@layer': {
    [components]: {
      marginBlockEnd: sys.spacing[key],
    },
  },
}));

export const pretitleRecipe = recipe({
  variants: {
    spacing: pretitleSpacingStyles,
  },
});

export const subtitleSpacingStyles = mapContractVars(sys.spacing, (key) => ({
  '@layer': {
    [components]: {
      marginBlockStart: sys.spacing[key],
    },
  },
}));

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
