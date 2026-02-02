import { defaultOrder, responsiveRecipe } from '../../styles/responsive';
import { radiusAt, spacingAt } from '../layout/layout.css';

import { containerRecipe } from './container.css';

export const containerResponsive = responsiveRecipe({
  recipe: containerRecipe,
  at: { spacing: spacingAt, radius: radiusAt },
  order: defaultOrder,
});
