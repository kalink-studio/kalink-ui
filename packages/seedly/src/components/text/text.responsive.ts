import { defaultOrder, responsiveRecipe } from '../../styles';

import { alignAt, textRecipe } from './text.css';

export const textResponsive = responsiveRecipe({
  recipe: textRecipe,
  at: { align: alignAt },
  order: defaultOrder,
});
