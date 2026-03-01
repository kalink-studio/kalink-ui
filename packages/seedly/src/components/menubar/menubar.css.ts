import { style } from '@vanilla-extract/css';

export {
  button as menuTrigger,
  item as menuItem,
  popup as menuPopup,
  positioner as menuPositioner,
  separator as menuSeparator,
} from '../menu/menu.css';

export const menubar = style({
  display: 'flex',
});
