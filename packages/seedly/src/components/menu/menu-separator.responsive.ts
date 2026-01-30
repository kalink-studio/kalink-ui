import { defaultOrder, responsiveRecipe } from '../../styles/responsive';

import { menuSeparatorRecipe, spacingAt } from './menu-separator.css';

export const menuSeparatorResponsive = responsiveRecipe({
  recipe: menuSeparatorRecipe,
  at: { spacing: spacingAt },
  order: defaultOrder,
});
