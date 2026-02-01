import { defaultOrder, responsiveRecipe } from '../../styles/responsive';
import { toneAt } from '../button/button.css';

import { buttonIconRecipe, sizeAt, variantAt } from './button-icon.css';

export const buttonIconResponsive = responsiveRecipe({
  recipe: buttonIconRecipe,
  at: { size: sizeAt, variant: variantAt, tone: toneAt },
  order: defaultOrder,
});
