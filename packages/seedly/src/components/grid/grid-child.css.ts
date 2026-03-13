import { type StyleRule } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { layouts } from '../../styles/layers.css';
import {
  createResponsiveVariants,
  defaultMedia,
} from '../../styles/responsive';

const oneToTwelve = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
type OneToTwelve = (typeof oneToTwelve)[number];

const oneToThirteen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] as const;
type OneToThirteen = (typeof oneToThirteen)[number];
type LineIndex = OneToThirteen | -1;

const colSpanStyles = Object.fromEntries(
  oneToTwelve.map((count) => [
    count,
    {
      '@layer': {
        [layouts]: {
          gridColumn: `auto / span ${count}`,
        },
      },
    },
  ]),
) as Record<OneToTwelve, { '@layer': Record<string, { gridColumn: string }> }>;

const rowSpanStyles = Object.fromEntries(
  oneToTwelve.map((count) => [
    count,
    {
      '@layer': {
        [layouts]: {
          gridRow: `auto / span ${count}`,
        },
      },
    },
  ]),
) as Record<OneToTwelve, { '@layer': Record<string, { gridRow: string }> }>;

const colStartStyles = Object.fromEntries(
  oneToThirteen.map((count) => [
    count,
    {
      '@layer': {
        [layouts]: {
          gridColumnStart: count,
        },
      },
    },
  ]),
) as Record<
  OneToThirteen,
  { '@layer': Record<string, { gridColumnStart: number }> }
>;

const colEndStyles = Object.fromEntries(
  [...oneToThirteen, -1 as const].map((count) => [
    count,
    {
      '@layer': {
        [layouts]: {
          gridColumnEnd: count,
        },
      },
    },
  ]),
) as Record<LineIndex, { '@layer': Record<string, { gridColumnEnd: number }> }>;

const rowStartStyles = Object.fromEntries(
  oneToThirteen.map((count) => [
    count,
    {
      '@layer': {
        [layouts]: {
          gridRowStart: count,
        },
      },
    },
  ]),
) as Record<
  OneToThirteen,
  { '@layer': Record<string, { gridRowStart: number }> }
>;

const rowEndStyles = Object.fromEntries(
  [...oneToThirteen, -1 as const].map((count) => [
    count,
    {
      '@layer': {
        [layouts]: {
          gridRowEnd: count,
        },
      },
    },
  ]),
) as Record<LineIndex, { '@layer': Record<string, { gridRowEnd: number }> }>;

const justifySelfStyles = {
  start: {
    '@layer': { [layouts]: { justifySelf: 'start' } },
  },
  end: {
    '@layer': { [layouts]: { justifySelf: 'end' } },
  },
  center: {
    '@layer': { [layouts]: { justifySelf: 'center' } },
  },
  stretch: {
    '@layer': { [layouts]: { justifySelf: 'stretch' } },
  },
} as const;

const alignSelfStyles = {
  start: {
    '@layer': { [layouts]: { alignSelf: 'start' } },
  },
  end: {
    '@layer': { [layouts]: { alignSelf: 'end' } },
  },
  center: {
    '@layer': { [layouts]: { alignSelf: 'center' } },
  },
  stretch: {
    '@layer': { [layouts]: { alignSelf: 'stretch' } },
  },
} as const;

export const gridChildRecipe = recipe({
  base: {
    '@layer': {
      [layouts]: {},
    },
  },
  variants: {
    colSpan: colSpanStyles,
    rowSpan: rowSpanStyles,
    colStart: colStartStyles,
    colEnd: colEndStyles,
    rowStart: rowStartStyles,
    rowEnd: rowEndStyles,
    justifySelf: justifySelfStyles,
    alignSelf: alignSelfStyles,
  },
});

export type GridChildVariants = NonNullable<
  RecipeVariants<typeof gridChildRecipe>
>;

export const colSpanAt = createResponsiveVariants({
  styles: colSpanStyles as Record<OneToTwelve, StyleRule | StyleRule[]>,
  media: defaultMedia,
});

export const rowSpanAt = createResponsiveVariants({
  styles: rowSpanStyles as Record<OneToTwelve, StyleRule | StyleRule[]>,
  media: defaultMedia,
});

export const colStartAt = createResponsiveVariants({
  styles: colStartStyles as Record<OneToThirteen, StyleRule | StyleRule[]>,
  media: defaultMedia,
});

export const colEndAt = createResponsiveVariants({
  styles: colEndStyles as Record<LineIndex, StyleRule | StyleRule[]>,
  media: defaultMedia,
});

export const rowStartAt = createResponsiveVariants({
  styles: rowStartStyles as Record<OneToThirteen, StyleRule | StyleRule[]>,
  media: defaultMedia,
});

export const rowEndAt = createResponsiveVariants({
  styles: rowEndStyles as Record<LineIndex, StyleRule | StyleRule[]>,
  media: defaultMedia,
});

export const justifySelfAt = createResponsiveVariants({
  styles: justifySelfStyles,
  media: defaultMedia,
});

export const alignSelfAt = createResponsiveVariants({
  styles: alignSelfStyles,
  media: defaultMedia,
});
