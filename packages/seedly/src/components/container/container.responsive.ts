import { defaultOrder, responsiveRecipe } from '../../styles/responsive';
import { radiusAt } from '../layout/layout.css';

import { containerRecipe } from './container.css';

export const containerResponsive = responsiveRecipe({
  recipe: containerRecipe,
  at: { radius: radiusAt },
  order: defaultOrder,
});
