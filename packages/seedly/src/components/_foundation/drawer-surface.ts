import { type StyleRule } from '@vanilla-extract/css';

import { createBackdropSurfaceStyles } from './backdrop-surface';

interface DrawerBackdropStylesOptions {
  backdropColor: string;
  backdropOpacity: string;
  backdropOpacityDark: string;
  minBlockSize: string;
  transition: string;
  vars: Record<string, string>;
}

interface DrawerIndentBackgroundStylesOptions {
  backgroundColor: string;
}

interface DrawerIndentStylesOptions {
  backgroundColor: string;
  borderColor: string;
  corner: string;
  minBlockSize: string;
  padding: string;
  transition: string;
  translateY: string;
  vars: Record<string, string>;
}

interface DrawerViewportStylesOptions {
  padding: string;
  vars?: Record<string, string>;
  zIndex?: string;
}

export function createDrawerBackdropStyles(
  options: DrawerBackdropStylesOptions,
): StyleRule {
  return {
    ...createBackdropSurfaceStyles({
      vars: options.vars,
      minBlockSize: options.minBlockSize,
      position: 'fixed',
      includeWebkitFixedFallback: true,
      backgroundColor: options.backdropColor,
      transition: options.transition,
    }),

    opacity: `calc(${options.backdropOpacity} * (1 - var(--drawer-swipe-progress)))`,

    selectors: {
      '&[data-starting-style]': {
        opacity: '0',
      },
      '&[data-ending-style]': {
        opacity: '0',
        pointerEvents: 'none',
        transitionDuration: 'calc(var(--drawer-swipe-strength) * 400ms)',
      },
      '&[data-swiping]': {
        transitionDuration: '0ms',
      },
    },

    '@media': {
      '(prefers-color-scheme: dark)': {
        opacity: `calc(${options.backdropOpacityDark} * (1 - var(--drawer-swipe-progress)))`,
      },
    },
  };
}

export function createDrawerViewportStyles(
  options: DrawerViewportStylesOptions = { padding: '0' },
): StyleRule {
  return {
    vars: options.vars,

    position: 'fixed',
    insetBlock: '0',
    insetInline: '0',
    zIndex: options.zIndex,

    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',

    blockSize: '100%',
    inlineSize: '100%',
    overflow: 'hidden',

    padding: '0',
    pointerEvents: 'none',

    selectors: {
      '&:has(> [data-swipe-direction="left"])': {
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        padding: options.padding,
      },
      '&:has(> [data-swipe-direction="right"])': {
        alignItems: 'stretch',
        justifyContent: 'flex-end',
        padding: options.padding,
      },
      '&:has(> [data-swipe-direction="down"])': {
        alignItems: 'flex-end',
        justifyContent: 'center',
        touchAction: 'none',
      },
      '&:has(> [data-swipe-direction="up"])': {
        alignItems: 'flex-start',
        justifyContent: 'center',
        touchAction: 'none',
      },
    },
  };
}

export function createDrawerIndentStyles(
  options: DrawerIndentStylesOptions,
): StyleRule {
  return {
    vars: {
      ...options.vars,
      '--drawer-indent-progress': 'var(--drawer-swipe-progress)',
      '--drawer-indent-radius': `calc(${options.corner} * (1 - var(--drawer-indent-progress)))`,
      '--drawer-indent-transition':
        'calc(1 - clamp(0, calc(var(--drawer-swipe-progress) * 100000), 1))',
    },

    position: 'relative',
    minBlockSize: options.minBlockSize,
    contain: 'layout',
    padding: options.padding,

    backgroundColor: options.backgroundColor,
    border: `1px solid ${options.borderColor}`,

    transform: 'scale(1) translateY(0)',
    transformOrigin: 'center top',
    transition: options.transition,
    transitionDuration:
      'calc(400ms * var(--drawer-indent-transition)), calc(250ms * var(--drawer-indent-transition))',
    willChange: 'transform',

    selectors: {
      '&[data-active]': {
        transform: `scale(calc(0.98 + (0.02 * var(--drawer-indent-progress)))) translateY(calc(${options.translateY} * (1 - var(--drawer-indent-progress))))`,
        borderTopLeftRadius: 'var(--drawer-indent-radius)',
        borderTopRightRadius: 'var(--drawer-indent-radius)',
      },
    },
  };
}

export function createDrawerIndentBackgroundStyles(
  options: DrawerIndentBackgroundStylesOptions,
): StyleRule {
  return {
    position: 'absolute',
    insetBlock: '0',
    insetInline: '0',
    backgroundColor: options.backgroundColor,
  };
}
