import {
  assignVars,
  createThemeContract,
  globalStyle,
} from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { mapContractVars, sys } from '../../styles';
import { components } from '../../styles/layers.css';

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
  contentMinWidth: sys.layout.measure,
});

export const sidebarSpacingStyles = mapContractVars(
  sys.spacing,
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
