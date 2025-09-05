import { defaultOrder, responsiveRecipe } from '../../styles/responsive';

import { centerRecipe, guttersAt } from './center.css';

export const centerResponsive = responsiveRecipe({
  recipe: centerRecipe,
  at: { gutters: guttersAt },
  order: defaultOrder,
});
