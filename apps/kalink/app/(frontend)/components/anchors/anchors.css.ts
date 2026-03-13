import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/contract.css';

export const anchorsContainer = style({
  display: 'flex',
  gap: vars.ref.spacing.md,
  overflowX: 'auto',
  paddingBlock: vars.ref.spacing.md,
});

export const anchorLink = style({
  paddingInline: vars.ref.spacing.md,
  paddingBlock: vars.ref.spacing.xs,
  fontSize: vars.ref.fontSize.sm,
  textDecoration: 'none',
  color: vars.system.color.onSurface,
  borderRadius: vars.ref.radius.rounded,
  backgroundColor: vars.system.color.surfaceContainer,
});
