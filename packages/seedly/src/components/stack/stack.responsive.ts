import { defaultOrder, responsiveRecipe } from '../../styles/responsive';

import { alignAt, spacingAt, stackRecipe } from './stack.css';

export const stackResponsive = responsiveRecipe({
  recipe: stackRecipe,
  at: { spacing: spacingAt, align: alignAt },
  order: defaultOrder,
});
