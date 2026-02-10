import { defaultOrder, responsiveRecipe } from '../../styles/responsive';

import { coverRecipe, spacingAt } from './cover.css';

export const coverResponsive = responsiveRecipe({
  recipe: coverRecipe,
  at: { spacing: spacingAt },
  order: defaultOrder,
});
