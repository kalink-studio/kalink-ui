import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { sys } from '../../styles';
import { organisms } from '../../styles/layers.css';

export const fieldsetVars = createThemeContract({
  color: {
    legendBorder: null,
    legendForeground: null,
  },
  size: {
    legendBorderBlockEndWidth: null,
  },
  spacing: {
    legendPaddingBlockEnd: null,
    rootGap: null,
  },
});

const fieldsetDefaults = assignVars(fieldsetVars, {
  color: {
    legendBorder: sys.color.border.low,
    legendForeground: sys.color.content.base,
  },
  size: {
    legendBorderBlockEndWidth: '1px',
  },
  spacing: {
    legendPaddingBlockEnd: sys.spacing[6],
    rootGap: sys.spacing[8],
  },
});

export const fieldset = style({
  '@layer': {
    [organisms]: {
      vars: fieldsetDefaults,

      display: 'flex',
      flexDirection: 'column',

      gap: fieldsetVars.spacing.rootGap,
      inlineSize: '100%',
      marginBlock: '0',
      marginInline: '0',
      paddingBlock: '0',
      paddingInline: '0',

      border: '0',
    },
  },
});

export const legend = style({
  '@layer': {
    [organisms]: {
      paddingBlockEnd: fieldsetVars.spacing.legendPaddingBlockEnd,

      borderBlockEnd: `${fieldsetVars.size.legendBorderBlockEndWidth} solid ${fieldsetVars.color.legendBorder}`,
      color: fieldsetVars.color.legendForeground,
    },
  },
});
