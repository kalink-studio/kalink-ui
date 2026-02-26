import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { sys, typography } from '../../styles';
import {
  createRangeIndicatorStyles,
  createRangeTrackRootVars,
  createRangeTrackStyles,
} from '../_foundation';

export const progressVars = createThemeContract({
  color: {
    foreground: null,
  },
});

export const progress = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  columnGap: sys.spacing[2],
  rowGap: sys.spacing[4],
  inlineSize: '100%',
  vars: {
    ...createRangeTrackRootVars(),
    ...assignVars(progressVars.color, {
      foreground: sys.color.content.base,
    }),
  },
});

export const label = style([
  typography.label.medium,
  {
    color: progressVars.color.foreground,
  },
]);

export const value = style([
  typography.body.medium,
  {
    gridColumnStart: '2',
    marginBlock: '0',
    marginInline: '0',
    color: progressVars.color.foreground,
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
