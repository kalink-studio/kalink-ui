import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { sys } from '../../styles';
import { components } from '../../styles/layers.css';

export const loaderOverlay = recipe({
  base: {
    '@layer': {
      [components]: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        height: '100%',
        width: '100%',

        zIndex: 1000,

        backgroundColor: `color-mix(in srgb, ${sys.surface.foreground} 5%, transparent)`,
      },
    },
  },

  variants: {
    position: {
      absolute: {
        '@layer': {
          [components]: {
            position: 'absolute',
            top: 0,
            left: 0,
          },
        },
      },
      relative: {
        '@layer': {
          [components]: {
            position: 'relative',
          },
        },
      },
    },
  },
});

export type LoaderOverlayVariants = NonNullable<
  RecipeVariants<typeof loaderOverlay>
>;
