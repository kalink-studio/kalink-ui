import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/contract.css';

export const listItemsSection = style({
  paddingBlock: vars.ref.spacing['5xl'],
});

export const listItemsList = style({
  listStyle: 'disc inside',
  display: 'grid',
  gap: vars.ref.spacing.sm,
  margin: 0,
  padding: 0,
});
