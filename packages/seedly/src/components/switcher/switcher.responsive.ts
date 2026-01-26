import { defaultOrder, responsiveRecipe } from '../../styles/responsive';

import { limitAt, spacingAt, switcherRecipe } from './switcher.css';

export const switcherResponsive = responsiveRecipe({
  recipe: switcherRecipe,
  at: { spacing: spacingAt, limit: limitAt },
  order: defaultOrder,
});
