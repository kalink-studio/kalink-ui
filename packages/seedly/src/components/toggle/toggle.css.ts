import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { sys } from '../../styles';
import { atoms } from '../../styles/layers.css';

export const toggleVars = createThemeContract({
  color: {
    rootFocusRing: null,
    rootPressedForeground: null,
  },
});

const toggleDefaults = assignVars(toggleVars, {
  color: {
    rootFocusRing: sys.color.tone.primary,
    rootPressedForeground: sys.color.content.base,
  },
});

export const button = style([
  {
    '@layer': {
      [atoms]: {
        vars: {
          ...toggleDefaults,
        },
        borderWidth: '0',

        selectors: {
          '&[data-pressed]': {
            color: toggleVars.color.rootPressedForeground,
          },
          '&:focus-visible': {
            outline: `2px solid ${toggleVars.color.rootFocusRing}`,
            outlineOffset: '-1px',
            backgroundColor: 'transparent',
          },
        },
      },
    },
  },
]);
