import { defaultOrder, responsiveRecipe } from '../../styles/responsive';
import { radiusAt } from '../layout/layout.css';

import { boxRecipe } from './box.css';

export const boxResponsive = responsiveRecipe({
  recipe: boxRecipe,
  at: { radius: radiusAt },
  order: defaultOrder,
});
