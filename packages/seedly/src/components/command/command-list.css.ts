import { style } from '@vanilla-extract/css';

import { sys, transition } from '../../styles';

export const commandList = style({
  width: '100%',
  maxHeight: 350,
  overflow: 'auto',
  paddingInline: sys.spacing[2],
  paddingBlockEnd: sys.spacing[2],

  overscrollBehavior: 'contain',
  transition: transition(['height']),
});
