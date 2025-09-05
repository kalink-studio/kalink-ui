import { defaultOrder, responsiveRecipe } from '../../styles/responsive';

import { boxRecipe, spacingAt } from './box.css';

export const boxResponsive = responsiveRecipe({
  recipe: boxRecipe,
  at: { spacing: spacingAt },
  order: defaultOrder,
});
