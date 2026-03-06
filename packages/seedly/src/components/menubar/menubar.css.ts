import { style } from '@vanilla-extract/css';

import { organisms } from '../../styles/layers.css';
import { createBarRootStyles } from '../_foundation';

export const menubar = style({
  '@layer': { [organisms]: createBarRootStyles() },
});
