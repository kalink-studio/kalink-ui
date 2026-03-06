import { globalStyle, style } from '@vanilla-extract/css';

import { atoms } from '../../styles/layers.css';

import { buttonVars } from './root.css';

export const buttonIcon = style({
  '@layer': {
    [atoms]: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: '0',

      inlineSize: buttonVars.size.rootIcon,
      blockSize: buttonVars.size.rootIcon,
    },
  },
});

globalStyle(`${buttonIcon} > svg`, {
  '@layer': {
    [atoms]: {
      display: 'block',
      inlineSize: '100%',
      blockSize: '100%',
    },
  },
});
