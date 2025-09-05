import { defaultOrder, responsiveRecipe } from '../../styles/responsive';

import { buttonRecipe, sizeAt, variantAt } from './button.css';

export const buttonResponsive = responsiveRecipe({
  recipe: buttonRecipe,
  at: { size: sizeAt, variant: variantAt },
  order: defaultOrder,
});

// Button label uses typography classes; drive changes via root size.
