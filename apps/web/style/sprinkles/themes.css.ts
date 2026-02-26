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
          [sys.color.surface.dim]:
            `color-mix(in srgb, ${refs.colors.neutral[100]} 92%, ${refs.colors.neutral[0]})`,
          [sys.color.surface.base]: refs.colors.neutral[100],
          [sys.color.surface.bright]:
            `color-mix(in srgb, ${refs.colors.neutral[100]} 98%, ${refs.colors.neutral[0]})`,
          [sys.color.container.low]:
            `color-mix(in srgb, ${refs.colors.neutral[100]} 98%, ${refs.colors.neutral[0]})`,
          [sys.color.container.base]:
            `color-mix(in srgb, ${refs.colors.neutral[100]} 96%, ${refs.colors.neutral[0]})`,
          [sys.color.container.high]:
            `color-mix(in srgb, ${refs.colors.neutral[100]} 92%, ${refs.colors.neutral[0]})`,
          [sys.color.container.top]:
            `color-mix(in srgb, ${refs.colors.neutral[100]} 88%, ${refs.colors.neutral[0]})`,
          [sys.color.content.base]: refs.colors.neutral[0],
          [sys.color.border.low]:
            `color-mix(in srgb, ${refs.colors.neutral[0]} 22%, transparent)`,
          [sys.color.border.base]:
            `color-mix(in srgb, ${refs.colors.neutral[0]} 30%, transparent)`,
          [sys.color.border.high]:
            `color-mix(in srgb, ${refs.colors.neutral[0]} 36%, transparent)`,
        },
      },
      inverted: {
        vars: {
          [sys.color.surface.dim]:
            `color-mix(in srgb, ${refs.colors.neutral[0]} 92%, ${refs.colors.neutral[100]})`,
          [sys.color.surface.base]: refs.colors.neutral[0],
          [sys.color.surface.bright]:
            `color-mix(in srgb, ${refs.colors.neutral[0]} 98%, ${refs.colors.neutral[100]})`,
          [sys.color.container.low]:
            `color-mix(in srgb, ${refs.colors.neutral[0]} 98%, ${refs.colors.neutral[100]})`,
          [sys.color.container.base]:
            `color-mix(in srgb, ${refs.colors.neutral[0]} 96%, ${refs.colors.neutral[100]})`,
          [sys.color.container.high]:
            `color-mix(in srgb, ${refs.colors.neutral[0]} 92%, ${refs.colors.neutral[100]})`,
          [sys.color.container.top]:
            `color-mix(in srgb, ${refs.colors.neutral[0]} 88%, ${refs.colors.neutral[100]})`,
          [sys.color.content.base]: refs.colors.neutral[100],
          [sys.color.border.low]:
            `color-mix(in srgb, ${refs.colors.neutral[100]} 22%, transparent)`,
          [sys.color.border.base]:
            `color-mix(in srgb, ${refs.colors.neutral[100]} 30%, transparent)`,
          [sys.color.border.high]:
            `color-mix(in srgb, ${refs.colors.neutral[100]} 36%, transparent)`,
        },
      },
    },
  },
});

export type ThemeValues = keyof typeof themeProperties.styles.theme.values;

export interface ThemeProperties {
  theme?: ThemeValues;
}
