import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/contract.css';

export const contactFormWrapper = style({
  display: 'grid',
  gap: vars.ref.spacing['2xl'],
});

export const statusMessage = style({
  padding: vars.ref.spacing.md,
  borderRadius: vars.ref.radius.rounded,
  backgroundColor: vars.system.color.surfaceContainer,
  color: vars.system.color.onSurface,
});
