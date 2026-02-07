import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const Root = style({
  backgroundColor: 'var(--color-gray-50)',
  borderRadius: '0.5rem',
  padding: '0.25rem',
  color: 'var(--color-gray-900)',
  minWidth: 'max-content',
});

export const List = style({
  display: 'flex',
  position: 'relative',
  listStyle: 'none',
  padding: '0',
  margin: '0',
});

export const Trigger = style({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.375rem',
  height: '2.5rem',
  padding: '0 0.875rem',
  margin: '0',
  outline: '0',
  border: 'none',
  borderRadius: '0.375rem',
  backgroundColor: 'var(--color-gray-50)',
  fontFamily: 'inherit',
  fontSize: '1rem',
  fontWeight: '500',
  lineHeight: '1.5rem',
  color: 'var(--color-gray-900)',
  userSelect: 'none',
  textDecoration: 'none',
  '@media': {
    '(max-width: 500px)': {
      fontSize: '0.925rem',
      padding: '0 0.5rem',
    },
  },
});
globalStyle(`${Trigger}:hover`, {
  '@media': {
    '(hover: hover)': {
      backgroundColor: 'var(--color-gray-100)',
    },
  },
});
globalStyle(`${Trigger}[data-popup-open]`, {
  backgroundColor: 'var(--color-gray-100)',
});
globalStyle(`${Trigger}:focus-visible`, {
  position: 'relative',
  outline: '2px solid var(--color-blue)',
  outlineOffset: '-1px',
});

export const Icon = style({
  transition: 'transform 0.2s ease',
});
globalStyle(`${Icon}[data-popup-open]`, {
  transform: 'rotate(180deg)',
});

export const Positioner = style({
  boxSizing: 'border-box',
  transitionProperty: 'top, left, right, bottom',
  transitionDuration: 'var(--duration)',
  transitionTimingFunction: 'var(--easing)',
  width: 'var(--positioner-width)',
  height: 'var(--positioner-height)',
  maxWidth: 'var(--available-width)',
  vars: {
    '--easing': 'cubic-bezier(0.22, 1, 0.36, 1)',
    '--duration': '0.35s',
  },
});
globalStyle(`${Positioner}::before`, {
  content: "''",
  position: 'absolute',
});
globalStyle(`${Positioner}[data-side='top']::before`, {
  left: '0',
  right: '0',
  bottom: '-10px',
  height: '10px',
});
globalStyle(`${Positioner}[data-side='bottom']::before`, {
  left: '0',
  right: '0',
  top: '-10px',
  height: '10px',
});
globalStyle(`${Positioner}[data-side='left']::before`, {
  top: '0',
  bottom: '0',
  right: '-10px',
  width: '10px',
});
globalStyle(`${Positioner}[data-side='right']::before`, {
  top: '0',
  bottom: '0',
  left: '-10px',
  width: '10px',
});
globalStyle(`${Positioner}[data-instant]`, {
  transition: 'none',
});

export const Popup = style({
  position: 'relative',
  boxSizing: 'border-box',
  borderRadius: '0.5rem',
  backgroundColor: 'canvas',
  color: 'var(--color-gray-900)',
  transformOrigin: 'var(--transform-origin)',
  transitionProperty: 'opacity, transform, width, height',
  transitionDuration: 'var(--duration)',
  transitionTimingFunction: 'var(--easing)',
  width: 'var(--popup-width)',
  height: 'var(--popup-height)',
});
globalStyle(`${Popup}[data-starting-style]`, {
  opacity: '0',
  transform: 'scale(0.9)',
});
globalStyle(`${Popup}[data-ending-style]`, {
  opacity: '0',
  transform: 'scale(0.9)',
  transitionTimingFunction: 'ease',
  transitionDuration: '0.15s',
});

