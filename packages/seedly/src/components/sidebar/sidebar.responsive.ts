import { defaultOrder, responsiveRecipe } from '../../styles/responsive';

import { sidebarRecipe, spacingAt } from './sidebar.css';

export const sidebarResponsive = responsiveRecipe({
  recipe: sidebarRecipe,
  at: { spacing: spacingAt },
  order: defaultOrder,
});
