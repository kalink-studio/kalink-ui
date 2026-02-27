import {
  assignVars,
  createThemeContract,
  globalStyle,
  style,
} from '@vanilla-extract/css';

import { stateColor, sys, transition } from '../../styles';

export const switchVars = createThemeContract({
  color: {
    label: null,
    disabledLabel: null,
    trackOnStart: null,
    trackOnEnd: null,
    trackOffStart: null,
    trackOffEnd: null,
    trackBorder: null,
    trackHoverBorder: null,
    trackActiveBorder: null,
    disabledTrackBorder: null,
    disabledTrackStart: null,
    disabledTrackEnd: null,
    disabledTrackShadow: null,
    focusRing: null,
    thumbBackground: null,
    thumbBorder: null,
    thumbDisabledBackground: null,
    thumbDisabledBorder: null,
  },
  size: {
    rootInlineSize: null,
    rootBlockSize: null,
    rootPadding: null,
    thumbSize: null,
    checkedThumbTranslate: null,
  },
  shape: {
    rootCorner: null,
    thumbCorner: null,
  },
});

const switchSizeDefaults = assignVars(switchVars.size, {
  rootInlineSize: sys.spacing[14],
  rootBlockSize: sys.spacing[10],
  rootPadding: '2px',
  thumbSize: `calc(${switchVars.size.rootBlockSize} - ${sys.spacing[3]})`,
  checkedThumbTranslate: `calc(${switchVars.size.rootInlineSize} - ${switchVars.size.thumbSize} - (${switchVars.size.rootPadding} * 2))`,
});

const switchShapeDefaults = assignVars(switchVars.shape, {
  rootCorner: sys.shape.corner.circle,
  thumbCorner: sys.shape.corner.circle,
});

export const label = style({
  display: 'flex',
  alignItems: 'center',
  gap: sys.spacing[4],
  color: switchVars.color.label,
  cursor: 'pointer',
  userSelect: 'none',
  WebkitTapHighlightColor: 'transparent',
  vars: {
    ...assignVars(switchVars.color, {
      label: sys.color.content.base,
      disabledLabel: stateColor.disabledContent,
      trackOnStart: `color-mix(in srgb, ${sys.color.content.base} 84%, ${sys.color.tone.secondary})`,
      trackOnEnd: `color-mix(in srgb, ${sys.color.content.base} 64%, ${sys.color.tone.secondaryContainer})`,
      trackOffStart: `color-mix(in srgb, ${sys.color.content.base} 18%, ${sys.color.container.base})`,
      trackOffEnd: sys.color.container.high,
      trackBorder: sys.color.border.base,
      trackHoverBorder: sys.color.border.high,
      trackActiveBorder: `color-mix(in srgb, ${sys.color.content.base} 42%, ${sys.color.border.high})`,
      disabledTrackBorder: stateColor.subtleContent,
      disabledTrackStart: `color-mix(in srgb, ${sys.color.content.base} 14%, ${sys.color.container.base})`,
      disabledTrackEnd: `color-mix(in srgb, ${sys.color.content.base} 8%, ${sys.color.container.high})`,
      disabledTrackShadow: `inset 0 1px 1px color-mix(in srgb, ${sys.color.content.base} 8%, transparent)`,
      focusRing: sys.color.tone.primary,
      thumbBackground: sys.color.surface.bright,
      thumbBorder: `color-mix(in srgb, ${sys.color.content.base} 18%, transparent)`,
      thumbDisabledBackground: `color-mix(in srgb, ${sys.color.surface.bright} 60%, ${sys.color.container.low})`,
      thumbDisabledBorder: `color-mix(in srgb, ${sys.color.content.base} 8%, transparent)`,
    }),
    ...switchSizeDefaults,
    ...switchShapeDefaults,
  },
  selectors: {
    '&:has([data-disabled])': {
      color: switchVars.color.disabledLabel,
      cursor: 'not-allowed',
    },
    '&:has([data-readonly]):not(:has([data-disabled]))': {
      cursor: 'default',
    },
  },
});

