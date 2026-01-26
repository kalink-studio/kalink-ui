import { defaultOrder, responsiveRecipe } from '../../styles/responsive';

import { boxRecipe, radiusAt, spacingAt } from './box.css';

export const boxResponsive = responsiveRecipe({
  recipe: boxRecipe,
  at: { spacing: spacingAt, radius: radiusAt },
  order: defaultOrder,
});
