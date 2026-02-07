import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

const spacing = {
  none: '0',
  small: '0.5rem',
  medium: '1rem',
  large: '1.5rem',
};

const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { '@media': 'screen and (min-width: 768px)' },
    desktop: { '@media': 'screen and (min-width: 1024px)' },
  },
  defaultCondition: 'mobile',
  properties: {
    padding: spacing,
    color: {
      base: 'var(--color-gray-900)',
      muted: 'var(--color-gray-600)',
    },
    backgroundColor: {
      canvas: 'canvas',
      surface: 'var(--color-gray-50)',
      tone: 'var(--color-gray-100)',
    },
  },
});

export const sprinkles = createSprinkles(responsiveProperties);
export type Sprinkles = Parameters<typeof sprinkles>[0];
export type SprinklesFnBase = ReturnType<typeof createSprinkles>;
