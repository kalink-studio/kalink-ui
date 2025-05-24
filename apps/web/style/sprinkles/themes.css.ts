import { sys } from '@kalink-ui/seedly/styles';
import { utilities } from '@kalink-ui/seedly/styles/layers';
import { defineProperties } from '@vanilla-extract/sprinkles';

import { refs } from '../refs.css';

export const themeProperties = defineProperties({
  '@layer': utilities,

  properties: {
    theme: {
      default: {
        vars: {
          [sys.color.foreground]: refs.colors.neutral[0],
          [sys.color.background]: refs.colors.neutral[100],
        },
      },
      inverted: {
        vars: {
          [sys.color.foreground]: refs.colors.neutral[100],
          [sys.color.background]: refs.colors.neutral[0],
        },
      },
    },
  },
});

export type ThemeValues = keyof typeof themeProperties.styles.theme.values;

export interface ThemeProperties {
  theme?: ThemeValues;
}
