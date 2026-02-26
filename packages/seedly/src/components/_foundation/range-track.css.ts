import {
  assignVars,
  createThemeContract,
  type StyleRule,
} from '@vanilla-extract/css';

import { sys } from '../../styles';

export const rangeTrackVars = createThemeContract({
  color: {
    background: null,
    border: null,
    indicator: null,
  },
  shape: {
    corner: null,
  },
});

export interface RangeTrackRootVarsOptions {
  trackBackground?: string;
  trackBorder?: string;
  indicator?: string;
  corner?: string;
}

export function createRangeTrackRootVars({
  trackBackground = sys.color.container.base,
  trackBorder = 'transparent',
  indicator = sys.color.content.base,
  corner = sys.shape.corner.sharp,
}: RangeTrackRootVarsOptions = {}): NonNullable<StyleRule['vars']> {
  return assignVars(rangeTrackVars, {
    color: {
      background: trackBackground,
      border: trackBorder,
      indicator,
    },
    shape: {
      corner,
    },
  });
}

export interface RangeTrackStylesOptions {
  blockSize: string;
  overflow?: 'hidden';
}

export function createRangeTrackStyles({
  blockSize,
  overflow,
}: RangeTrackStylesOptions): StyleRule {
  return {
    blockSize,
    overflow,
    backgroundColor: rangeTrackVars.color.background,
    boxShadow: `inset 0 0 0 1px ${rangeTrackVars.color.border}`,
    borderRadius: rangeTrackVars.shape.corner,
  };
}

export function createRangeIndicatorStyles(): StyleRule {
  return {
    display: 'block',
    blockSize: '100%',
    backgroundColor: rangeTrackVars.color.indicator,
    borderRadius: rangeTrackVars.shape.corner,
  };
}
