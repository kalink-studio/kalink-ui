import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/contract.css';

export const servicesGridSection = style({
  paddingBlock: vars.ref.spacing['6xl'],
});

export const servicesGridList = style({
  display: 'grid',
  gap: vars.ref.spacing['3xl'],
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  listStyle: 'none',
  margin: 0,
  padding: 0,
});

export const servicesGridCard = style({
  padding: vars.ref.spacing['2xl'],
  borderRadius: vars.ref.radius.rounded,
  backgroundColor: vars.system.color.surfaceContainer,
  color: vars.system.color.onSurface,
  display: 'grid',
  gap: vars.ref.spacing.md,
});
