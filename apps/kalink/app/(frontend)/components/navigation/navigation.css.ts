import { style, styleVariants } from '@vanilla-extract/css';

import { vars } from '@/styles/contract.css';

export const navigationRoot = style({
  position: 'sticky',
  top: 0,
  zIndex: 100,
  backdropFilter: 'blur(12px)',
  backgroundColor: vars.system.color.surface,
  borderBottom: `1px solid ${vars.system.color.surfaceContainerHigh}`,
});

export const navigationInner = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.ref.spacing.base,
  paddingBlock: vars.ref.spacing.sm,
});

export const desktopNav = style({
  display: 'none',
  alignItems: 'center',
  gap: vars.ref.spacing.lg,
  '@media': {
    'screen and (min-width: 768px)': {
      display: 'flex',
    },
  },
});

export const mobileControls = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.ref.spacing.base,
  '@media': {
    'screen and (min-width: 768px)': {
      display: 'none',
    },
  },
});

export const navList = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.ref.spacing.lg,
});

export const navLink = styleVariants({
  default: {
    color: vars.system.color.onSurface,
    textDecoration: 'none',
    fontWeight: 300,
    transition: 'color 150ms ease',
    selectors: {
      '&:hover': {
        color: vars.system.color.primary,
      },
    },
  },
  active: {
    color: vars.system.color.primary,
    textDecoration: 'none',
    fontWeight: 400,
  },
});

export const brand = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.ref.spacing.sm,
  textDecoration: 'none',
  color: vars.system.color.onSurface,
});

export const brandMark = style({
  width: 40,
  height: 40,
});

export const brandText = style({
  fontFamily: 'var(--font-brand)',
  fontSize: vars.ref.fontSize['3xl'],
  letterSpacing: '0.02em',
});

export const mobileMenuContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.ref.spacing.lg,
});

export const mobileMenuItem = style({
  textDecoration: 'none',
  color: vars.system.color.onSurface,
  fontSize: vars.ref.fontSize.xl,
  fontWeight: 300,
});

export const mobileMenuHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: vars.ref.spacing['2xl'],
});
