import { globalStyle, style } from '@vanilla-extract/css';

import { sys, typography } from '../../styles';
import { components } from '../../styles/layers.css';

export const commandGroup = style([
  typography.label.small,
  {
    '@layer': {
      [components]: {
        display: 'flex',
        flexDirection: 'column',
        gap: sys.spacing[2],

        selectors: {
          '&[hidden]': {
            display: 'none',

            position: 'absolute',
          },
        },
      },
    },
  },
]);

globalStyle(`${commandGroup} [cmdk-group-heading]`, {
  '@layer': {
    [components]: {
      position: 'relative',

      color: `color-mix(in srgb, ${sys.color.foreground} calc(${sys.state.muted.light} * 100%), transparent)`,

      cursor: 'default',
      userSelect: 'none',
    },
  },
});
