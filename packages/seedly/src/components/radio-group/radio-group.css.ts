import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { sys } from '../../styles';
import { organisms } from '../../styles/layers.css';

export const radioGroupVars = createThemeContract({
  color: {
    rootForeground: null,
  },
  spacing: {
    groupGap: null,
  },
});

const radioGroupDefaults = assignVars(radioGroupVars, {
  color: {
    rootForeground: sys.color.content.base,
  },
  spacing: {
    groupGap: sys.spacing[2],
  },
});

export const radioGroup = style({
  '@layer': {
    [organisms]: {
      vars: radioGroupDefaults,

      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      gap: radioGroupVars.spacing.groupGap,
      color: radioGroupVars.color.rootForeground,
    },
  },
});
