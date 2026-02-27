import { type StyleRule } from '@vanilla-extract/css';

export interface InsetHighlightStylesOptions {
  selector?: string;
  textColor?: string;
  backgroundColor: string;
  insetInline: string;
  borderRadius: string;
}

export function createInsetHighlightStyles(
  options: InsetHighlightStylesOptions,
): StyleRule {
  const selector = options.selector ?? '&[data-highlighted]';

  return {
    selectors: {
      [selector]: {
        zIndex: '0',
        position: 'relative',
        color: options.textColor,
      },
      [`${selector}::before`]: {
        content: "''",
        zIndex: '-1',
        position: 'absolute',
        insetBlock: '0',
        insetInline: options.insetInline,
        borderRadius: options.borderRadius,
        backgroundColor: options.backgroundColor,
      },
    },
  };
}