export const switchRoot = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  flexShrink: 0,
  inlineSize: switchVars.size.rootInlineSize,
  blockSize: switchVars.size.rootBlockSize,
  marginBlock: '0',
  marginInline: '0',
  paddingBlock: switchVars.size.rootPadding,
  paddingInline: switchVars.size.rootPadding,
  overflow: 'hidden',
  position: 'relative',
  appearance: 'none',
  border: '0',
  backgroundColor: 'transparent',
  backgroundImage: `linear-gradient(
      105deg,
      ${switchVars.color.trackOnStart} 30%,
      ${switchVars.color.trackOnEnd} 48%,
      ${switchVars.color.trackOffStart} 60%,
      ${switchVars.color.trackOffEnd} 78%
    )`,
  backgroundSize: '250% 100%',
  backgroundPositionX: '100%',
  backgroundRepeat: 'no-repeat',
  borderRadius: switchVars.shape.rootCorner,
  outline: '1px solid',
  outlineOffset: '-1px',
  outlineColor: switchVars.color.trackBorder,
  boxShadow: `inset 0 1px 1px color-mix(in srgb, ${sys.color.content.base} 8%, transparent), ${sys.elevation.minimal}`,
  transition: transition(
    ['background-position', 'box-shadow', 'outline-color'],
    {
      duration: 'short.4',
      easing: 'standard',
    },
  ),
  cursor: 'pointer',
  touchAction: 'manipulation',
  WebkitTapHighlightColor: 'transparent',
  '@media': {
    '(prefers-color-scheme: light)': {
      boxShadow: `inset 0 1px 1px color-mix(in srgb, ${sys.color.content.base} 8%, transparent), ${sys.elevation.minimal}`,
    },
    '(prefers-color-scheme: dark)': {
      boxShadow: `inset 0 1px 1px color-mix(in srgb, ${sys.color.content.base} 16%, transparent), ${sys.elevation.minimal}`,
    },
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
  selectors: {
    '&[data-checked]': {
      backgroundPositionX: '0%',
      '@media': {
        '(prefers-color-scheme: dark)': {
          boxShadow: `inset 0 1px 1px color-mix(in srgb, ${sys.color.content.base} 10%, transparent), ${sys.elevation.low}`,
        },
      },
    },
    '&[data-disabled], &[data-readonly]': {
      boxShadow: switchVars.color.disabledTrackShadow,
    },
    '&[data-disabled]': {
      outlineColor: switchVars.color.disabledTrackBorder,
      backgroundImage: `linear-gradient(
        105deg,
        ${switchVars.color.disabledTrackStart} 44%,
        ${switchVars.color.disabledTrackEnd} 56%
      )`,
      cursor: 'not-allowed',
    },
    '&[data-readonly]:not([data-disabled])': {
      cursor: 'default',
    },
    '&:hover:not([data-disabled]):not([data-readonly])': {
      '@media': {
        '(hover: hover)': {
          outlineColor: switchVars.color.trackHoverBorder,
        },
      },
    },
    '&:active:not([data-disabled]):not([data-readonly])': {
      outlineColor: switchVars.color.trackActiveBorder,
      boxShadow: `inset 0 1px 2px color-mix(in srgb, ${sys.color.content.base} 22%, transparent)`,
    },
    '&[data-checked]:active:not([data-disabled]):not([data-readonly])': {
      outlineColor: switchVars.color.trackOnStart,
    },
    '&:focus-visible::before': {
      insetBlock: '-1px',
      insetInline: '-1px',
      position: 'absolute',
      borderRadius: 'inherit',
      outline: `2px solid ${switchVars.color.focusRing}`,
      outlineOffset: '2px',
      content: "''",
      pointerEvents: 'none',
    },
    '&[data-disabled]:focus-visible::before': {
      content: 'none',
    },
    '&[data-checked][data-disabled]': {
      backgroundPositionX: '0%',
    },
    '&[data-unchecked][data-disabled]': {
      backgroundPositionX: '100%',
    },
  },
});

export const thumb = style({
  display: 'block',
  inlineSize: switchVars.size.thumbSize,
  blockSize: switchVars.size.thumbSize,
  borderRadius: switchVars.shape.thumbCorner,
  backgroundColor: switchVars.color.thumbBackground,
  border: `1px solid ${switchVars.color.thumbBorder}`,
  willChange: 'translate',
  transition: transition(
    ['translate', 'scale', 'box-shadow', 'border-color', 'background-color'],
    {
      duration: 'short.4',
      easing: 'standard',
    },
  ),

  '@media': {
    '(prefers-color-scheme: light)': {
      boxShadow: sys.elevation.low,
    },
    '(prefers-color-scheme: dark)': {
      boxShadow: sys.elevation.moderate,
    },
    '(prefers-reduced-motion: reduce)': {
      transition: 'none',
    },
  },
  selectors: {
    '&[data-checked]': {
      translate: `${switchVars.size.checkedThumbTranslate} 0`,
    },
    '&[data-disabled], &[data-readonly]': {
      boxShadow: 'none',
    },
    '&[data-disabled]': {
      backgroundColor: switchVars.color.thumbDisabledBackground,
      borderColor: switchVars.color.thumbDisabledBorder,
    },
  },
});

globalStyle(`${switchRoot}:active ${thumb}`, {
  scale: '1.16 1',
});

globalStyle(`${switchRoot}:active:not([data-checked]) ${thumb}`, {
  transformOrigin: 'left center',
});

globalStyle(`${switchRoot}:active:is([data-checked]) ${thumb}`, {
  transformOrigin: 'right center',
});
