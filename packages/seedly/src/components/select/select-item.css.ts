import { style } from '@vanilla-extract/css';

import { sys } from '../../styles';
import { components } from '../../styles/layers.css';

export const selectItemIndicator = style({
  '@layer': {
    [components]: {
      position: 'absolute',
      top: '50%',
      insetInlineStart: sys.spacing[2],

      transform: 'translateY(-50%) translateX(-50%)',

      '::before': {
        content: '\u2022',

        display: 'inline-block',

        fontSize: '1em',
      },
    },
  },
});
