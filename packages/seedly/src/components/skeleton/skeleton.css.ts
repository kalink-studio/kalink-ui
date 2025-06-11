import { globalStyle, keyframes } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { sys, typography } from '../../styles';
import { components } from '../../styles/layers.css';

const pulseKeyframe = keyframes({
  '0%': {
    opacity: 1,
  },

  '50%': {
    opacity: 0.4,
  },

  '100%': {
    opacity: 1,
  },
});

export const skeleton = recipe({
  base: {
    '@layer': {
      [components]: {
        display: 'block',

        backgroundColor: `color-mix(in srgb, ${sys.color.foreground} 10%, transparent)`,

        animationName: pulseKeyframe,
        animationDuration: '1500ms',
        animationIterationCount: 'infinite',
        animationTimingFunction: sys.motion.easing.standard,
        animationDelay: '500ms',
      },
    },
  },

  variants: {
    type: {
      text: [
        typography.body.medium,
        {
          '@layer': {
            [components]: {
              selectors: {
                '&:empty::before': {
                  content: '"\\00a0"',
                },
              },
            },
          },
        },
      ],

      field: {
        '@layer': {
          [components]: {
            display: 'block',
            width: '100%',
            height: sys.spacing[6],
          },
        },
      },

      paragraph: {
        '@layer': {
          [components]: {
            display: 'block',
            width: '100%',
            height: sys.spacing[16],
          },
        },
      },

      block: {
        '@layer': {
          [components]: {
            aspectRatio: '1',
          },
        },
      },
    },

    withChildren: {
      true: {
        '@layer': {
          [components]: {
            maxWidth: 'fit-content',
            height: 'auto',
          },
        },
      },
    },

    corner: {
      square: {
        '@layer': {
          [components]: {
            borderRadius: sys.shape.corner.none,
          },
        },
      },

      rounded: {
        '@layer': {
          [components]: {
            borderRadius: sys.shape.corner.small,
          },
        },
      },

      circle: {
        '@layer': {
          [components]: {
            borderRadius: sys.shape.corner.circle,
          },
        },
      },
    },
  },
});

globalStyle(`${skeleton.classNames.variants.withChildren.true} *`, {
  visibility: 'hidden',
});

export type SkeletonVariants = NonNullable<RecipeVariants<typeof skeleton>>;
