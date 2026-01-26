import { defaultOrder, responsiveRecipe } from '../../styles/responsive';

import { alignAt, lineClampAt, textRecipe, wrapAt } from './text.css';

export const textResponsive = responsiveRecipe({
  recipe: textRecipe,
  at: { align: alignAt, wrap: wrapAt, lineClamp: lineClampAt },
  order: defaultOrder,
});
