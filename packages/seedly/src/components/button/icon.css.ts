import { globalStyle, style } from '@vanilla-extract/css';

import { components } from '../../styles/layers.css';

import { buttonVars } from './root.css';

export const buttonIcon = style({
  '@layer': {
    [components]: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: '0',

      inlineSize: buttonVars.icon.size,
      blockSize: buttonVars.icon.size,
    },
  },
});

globalStyle(`${buttonIcon} > svg`, {
  '@layer': {
    [components]: {
      display: 'block',
      inlineSize: '100%',
      blockSize: '100%',
    },
  },
});
