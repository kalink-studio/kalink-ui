import { defaultOrder, responsiveRecipe } from '../../styles/responsive';
import { cornerAt } from '../layout/layout.css';

import { boxRecipe } from './box.css';

export const boxResponsive = responsiveRecipe({
  recipe: boxRecipe,
  at: { corner: cornerAt },
  order: defaultOrder,
});
