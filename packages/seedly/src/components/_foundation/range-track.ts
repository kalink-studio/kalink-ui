import { type StyleRule } from '@vanilla-extract/css';

export interface RangeTrackStylesOptions {
  backgroundColor: string;
  blockSize: string;
  borderColor: string;
  borderRadius: string;
  overflow?: 'hidden';
}

export interface RangeIndicatorStylesOptions {
  backgroundColor: string;
  borderRadius: string;
}

export function createRangeTrackStyles({
  backgroundColor,
  blockSize,
  borderColor,
  borderRadius,
  overflow,
}: RangeTrackStylesOptions): StyleRule {
  return {
    blockSize,
    overflow,
    backgroundColor,
    boxShadow: `inset 0 0 0 1px ${borderColor}`,
    borderRadius,
  };
}

export function createRangeIndicatorStyles({
  backgroundColor,
  borderRadius,
}: RangeIndicatorStylesOptions): StyleRule {
  return {
    display: 'block',
    blockSize: '100%',
    backgroundColor,
    borderRadius,
  };
}
