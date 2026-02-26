import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { sys, typography } from '../../styles';
import {
  createRangeIndicatorStyles,
  createRangeTrackRootVars,
  createRangeTrackStyles,
} from '../_foundation';

export const meterVars = createThemeContract({
  color: {
    foreground: null,
  },
});

export const meter = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  rowGap: sys.spacing[4],
  inlineSize: '100%',
  vars: {
    ...createRangeTrackRootVars(),
    ...assignVars(meterVars.color, {
      foreground: sys.color.content.base,
    }),
  },
});

export const label = style([
  typography.label.medium,
  {
    color: meterVars.color.foreground,
  },
]);

export const value = style([
  typography.body.medium,
  {
    gridColumnStart: '2',
    marginBlock: '0',
    marginInline: '0',
    color: meterVars.color.foreground,
    textAlign: 'right',
  },
]);

export const track = style({
  gridColumn: '1 / 3',
  ...createRangeTrackStyles({
    blockSize: sys.spacing[2],
    overflow: 'hidden',
  }),
});

export const indicator = style({
  ...createRangeIndicatorStyles(),
  transition: 'width 500ms',
});
