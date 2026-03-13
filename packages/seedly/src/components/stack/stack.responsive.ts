import { defaultOrder, responsiveRecipe } from '../../styles/responsive';

import { alignAt, stackRecipe } from './stack.css';

export const stackResponsive = responsiveRecipe({
  recipe: stackRecipe,
  at: { align: alignAt },
  order: defaultOrder,
});
