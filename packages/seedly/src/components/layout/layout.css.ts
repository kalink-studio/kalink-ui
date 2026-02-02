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
  spacing: {
    block: null,
    inline: null,
  },
  shape: {
    corner: null,
  },
  elevation: {
    level: null,
  },
});

export const layoutSpacingStyles = mapContractVars(sys.spacing, (key) => ({
  '@layer': {
    [components]: {
      vars: {
        ...assignVars(layoutVars.spacing, {
          block: sys.spacing[key],
          inline: sys.spacing[key],
        }),
      },
    },
  },
}));

export const layoutElevationStyles = mapContractVars(sys.elevation, (key) => ({
  '@layer': {
    [components]: {
      vars: {
        ...assignVars(layoutVars.elevation, {
          level: sys.elevation[key],
        }),
      },
    },
  },
}));

export const layoutRadiusStyles = mapContractVars(sys.shape.corner, (key) => ({
  '@layer': {
    [components]: {
      vars: {
        ...assignVars(layoutVars.shape, {
          corner: sys.shape.corner[key],
        }),
      },
    },
  },
}));

export const layoutRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        boxSizing: 'border-box',
        position: 'relative',

        paddingBlock: layoutVars.spacing.block,
        paddingInline: layoutVars.spacing.inline,

        borderRadius: layoutVars.shape.corner,
        boxShadow: layoutVars.elevation.level,

        vars: {
          ...assignVars(layoutVars.spacing, {
            block: sys.spacing[0],
            inline: sys.spacing[0],
          }),
          ...assignVars(layoutVars.shape, {
            corner: sys.shape.corner.none,
          }),
          ...assignVars(layoutVars.elevation, {
            level: sys.elevation.none,
          }),
        },
      },
    },
  },

  variants: {
    spacing: layoutSpacingStyles,
    elevation: layoutElevationStyles,
    radius: layoutRadiusStyles,
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

export const radiusAt = createResponsiveVariants({
  styles: layoutRadiusStyles,
  media: defaultMedia,
});
