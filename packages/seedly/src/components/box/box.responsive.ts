import { defaultOrder, responsiveRecipe } from '../../styles/responsive';

import { boxCornerAt, boxRecipe } from './box.css';

export const boxResponsive = responsiveRecipe({
  recipe: boxRecipe,
  at: { corner: boxCornerAt },
  order: defaultOrder,
});
