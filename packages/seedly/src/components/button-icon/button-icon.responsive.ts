import { defaultOrder, responsiveRecipe } from '../../styles/responsive';

import { buttonIconRecipe, sizeAt, variantAt } from './button-icon.css';

export const buttonIconResponsive = responsiveRecipe({
  recipe: buttonIconRecipe,
  at: { size: sizeAt, variant: variantAt },
  order: defaultOrder,
});
