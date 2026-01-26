import { defaultOrder, responsiveRecipe } from '../../styles/responsive';

import { andTextAt, centerRecipe, guttersAt, intrinsicAt } from './center.css';

export const centerResponsive = responsiveRecipe({
  recipe: centerRecipe,
  at: { gutters: guttersAt, andText: andTextAt, intrinsic: intrinsicAt },
  order: defaultOrder,
});
