import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { sys, typography } from '../../styles';

export const fieldsetVars = createThemeContract({
  spacing: {
    gap: null,
    legendPaddingBlockEnd: null,
    zero: null,
  },
});

export const fieldset = style({
  display: 'flex',
  flexDirection: 'column',
  gap: fieldsetVars.spacing.gap,
  inlineSize: '100%',
  marginBlock: fieldsetVars.spacing.zero,
  marginInline: fieldsetVars.spacing.zero,
  paddingBlock: fieldsetVars.spacing.zero,
  paddingInline: fieldsetVars.spacing.zero,
  border: '0',
  vars: {
    ...assignVars(fieldsetVars.spacing, {
      gap: sys.spacing[8],
      legendPaddingBlockEnd: sys.spacing[6],
      zero: sys.spacing[0],
    }),
  },
});

export const legend = style([
  typography.title.large,
  {
    borderBlockEnd: `1px solid ${sys.color.border.low}`,
    paddingBlockEnd: fieldsetVars.spacing.legendPaddingBlockEnd,
    color: sys.color.content.base,
  },
]);
