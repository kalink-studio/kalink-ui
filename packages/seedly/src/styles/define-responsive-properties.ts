import {
  type ConditionalValue,
  defineProperties,
} from '@vanilla-extract/sprinkles';

import { utilities } from './layers.css';
import { sys } from './system-contract.css';

interface ScreenMediaQueries {
  sm: `screen and (min-width: ${string}px)`;
  md: `screen and (min-width: ${string}px)`;
  lg: `screen and (min-width: ${string}px)`;
  xl: `screen and (min-width: ${string}px)`;
}

interface DefineResponsivePropertiesArgs {
  screen: ScreenMediaQueries;
}

export const defineResponsiveProperties = ({
  screen,
}: DefineResponsivePropertiesArgs) =>
  defineProperties({
    '@layer': utilities,

    conditions: {
      xs: {},
      sm: { '@media': screen.sm },
      md: { '@media': screen.md },
      lg: { '@media': screen.lg },
      xl: { '@media': screen.xl },
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
      paddingBlockStart: sys.spacing,
      paddingBlockEnd: sys.spacing,
      paddingInlineStart: sys.spacing,
      paddingInlineEnd: sys.spacing,

      marginBlockStart: sys.spacing,
      marginBlockEnd: sys.spacing,
      marginInlineStart: sys.spacing,
      marginInlineEnd: sys.spacing,

      columnGap: sys.spacing,
      rowGap: sys.spacing,

      flexDirection: ['row', 'row-reverse', 'column', 'column-reverse'],

      justifyContent: [
        'stretch',
        'flex-start',
        'flex-end',
        'center',
        'space-between',
        'space-around',
        'space-evenly',
      ],
      justifySelf: ['start', 'end', 'center', 'stretch'],
      alignItems: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
      alignSelf: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],

      position: [
        'absolute',
        'relative',
        'fixed',
        'sticky',
        'static',
        'inherit',
      ],
      insetBlockStart: sys.spacing,
      insetBlockEnd: sys.spacing,
      insetInlineStart: sys.spacing,
      insetInlineEnd: sys.spacing,

      textAlign: ['start', 'end', 'center', 'justify'],
    },

    shorthands: {
      padding: [
        'paddingBlockStart',
        'paddingInlineEnd',
        'paddingBlockEnd',
        'paddingInlineStart',
      ],
      paddingBlock: ['paddingBlockStart', 'paddingBlockEnd'],
      paddingInline: ['paddingInlineEnd', 'paddingInlineStart'],

      margin: [
        'marginBlockStart',
        'marginInlineEnd',
        'marginBlockEnd',
        'marginInlineStart',
      ],
      marginBlock: ['marginBlockStart', 'marginBlockEnd'],
      marginInline: ['marginInlineEnd', 'marginInlineStart'],

      gap: ['rowGap', 'columnGap'],

      inset: [
        'insetBlockStart',
        'insetInlineEnd',
        'insetBlockEnd',
        'insetInlineStart',
      ],
      insetBlock: ['insetBlockStart', 'insetBlockEnd'],
      insetInline: ['insetInlineEnd', 'insetInlineStart'],
    },
  });

type DefineResponsiveProperties = ReturnType<typeof defineResponsiveProperties>;

export type ResponsiveValue<Value extends string | number> = ConditionalValue<
  DefineResponsiveProperties,
  Value
>;

export type DisplayValues =
  keyof DefineResponsiveProperties['styles']['display']['values'];
export type JustifyContentValues =
  keyof DefineResponsiveProperties['styles']['justifyContent']['values'];
export type JustifySelfValues =
  keyof DefineResponsiveProperties['styles']['justifySelf']['values'];
export type AlignItemsValues =
  keyof DefineResponsiveProperties['styles']['alignItems']['values'];
export type AlignSelfValues =
  keyof DefineResponsiveProperties['styles']['alignSelf']['values'];
export type FlexDirectionValues =
  keyof DefineResponsiveProperties['styles']['flexDirection']['values'];
export type ColumnGapValues =
  keyof DefineResponsiveProperties['styles']['columnGap']['values'];
export type RowGapValues =
  keyof DefineResponsiveProperties['styles']['rowGap']['values'];

export type PaddingBlockStartValues =
  keyof DefineResponsiveProperties['styles']['paddingBlockStart']['values'];
export type PaddingBlockEndValues =
  keyof DefineResponsiveProperties['styles']['paddingBlockEnd']['values'];
export type PaddingInlineStartValues =
  keyof DefineResponsiveProperties['styles']['paddingInlineStart']['values'];
export type PaddingInlineEndValues =
  keyof DefineResponsiveProperties['styles']['paddingInlineEnd']['values'];
export type MarginBlockStartValues =
  keyof DefineResponsiveProperties['styles']['marginBlockStart']['values'];