export const Content = style({
  boxSizing: 'border-box',
  transition:
    'opacity calc(var(--duration) * 0.5) ease,\n    transform var(--duration) var(--easing)',
  padding: '1.5rem',
  width: 'calc(100vw - 40px)',
  height: '100%',
  '@media': {
    '(min-width: 500px)': {
      width: 'max-content',
      minWidth: '400px',
    },
  },
});
globalStyle(`${Content}[data-starting-style]`, {
  opacity: '0',
});
globalStyle(`${Content}[data-ending-style]`, {
  opacity: '0',
});
globalStyle(
  `${Content}[data-starting-style][data-activation-direction='left']`,
  {
    transform: 'translateX(-50%)',
  },
);
globalStyle(
  `${Content}[data-starting-style][data-activation-direction='right']`,
  {
    transform: 'translateX(50%)',
  },
);
globalStyle(`${Content}[data-ending-style][data-activation-direction='left']`, {
  transform: 'translateX(50%)',
});
globalStyle(
  `${Content}[data-ending-style][data-activation-direction='right']`,
  {
    transform: 'translateX(-50%)',
  },
);

export const Viewport = style({
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  height: '100%',
});

export const GridLinkList = style({
  display: 'grid',
  gridTemplateColumns: '12rem 12rem',
  listStyle: 'none',
  padding: '0',
  margin: '0',
  '@media': {
    '(max-width: 500px)': {
      gridTemplateColumns: '1fr',
    },
  },
});

export const FlexLinkList = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  maxWidth: '400px',
  padding: '0',
  margin: '0',
  listStyle: 'none',
});

export const LinkCard = style({
  boxSizing: 'border-box',
  display: 'block',
  padding: '0.5rem',
  borderRadius: '0.375rem',
  textDecoration: 'none',
  color: 'inherit',
  border: 'none',
  backgroundColor: 'transparent',
  '@media': {
    '(min-width: 425px)': {
      padding: '0.75rem',
    },
  },
});
globalStyle(`${LinkCard}:hover`, {
  '@media': {
    '(hover: hover)': {
      backgroundColor: 'var(--color-gray-100)',
    },
  },
});
globalStyle(`${LinkCard}:focus-visible`, {
  position: 'relative',
  outline: '2px solid var(--color-blue)',
  outlineOffset: '-1px',
});

export const LinkTitle = style({
  margin: '0 0 4px',
  fontSize: '1rem',
  fontWeight: '500',
  lineHeight: '1.25rem',
});

export const LinkDescription = style({
  margin: '0',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  color: 'var(--color-gray-500)',
});

export const Arrow = style({
  display: 'flex',
  transition: 'left calc(var(--duration)) var(--easing)',
});
globalStyle(`${Arrow}[data-side='top']`, {
  bottom: '-8px',
  rotate: '180deg',
});
globalStyle(`${Arrow}[data-side='bottom']`, {
  top: '-8px',
  rotate: '0deg',
});
globalStyle(`${Arrow}[data-side='left']`, {
  right: '-13px',
  rotate: '90deg',
});
globalStyle(`${Arrow}[data-side='right']`, {
  left: '-13px',
  rotate: '-90deg',
});

export const ArrowFill = style({
  fill: 'canvas',
});

export const ArrowOuterStroke = style({
  '@media': {
    '(prefers-color-scheme: light)': {
      fill: 'var(--color-gray-200)',
    },
  },
});

export const ArrowInnerStroke = style({
  '@media': {
    '(prefers-color-scheme: dark)': {
      fill: 'var(--color-gray-300)',
    },
  },
});

globalStyle(`${Popup}`, {
  '@media': {
    '(prefers-color-scheme: light)': {
      outline: '1px solid var(--color-gray-200)',
      boxShadow:
        '0 10px 15px -3px var(--color-gray-200),\n      0 4px 6px -4px var(--color-gray-200)',
    },
  },
});
globalStyle(`${Popup}`, {
  '@media': {
    '(prefers-color-scheme: dark)': {
      outline: '1px solid var(--color-gray-300)',
      outlineOffset: '-1px',
    },
  },
});

export const NavigationMenuRecipe = recipe({
  base: Root,
});
