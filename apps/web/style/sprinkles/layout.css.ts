import { utilities } from '@kalink-ui/seedly/styles/layers';
import {
  type ConditionalValue,
  defineProperties,
} from '@vanilla-extract/sprinkles';

export const layoutProperties = defineProperties({
  '@layer': utilities,

  conditions: {
    xs: {},
    sm: {
      '@media': 'screen and (min-width: 568px)',
    },
    md: {
      '@media': 'screen and (min-width: 768px)',
    },
    lg: {
      '@media': 'screen and (min-width: 1024px)',
    },
    xl: {
      '@media': 'screen and (min-width: 1280px)',
    },
  },

  defaultCondition: 'xs',
  responsiveArray: ['xs', 'sm', 'md', 'lg', 'xl'],

  properties: {
    display: [
      'none',
      'block',
      'inline',
      'inline-block',
      'flex',
      'inline-flex',
      'grid',
      'list-item',
    ],
  },
});

export type ResponsiveValue<Value extends string | number> = ConditionalValue<
  typeof layoutProperties,
  Value
>;

export type DisplayValues = keyof typeof layoutProperties.styles.display.values;

export interface ResponsiveProperties {
  /** Mapped to `display` css property */
  display?: ResponsiveValue<DisplayValues>;
}