export type MarginBlockEndValues =
  keyof DefineResponsiveProperties['styles']['marginBlockEnd']['values'];
export type MarginInlineStartValues =
  keyof DefineResponsiveProperties['styles']['marginInlineStart']['values'];
export type MarginInlineEndValues =
  keyof DefineResponsiveProperties['styles']['marginInlineEnd']['values'];

export type PositionValues =
  keyof DefineResponsiveProperties['styles']['position']['values'];
export type InsetBlockStartValues =
  keyof DefineResponsiveProperties['styles']['insetBlockStart']['values'];
export type InsetBlockEndValues =
  keyof DefineResponsiveProperties['styles']['insetBlockEnd']['values'];
export type InsetInlineStartValues =
  keyof DefineResponsiveProperties['styles']['insetInlineStart']['values'];
export type InsetInlineEndValues =
  keyof DefineResponsiveProperties['styles']['insetInlineEnd']['values'];

export type TextAlignValues =
  keyof DefineResponsiveProperties['styles']['textAlign']['values'];

export interface ResponsiveProperties {
  /** Mapped to `display` css property */
  display?: ResponsiveValue<DisplayValues>;
  /** Mapped to `flex-direction` css property */
  flexDirection?: ResponsiveValue<FlexDirectionValues>;
  /** Mapped to `justify-content` css property */
  justifyContent?: ResponsiveValue<JustifyContentValues>;
  /** Mapped to `justify-self` css property */
  justifySelf?: ResponsiveValue<JustifySelfValues>;
  /** Mapped to `align-items` css property */
  alignItems?: ResponsiveValue<AlignItemsValues>;
  /** Mapped to `align-self` css property */
  alignSelf?: ResponsiveValue<AlignSelfValues>;
  /** Mapped to `column-gap` css property */
  columnGap?: ResponsiveValue<ColumnGapValues>;
  /** Mapped to `row-gap` css property */
  rowGap?: ResponsiveValue<RowGapValues>;
  /** Mapped to `gap` css property */
  gap?: ResponsiveValue<ColumnGapValues | RowGapValues>;

  /** Mapped to `padding-block-start` css property */
  paddingBlockStart?: ResponsiveValue<PaddingBlockStartValues>;
  /** Mapped to `padding-block-end` css property */
  paddingBlockEnd?: ResponsiveValue<PaddingBlockEndValues>;
  /** Mapped to `padding-inline-start` css property */
  paddingInlineStart?: ResponsiveValue<PaddingInlineStartValues>;
  /** Mapped to `padding-inline-end` css property */
  paddingInlineEnd?: ResponsiveValue<PaddingInlineEndValues>;
  /** Mapped to `padding` css property */
  padding?: ResponsiveValue<PaddingBlockStartValues | PaddingInlineStartValues>;
  /** Mapped to `padding-block` css property */
  paddingBlock?: ResponsiveValue<
    PaddingBlockStartValues | PaddingBlockEndValues
  >;
  /** Mapped to `padding-inline` css property */
  paddingInline?: ResponsiveValue<
    PaddingInlineStartValues | PaddingInlineEndValues
  >;

  /** Mapped to `margin-block-start` css property */
  marginBlockStart?: ResponsiveValue<MarginBlockStartValues>;
  /** Mapped to `margin-block-end` css property */
  marginBlockEnd?: ResponsiveValue<MarginBlockEndValues>;
  /** Mapped to `margin-inline-start` css property */
  marginInlineStart?: ResponsiveValue<MarginInlineStartValues>;
  /** Mapped to `margin-inline-end` css property */
  marginInlineEnd?: ResponsiveValue<MarginInlineEndValues>;
  /** Mapped to `margin` css property */
  margin?: ResponsiveValue<MarginBlockStartValues | MarginInlineStartValues>;
  /** Mapped to `margin-block` css property */
  marginBlock?: ResponsiveValue<MarginBlockStartValues | MarginBlockEndValues>;
  /** Mapped to `margin-inline` css property */
  marginInline?: ResponsiveValue<
    MarginInlineStartValues | MarginInlineEndValues
  >;

  /** Mapped to `position` css property */
  position?: ResponsiveValue<PositionValues>;

  /** Mapped to `inset-block-start` css property */
  insetBlockStart?: ResponsiveValue<InsetBlockStartValues>;
  /** Mapped to `inset-block-end` css property */
  insetBlockEnd?: ResponsiveValue<InsetBlockEndValues>;
  /** Mapped to `inset-inline-start` css property */
  insetInlineStart?: ResponsiveValue<InsetInlineStartValues>;
  /** Mapped to `inset-inline-end` css property */
  insetInlineEnd?: ResponsiveValue<InsetInlineEndValues>;

  /** Mapped to `text-align` css property */
  textAlign?: ResponsiveValue<TextAlignValues>;
}
