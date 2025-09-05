import { defaultOrder, responsiveRecipe } from '../../styles/responsive';

import { gridRecipe, spacingAt } from './grid.css';

export const gridResponsive = responsiveRecipe({
  recipe: gridRecipe,
  at: { spacing: spacingAt },
  order: defaultOrder,
});
