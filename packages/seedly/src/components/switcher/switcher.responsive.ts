import { defaultOrder, responsiveRecipe } from '../../styles/responsive';

import { limitAt, switcherRecipe } from './switcher.css';

export const switcherResponsive = responsiveRecipe({
  recipe: switcherRecipe,
  at: { limit: limitAt },
  order: defaultOrder,
});
