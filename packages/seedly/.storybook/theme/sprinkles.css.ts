import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';

const space = {
  none: '0',
  small: '4px',
  medium: '8px',
  large: '16px',
};

export const sprinklesProps = {
  padding: space,
  backgroundColor: {
    red: 'red',
    blue: 'blue',
  },
  color: {
    white: 'white',
    black: 'black',
  },
  textAlign: {
    center: 'center',
    start: 'start',
    end: 'end',
  },
} as const;

export const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { '@media': 'screen and (min-width: 768px)' },
    desktop: { '@media': 'screen and (min-width: 1024px)' },
  },
  defaultCondition: 'mobile',
  properties: sprinklesProps,
});

export const sprinkles = createSprinkles(responsiveProperties);
export type Sprinkles = Parameters<typeof sprinkles>[0];

export type SprinklesFnBase = ReturnType<typeof createSprinkles>;
