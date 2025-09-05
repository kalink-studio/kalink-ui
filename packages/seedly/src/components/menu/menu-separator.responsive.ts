import { defaultOrder, responsiveRecipe } from '../../styles/responsive';

import { menuSeparator, spacingAt } from './menu-separator.css';

export const menuSeparatorResponsive = responsiveRecipe({
  recipe: menuSeparator,
  at: { spacing: spacingAt },
  order: defaultOrder,
});
