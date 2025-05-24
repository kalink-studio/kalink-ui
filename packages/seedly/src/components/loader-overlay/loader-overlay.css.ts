import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { sys } from '../../styles';

export const loaderOverlay = recipe({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    height: '100%',
    width: '100%',

    zIndex: 1000,

    backgroundColor: `color-mix(in srgb, ${sys.color.foreground} 10%, transparent)`,
  },

  variants: {
    position: {
      absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
      },
      relative: {
        position: 'relative',
      },
    },
  },
});

export type LoaderOverlayVariants = NonNullable<
  RecipeVariants<typeof loaderOverlay>
>;
