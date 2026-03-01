import {
  assignVars,
  createThemeContract,
  globalStyle,
} from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { mapContractVars, sys } from '../../styles';
import { components } from '../../styles/layers.css';

export const sidebarVars = createThemeContract({
  layout: {
    contentMinInlineSize: null,
    sideInlineSize: null,
  },
  spacing: {
    rootGap: null,
  },
});

const sidebarDefaults = assignVars(sidebarVars, {
  layout: {
    contentMinInlineSize: sys.layout.measure,
    sideInlineSize: 'auto',
  },
  spacing: {
    rootGap: sys.spacing[0],
  },
});

export const sidebarSpacingStyles = mapContractVars(
  sys.spacing,
  sidebarVars.spacing,
);

export const sidebarRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        vars: sidebarDefaults,

        display: 'flex',
        flexWrap: 'wrap',
        gap: sidebarVars.spacing.rootGap,
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
      flexBasis: sidebarVars.layout.sideInlineSize,
    },
  },
});

globalStyle(`${sidebarRecipe.classNames.variants.side.left} > :last-child`, {
  '@layer': {
    [components]: {
      flexBasis: 0,
      flexGrow: 999,
      minInlineSize: sidebarVars.layout.contentMinInlineSize,
    },
  },
});

globalStyle(`${sidebarRecipe.classNames.variants.side.right} > :first-child`, {
  '@layer': {
    [components]: {
      flexBasis: 0,
      flexGrow: 999,
      minInlineSize: sidebarVars.layout.contentMinInlineSize,
    },
  },
});

export type SidebarVariants = NonNullable<RecipeVariants<typeof sidebarRecipe>>;
