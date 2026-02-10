import {
  assignVars,
  createThemeContract,
  globalStyle,
} from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { createResponsiveVariants, defaultMedia, sys } from '../../styles';
import { components } from '../../styles/layers.css';
import { createSpacingContractStyles } from '../layout/shared/spacing';

export const sidebarVars = createThemeContract({
  spacing: {
    gap: null,
  },
  layout: {
    sideWidth: null,
    contentMinWidth: null,
  },
});

const sidebarSpacingDefaults = assignVars(sidebarVars.spacing, {
  gap: sys.spacing[0],
});

const sidebarLayoutDefaults = assignVars(sidebarVars.layout, {
  sideWidth: 'auto',
  contentMinWidth: '50%',
});

export const sidebarSpacingStyles = createSpacingContractStyles(
  sidebarVars.spacing,
);

export const sidebarRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: sidebarVars.spacing.gap,

        vars: {
          ...sidebarSpacingDefaults,
          ...sidebarLayoutDefaults,
        },
      },
    },
  },

  variants: {
    spacing: sidebarSpacingStyles,

    noStretch: {
      true: {
        '@layer': {
          [components]: {
            alignItems: 'flex-start',
          },
        },
      },
    },

    sideWidth: {
      true: {},
    },

    side: {
      right: {},
      left: {},
    },
  },
});

globalStyle(`${sidebarRecipe.classNames.base} > *`, {
  '@layer': {
    [components]: {
      flexGrow: 1,
    },
  },
});

globalStyle(`${sidebarRecipe.classNames.variants.sideWidth.true} > *`, {
  '@layer': {
    [components]: {
      flexBasis: sidebarVars.layout.sideWidth,
    },
  },
});

globalStyle(`${sidebarRecipe.classNames.variants.side.left} > :last-child`, {
  '@layer': {
    [components]: {
      flexBasis: 0,
      flexGrow: 999,
      minInlineSize: sidebarVars.layout.contentMinWidth,
    },
  },
});

globalStyle(`${sidebarRecipe.classNames.variants.side.right} > :first-child`, {
  '@layer': {
    [components]: {
      flexBasis: 0,
      flexGrow: 999,
      minInlineSize: sidebarVars.layout.contentMinWidth,
    },
  },
});

export type SidebarVariants = NonNullable<RecipeVariants<typeof sidebarRecipe>>;

export const spacingAt = createResponsiveVariants({
  styles: sidebarSpacingStyles,
  media: defaultMedia,
});
