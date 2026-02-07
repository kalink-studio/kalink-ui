import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const root = style({
  backgroundColor: 'var(--color-gray-50)',
  borderRadius: '0.5rem',
  padding: '0.25rem',
  color: 'var(--color-gray-900)',
  minWidth: 'max-content',
});

export const list = style({
  display: 'flex',
  position: 'relative',
  listStyle: 'none',
  padding: '0',
  margin: '0',
});

export const trigger = style({
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
globalStyle(`${trigger}:hover`, {
  '@media': {
    '(hover: hover)': {
      backgroundColor: 'var(--color-gray-100)',
    },
  },
});
globalStyle(`${trigger}[data-popup-open]`, {
  backgroundColor: 'var(--color-gray-100)',
});
globalStyle(`${trigger}:focus-visible`, {
  position: 'relative',
  outline: '2px solid var(--color-blue)',
  outlineOffset: '-1px',
});

export const icon = style({
  transition: 'transform 0.2s ease',
});
globalStyle(`${icon}[data-popup-open]`, {
  transform: 'rotate(180deg)',
});

export const positioner = style({
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
globalStyle(`${positioner}::before`, {
  content: "''",
  position: 'absolute',
});
globalStyle(`${positioner}[data-side='top']::before`, {
  left: '0',
  right: '0',
  bottom: '-10px',
  height: '10px',
});
globalStyle(`${positioner}[data-side='bottom']::before`, {
  left: '0',
  right: '0',
  top: '-10px',
  height: '10px',
});
globalStyle(`${positioner}[data-side='left']::before`, {
  top: '0',
  bottom: '0',
  right: '-10px',
  width: '10px',
});
globalStyle(`${positioner}[data-side='right']::before`, {
  top: '0',
  bottom: '0',
  left: '-10px',
  width: '10px',
});
globalStyle(`${positioner}[data-instant]`, {
  transition: 'none',
});

export const popup = style({
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
globalStyle(`${popup}[data-starting-style]`, {
  opacity: '0',
  transform: 'scale(0.9)',
});
globalStyle(`${popup}[data-ending-style]`, {
  opacity: '0',
  transform: 'scale(0.9)',
  transitionTimingFunction: 'ease',
  transitionDuration: '0.15s',
});

export const content = style({
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
globalStyle(`${content}[data-starting-style]`, {
  opacity: '0',
});
globalStyle(`${content}[data-ending-style]`, {
  opacity: '0',
});
globalStyle(
  `${content}[data-starting-style][data-activation-direction='left']`,
  {
    transform: 'translateX(-50%)',
  },
);
globalStyle(
  `${content}[data-starting-style][data-activation-direction='right']`,
  {
    transform: 'translateX(50%)',
  },
);
globalStyle(`${content}[data-ending-style][data-activation-direction='left']`, {
  transform: 'translateX(50%)',
});
globalStyle(
  `${content}[data-ending-style][data-activation-direction='right']`,
  {
    transform: 'translateX(-50%)',
  },
);

export const viewport = style({
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  height: '100%',
});

export const gridLinkList = style({
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

export const flexLinkList = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  maxWidth: '400px',
  padding: '0',
  margin: '0',
  listStyle: 'none',
});

export const linkCard = style({
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
globalStyle(`${linkCard}:hover`, {
  '@media': {
    '(hover: hover)': {
      backgroundColor: 'var(--color-gray-100)',
    },
  },
});
globalStyle(`${linkCard}:focus-visible`, {
  position: 'relative',
  outline: '2px solid var(--color-blue)',
  outlineOffset: '-1px',
});

export const linkTitle = style({
  margin: '0 0 4px',
  fontSize: '1rem',
  fontWeight: '500',
  lineHeight: '1.25rem',
});

export const linkDescription = style({
  margin: '0',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
  color: 'var(--color-gray-500)',
});

export const arrow = style({
  display: 'flex',
  transition: 'left calc(var(--duration)) var(--easing)',
});
globalStyle(`${arrow}[data-side='top']`, {
  bottom: '-8px',
  rotate: '180deg',
});
globalStyle(`${arrow}[data-side='bottom']`, {
  top: '-8px',
  rotate: '0deg',
});
globalStyle(`${arrow}[data-side='left']`, {
  right: '-13px',
  rotate: '90deg',
});
globalStyle(`${arrow}[data-side='right']`, {
  left: '-13px',
  rotate: '-90deg',
});

export const arrowFill = style({
  fill: 'canvas',
});

export const arrowOuterStroke = style({
  '@media': {
    '(prefers-color-scheme: light)': {
      fill: 'var(--color-gray-200)',
    },
  },
});

export const arrowInnerStroke = style({
  '@media': {
    '(prefers-color-scheme: dark)': {
      fill: 'var(--color-gray-300)',
    },
  },
});

globalStyle(`${popup}`, {
  '@media': {
    '(prefers-color-scheme: light)': {
      outline: '1px solid var(--color-gray-200)',
      boxShadow:
        '0 10px 15px -3px var(--color-gray-200),\n      0 4px 6px -4px var(--color-gray-200)',
    },
  },
});
globalStyle(`${popup}`, {
  '@media': {
    '(prefers-color-scheme: dark)': {
      outline: '1px solid var(--color-gray-300)',
      outlineOffset: '-1px',
    },
  },
});

export const navigationMenuRecipe = recipe({
  base: root,
});
