import { createVar, globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import {
  createResponsiveVariants,
  defaultMedia,
  mapContractVars,
  sys,
  transition,
} from '../../styles';
import { components } from '../../styles/layers.css';

const spacingVar = createVar();

// Shared variant style maps so we can reuse them for responsive overrides
export const commandListSpacingStyles = mapContractVars(sys.spacing, (key) => ({
  '@layer': {
    [components]: {
      vars: {
        [spacingVar]: sys.spacing[key],
      },
    },
  },
}));

export const commandList = recipe({
  base: {
    '@layer': {
      [components]: {
        display: 'flex',
        flexDirection: 'column',
        gap: spacingVar,

        width: '100%',
        maxHeight: 350,
        overflow: 'auto',
        paddingInline: sys.spacing[2],
        paddingBlockEnd: sys.spacing[2],

        overscrollBehavior: 'contain',
        transition: transition(['height']),
      },
    },
  },

  variants: {
    spacing: commandListSpacingStyles,
  },
});

globalStyle(`${commandList.classNames.base} [cmdk-list-sizer]`, {
  '@layer': {
    [components]: {
      display: 'flex',
      flexDirection: 'column',
      gap: spacingVar,
    },
  },
});

export const spacingAt = createResponsiveVariants({
  styles: commandListSpacingStyles,
  media: defaultMedia,
});
