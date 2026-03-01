import { type StyleRule } from '@vanilla-extract/css';

export interface BarRootStylesOptions {
  alignItems?: 'center' | 'stretch';
  flexWrap?: 'wrap';
  gap?: string;
  inlineSize?: string;
  rowGap?: string;
}

export function createBarRootStyles(
  options: BarRootStylesOptions = {},
): StyleRule {
  return {
    display: 'flex',
    alignItems: options.alignItems,
    flexWrap: options.flexWrap,
    gap: options.gap,
    rowGap: options.rowGap,
    inlineSize: options.inlineSize,
  };
}
