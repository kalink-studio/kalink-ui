import { type StyleRule } from '@vanilla-extract/css';

import { sys } from '../../styles';

export interface InsetHighlightStylesOptions {
  selector?: string;
  textColor?: string;
  backgroundColor?: string;
  insetInline?: string;
  borderRadius?: string;
}

export function createInsetHighlightStyles(
  options: InsetHighlightStylesOptions = {},
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
        insetInline: options.insetInline ?? sys.spacing[2],
        borderRadius: options.borderRadius ?? sys.shape.corner.small,
        backgroundColor: options.backgroundColor ?? sys.color.content.base,
      },
    },
  };
}
