import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { sys } from '../../styles';

export const formVars = createThemeContract({
  spacing: {
    gap: null,
  },
});

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: formVars.spacing.gap,
  inlineSize: '100%',
  vars: {
    ...assignVars(formVars.spacing, {
      gap: sys.spacing[8],
    }),
  },
});
