import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/contract.css';

export const servicesGridSection = style({
  paddingBlock: vars.ref.spacing['6xl'],
});

export const servicesGridList = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: vars.ref.spacing['3xl'],
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const servicesGridCard = style({
  display: 'grid',
  gap: vars.ref.spacing.md,
  padding: vars.ref.spacing['2xl'],
  color: vars.system.color.onSurface,
  backgroundColor: vars.system.color.surfaceContainer,
  borderRadius: vars.ref.radius.rounded,
});
