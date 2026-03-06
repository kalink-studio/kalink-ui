import { assignVars, createThemeContract, style } from '@vanilla-extract/css';

import { stateColor, sys, typography } from '../../styles';
import { organisms } from '../../styles/layers.css';
import { createBarRootStyles } from '../_foundation';

export const toolbarVars = createThemeContract({
  color: {
    buttonActiveBackground: null,
    buttonFocusRing: null,
    buttonHoverBackground: null,
    buttonPressedBackground: null,
    buttonPressedForeground: null,
    linkFocusRing: null,
    linkForeground: null,
    linkHoverForeground: null,
    separatorBackground: null,
  },

  layout: {
    buttonComboboxMaxInlineSize: null,
    buttonFocusRingOffset: null,
    rootInlineSize: null,
  },

  shape: {
    linkFocusCorner: null,
  },

  size: {
    separatorBlockSize: null,
    separatorInlineSize: null,
  },

  spacing: {
    buttonPressedPaddingBlock: null,
    buttonPressedPaddingInline: null,
    groupGap: null,
    linkMarginInlineEnd: null,
    linkFocusRingOffset: null,
    rootGap: null,
    rootRowGap: null,
    separatorMarginBlock: null,
    separatorMarginInline: null,
  },
});

const toolbarDefaults = assignVars(toolbarVars, {
  color: {
    buttonActiveBackground: sys.color.container.high,
    buttonFocusRing: sys.color.tone.primary,
    buttonHoverBackground: sys.color.container.low,
    buttonPressedBackground: sys.color.container.low,
    buttonPressedForeground: sys.color.content.base,
    linkFocusRing: sys.color.tone.primary,
    linkForeground: stateColor.mutedContent,
    linkHoverForeground: sys.color.tone.primary,
    separatorBackground: sys.color.border.high,
  },

  layout: {
    buttonComboboxMaxInlineSize: '12rem',
    buttonFocusRingOffset: '-1px',
    rootInlineSize: '100%',
  },

  shape: {
    linkFocusCorner: sys.shape.corner.small,
  },

  size: {
    separatorBlockSize: sys.spacing[8],
    separatorInlineSize: '1px',
  },

  spacing: {
    buttonPressedPaddingBlock: sys.spacing[0],
    buttonPressedPaddingInline: sys.spacing[6],
    groupGap: sys.spacing[2],
    linkMarginInlineEnd: sys.spacing[6],
    linkFocusRingOffset: '-2px',
    rootGap: sys.spacing[1],
    rootRowGap: sys.spacing[1],
    separatorMarginBlock: sys.spacing[2],
    separatorMarginInline: sys.spacing[2],
  },
});

export const toolbar = style({
  '@layer': {
    [organisms]: {
      ...createBarRootStyles({
        alignItems: 'stretch',
        flexWrap: 'wrap',
        gap: toolbarVars.spacing.rootGap,
        inlineSize: toolbarVars.layout.rootInlineSize,
        rowGap: toolbarVars.spacing.rootRowGap,
      }),

      vars: {
        ...toolbarDefaults,
      },
    },
  },
});

export const group = style({
  '@layer': {
    [organisms]: {
      ...createBarRootStyles({
        gap: toolbarVars.spacing.groupGap,
      }),
    },
  },
});

export const button = style([
  {
    '@layer': {
      [organisms]: {
        borderWidth: '0',
        vars: {
          ...toolbarDefaults,
        },

        selectors: {
          '&:hover:not(:disabled):not([data-disabled]):not([data-loading])': {
            '@media': {
              '(hover: hover)': {
                backgroundColor: toolbarVars.color.buttonHoverBackground,
              },
            },
          },
          '&:active:not(:disabled):not([data-disabled]):not([data-loading])': {
            backgroundColor: toolbarVars.color.buttonActiveBackground,
          },
          '&[data-pressed]': {
            backgroundColor: toolbarVars.color.buttonPressedBackground,
            color: toolbarVars.color.buttonPressedForeground,
          },
          [`&[role='combobox']`]: {
            inlineSize: `min(100%, ${toolbarVars.layout.buttonComboboxMaxInlineSize})`,
            maxInlineSize: toolbarVars.layout.buttonComboboxMaxInlineSize,
          },
          '&:focus-visible': {
            outline: `2px solid ${toolbarVars.color.buttonFocusRing}`,
            outlineOffset: toolbarVars.layout.buttonFocusRingOffset,
          },
          [`&[aria-pressed]`]: {
            paddingBlock: toolbarVars.spacing.buttonPressedPaddingBlock,
            paddingInline: toolbarVars.spacing.buttonPressedPaddingInline,
          },
        },
      },
    },
  },
]);

export const separator = style({
  '@layer': {
    [organisms]: {
      vars: {
        ...toolbarDefaults,
      },
      inlineSize: toolbarVars.size.separatorInlineSize,
      blockSize: toolbarVars.size.separatorBlockSize,
      marginBlock: toolbarVars.spacing.separatorMarginBlock,
      marginInline: toolbarVars.spacing.separatorMarginInline,
      backgroundColor: toolbarVars.color.separatorBackground,
      alignSelf: 'center',
    },
  },
});

export const link = style([
  typography.body.medium,
  {
    '@layer': {
      [organisms]: {
        vars: {
          ...toolbarDefaults,
        },
        alignSelf: 'center',
        flex: '0 0 auto',
        marginInline: `auto ${toolbarVars.spacing.linkMarginInlineEnd}`,
        color: toolbarVars.color.linkForeground,
        textDecoration: 'none',

        selectors: {
          [`&:focus-visible`]: {
            outline: `2px solid ${toolbarVars.color.linkFocusRing}`,
            outlineOffset: toolbarVars.spacing.linkFocusRingOffset,
            borderRadius: toolbarVars.shape.linkFocusCorner,
          },
          [`&:hover`]: {
            '@media': {
              '(hover: hover)': {
                color: toolbarVars.color.linkHoverForeground,
              },
            },
          },
        },
      },
    },
  },
]);
