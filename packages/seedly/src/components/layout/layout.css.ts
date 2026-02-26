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

export const layoutSpacingStyles = mapContractVars(
  sys.spacing,
  layoutVars.spacing,
);

export const layoutElevationStyles = mapContractVars(
  sys.elevation,
  layoutVars.elevation,
);

export const layoutRadiusStyles = mapContractVars(
  sys.shape.corner,
  layoutVars.shape,
);

export const layoutRecipe = recipe({
  base: {
    '@layer': {
      [components]: {
        paddingBlock: layoutVars.spacing.block,
        paddingInline: layoutVars.spacing.inline,

        position: 'relative',

        borderRadius: layoutVars.shape.corner,
        boxShadow: layoutVars.elevation.level,

        vars: assignVars(layoutVars, {
          spacing: {
            block: sys.spacing[0],
            inline: sys.spacing[0],
          },
          shape: {
            corner: sys.shape.corner.none,
          },
          elevation: {
            level: sys.elevation.none,
          },
        }),
      },
    },
  },

  variants: {
    spacing: layoutSpacingStyles,
    elevation: layoutElevationStyles,
    radius: layoutRadiusStyles,
  },
});
export const radiusAt = createResponsiveVariants({
  styles: layoutRadiusStyles,
  media: defaultMedia,
});
