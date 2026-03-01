import { style } from '@vanilla-extract/css';

import { createBarRootStyles } from '../_foundation';

export {
  button as menuTrigger,
  item as menuItem,
  popup as menuPopup,
  positioner as menuPositioner,
  separator as menuSeparator,
} from '../menu/menu.css';

export const menubar = style(createBarRootStyles());
