import { createThemeContract } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { createResponsiveVariants, defaultMedia, sys } from '../../styles';
import { layouts } from '../../styles/layers.css';
import {
  createLayoutBaseStyles,
  createLayoutCornerStyles,
  createLayoutElevationStyles,
  createLayoutSpacingStyles,
} from '../_foundation';

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

const layoutDefaultValues = {
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
} as const;

export const layoutSpacingStyles = createLayoutSpacingStyles({
  layer: layouts,
  scale: sys.spacing,
  vars: layoutVars.spacing,
});

export const layoutElevationStyles = createLayoutElevationStyles({
  layer: layouts,
  scale: sys.elevation,
  vars: layoutVars.elevation,
});

export const layoutCornerStyles = createLayoutCornerStyles({
  layer: layouts,
  scale: sys.shape.corner,
  vars: layoutVars.shape,
});

export const layoutRecipe = recipe({
  base: createLayoutBaseStyles({
    layer: layouts,
    vars: layoutVars,
    defaultValues: layoutDefaultValues,
  }),
  variants: {
    spacing: layoutSpacingStyles,
    elevation: layoutElevationStyles,
    corner: layoutCornerStyles,
  },
});

export const spacingAt = createResponsiveVariants({
  styles: layoutSpacingStyles,
  media: defaultMedia,
});

export const elevationAt = createResponsiveVariants({
  styles: layoutElevationStyles,
  media: defaultMedia,
});

export const cornerAt = createResponsiveVariants({
  styles: layoutCornerStyles,
  media: defaultMedia,
});
