import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/contract.css';

export const introSection = style({
  paddingBlock: vars.ref.spacing['7xl'],
});
