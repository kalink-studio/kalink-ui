import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { sys } from '../../styles';
import { organisms } from '../../styles/layers.css';

export const checkboxGroupVars = createThemeContract({
  color: {
    rootForeground: null,
  },
  spacing: {
    groupGap: null,
  },
});

const checkboxGroupDefaults = assignVars(checkboxGroupVars, {
  color: {
    rootForeground: sys.color.content.base,
  },
  spacing: {
    groupGap: sys.spacing[2],
  },
});

export const checkboxGroup = style({
  '@layer': {
    [organisms]: {
      vars: checkboxGroupDefaults,

      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      gap: checkboxGroupVars.spacing.groupGap,
      color: checkboxGroupVars.color.rootForeground,
    },
  },
});
