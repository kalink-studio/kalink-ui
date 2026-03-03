import { type StyleRule } from '@vanilla-extract/css';

interface BackdropSurfaceStylesOptions {
  backdropFilter?: string;
  backgroundColor: string;
  hideOnLifecycleStates?: boolean;
  includeWebkitFixedFallback?: boolean;
  minBlockSize?: string;
  position: 'absolute' | 'fixed';
  transition?: string;
  vars?: Record<string, string>;
  zIndex?: number;
}

export function createBackdropSurfaceStyles(
  options: BackdropSurfaceStylesOptions,
): StyleRule {
  const media: Record<string, StyleRule> = {};
  const selectors: Record<string, StyleRule> = {};
  const supports: Record<string, StyleRule> = {};

  if (options.includeWebkitFixedFallback) {
    supports['(-webkit-touch-callout: none)'] = {
      position: 'absolute',
    };
  }

  if (options.hideOnLifecycleStates) {
    selectors['&[data-starting-style]'] = {
      opacity: '0',
    };

    selectors['&[data-ending-style]'] = {
      opacity: '0',
    };
  }

  return {
    vars: options.vars,

    minBlockSize: options.minBlockSize,

    position: options.position,
    insetBlock: '0',
    insetInline: '0',
    zIndex: options.zIndex,

    backgroundColor: options.backgroundColor,

    backdropFilter: options.backdropFilter,
    WebkitBackdropFilter: options.backdropFilter,

    transition: options.transition,

    selectors,

    '@supports': supports,

    '@media': media,
  };
}
