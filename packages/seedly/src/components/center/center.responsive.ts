import { defaultOrder, responsiveRecipe } from '../../styles/responsive';

import { andTextAt, centerRecipe, intrinsicAt } from './center.css';

export const centerResponsive = responsiveRecipe({
  recipe: centerRecipe,
  at: { andText: andTextAt, intrinsic: intrinsicAt },
  order: defaultOrder,
});
