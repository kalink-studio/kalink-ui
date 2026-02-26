import {
  assignVars,
  createThemeContract,
  globalStyle,
  style,
} from '@vanilla-extract/css';

import { stateColor, sys } from '../../styles';

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
});

const switchRootInlineSize = sys.spacing[14];
const switchRootBlockSize = sys.spacing[10];
const switchRootPadding = '2px';
const switchThumbSize = `calc(${switchRootBlockSize} - ${sys.spacing[3]})`;
const switchCheckedThumbTranslate = `calc(${switchRootInlineSize} - ${switchThumbSize} - (${switchRootPadding} * 2))`;
const switchMotionDuration = sys.motion.duration.short[4];
const switchMotionEasing = sys.motion.easing.standard;

export const label = style({
  display: 'flex',
  alignItems: 'center',
  gap: sys.spacing[4],
  color: switchVars.color.label,
  cursor: 'pointer',
  userSelect: 'none',
  WebkitTapHighlightColor: 'transparent',
  vars: assignVars(switchVars.color, {
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
  inlineSize: switchRootInlineSize,
  blockSize: switchRootBlockSize,
  marginBlock: '0',
  marginInline: '0',
  paddingBlock: switchRootPadding,
  paddingInline: switchRootPadding,
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
  borderRadius: sys.spacing[10],
  outline: '1px solid',
  outlineOffset: '-1px',
  outlineColor: switchVars.color.trackBorder,
  boxShadow: `inset 0 1px 1px color-mix(in srgb, ${sys.color.content.base} 8%, transparent), ${sys.elevation.minimal}`,
  transitionProperty: 'background-position, box-shadow, outline-color',
  transitionTimingFunction: switchMotionEasing,
  transitionDuration: switchMotionDuration,
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
      transitionDuration: '0ms',
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
  inlineSize: switchThumbSize,
  blockSize: switchThumbSize,
  borderRadius: '100%',
  backgroundColor: switchVars.color.thumbBackground,
  border: `1px solid ${switchVars.color.thumbBorder}`,
  willChange: 'translate',
  transitionProperty:
    'translate, scale, box-shadow, border-color, background-color',
  transitionTimingFunction: switchMotionEasing,
  transitionDuration: switchMotionDuration,

  '@media': {
    '(prefers-color-scheme: light)': {
      boxShadow: sys.elevation.low,
    },
    '(prefers-color-scheme: dark)': {
      boxShadow: sys.elevation.moderate,
    },
    '(prefers-reduced-motion: reduce)': {
      transitionDuration: '0ms',
    },
  },
  selectors: {
    '&[data-checked]': {
      translate: `${switchCheckedThumbTranslate} 0`,
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
