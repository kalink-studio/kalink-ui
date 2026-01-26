import { defaultOrder, responsiveRecipe } from '../../styles/responsive';

import { frameRecipe, ratioAt } from './frame.css';

export const frameResponsive = responsiveRecipe({
  recipe: frameRecipe,
  at: { ratio: ratioAt },
  order: defaultOrder,
});
