import { assignVars, createThemeContract } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import {
  createResponsiveVariants,
  defaultMedia,
  mapContractVars,
  sys,
} from '../../styles';
import { components } from '../../styles/layers.css';

export const layoutVars = createThemeContract({
  elevation: {
    rootLevel: null,
  },

  shape: {
    rootCorner: null,
  },

  spacing: {
    rootPaddingBlock: null,
    rootPaddingInline: null,
  },
});

export const layoutSpacingStyles = mapContractVars(
  sys.spacing,
  layoutVars.spacing,
);

export const layoutElevationStyles = mapContractVars(
  sys.elevation,
  layoutVars.elevation,
);

export const layoutCornerStyles = mapContractVars(
  sys.shape.corner,
  layoutVars.shape,
);

export const layoutRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        vars: assignVars(layoutVars, {
          elevation: {
            rootLevel: sys.elevation.none,
          },

          shape: {
            rootCorner: sys.shape.corner.none,
          },

          spacing: {
            rootPaddingBlock: sys.spacing[0],
            rootPaddingInline: sys.spacing[0],
          },
        }),

        position: 'relative',

        paddingBlock: layoutVars.spacing.rootPaddingBlock,
        paddingInline: layoutVars.spacing.rootPaddingInline,

        borderRadius: layoutVars.shape.rootCorner,
        boxShadow: layoutVars.elevation.rootLevel,
      },
    },
  },

  variants: {
    spacing: layoutSpacingStyles,
    elevation: layoutElevationStyles,
    corner: layoutCornerStyles,
  },
});

export const cornerAt = createResponsiveVariants({
  styles: layoutCornerStyles,
  media: defaultMedia,
});
