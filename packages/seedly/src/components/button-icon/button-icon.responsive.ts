import { defaultOrder, responsiveRecipe } from '../../styles/responsive';

import { buttonIcon, sizeAt, variantAt } from './button-icon.css';

export const buttonIconResponsive = responsiveRecipe({
  recipe: buttonIcon,
  at: { size: sizeAt, variant: variantAt },
  order: defaultOrder,
});
