import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { sys } from '../../styles';
import { layouts } from '../../styles/layers.css';

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
  '@layer': {
    [layouts]: {
      display: 'flex',
      flexDirection: 'column',
      gap: formVars.spacing.rootGap,
      inlineSize: '100%',
      vars: formDefaults,
    },
  },
});
