import { defaultOrder, responsiveRecipe } from '../../styles/responsive';
import { radiusAt, spacingAt } from '../layout/layout.css';

import { boxRecipe } from './box.css';

export const boxResponsive = responsiveRecipe({
  recipe: boxRecipe,
  at: { spacing: spacingAt, radius: radiusAt },
  order: defaultOrder,
});
