import { style } from '@vanilla-extract/css';

import { sys, typography } from '../../styles';

export const fieldset = style({
  display: 'flex',
  flexDirection: 'column',
  gap: sys.spacing[8],
  inlineSize: '100%',
  marginBlock: '0',
  marginInline: '0',
  paddingBlock: '0',
  paddingInline: '0',
  border: '0',
});

export const legend = style([
  typography.title.large,
  {
    borderBlockEnd: `1px solid ${sys.color.border.low}`,
    paddingBlockEnd: sys.spacing[6],
    color: sys.color.content.base,
  },
]);
