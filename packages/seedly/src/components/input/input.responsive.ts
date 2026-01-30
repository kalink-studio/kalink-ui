import { defaultOrder, responsiveRecipe } from '../../styles/responsive';

import { inputAppearanceRecipe, sizeAt } from './input.css';

export const inputAppearanceResponsive = responsiveRecipe({
  recipe: inputAppearanceRecipe,
  at: { size: sizeAt },
  order: defaultOrder,
});
