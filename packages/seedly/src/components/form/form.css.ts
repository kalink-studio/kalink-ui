import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { sys } from '../../styles';

export const formVars = createThemeContract({
  spacing: {
    rootGap: null,
  },
});

const formDefaults = assignVars(formVars, {
  spacing: {
    rootGap: sys.spacing[8],
  },
});

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: formVars.spacing.rootGap,
  inlineSize: '100%',
  vars: formDefaults,
});
