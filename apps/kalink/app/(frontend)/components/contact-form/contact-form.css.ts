import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/contract.css';

export const contactFormWrapper = style({
  display: 'grid',
  gap: vars.ref.spacing['2xl'],
});

export const statusMessage = style({
  padding: vars.ref.spacing.md,
  color: vars.system.color.onSurface,
  backgroundColor: vars.system.color.surfaceContainer,
  borderRadius: vars.ref.radius.rounded,
});
