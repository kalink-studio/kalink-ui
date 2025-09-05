import { defaultOrder, responsiveRecipe } from '../../styles/responsive';

import { spacingAt, switcherRecipe } from './switcher.css';

export const switcherResponsive = responsiveRecipe({
  recipe: switcherRecipe,
  at: { spacing: spacingAt },
  order: defaultOrder,
});
