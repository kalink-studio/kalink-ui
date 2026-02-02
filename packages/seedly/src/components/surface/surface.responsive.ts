import { defaultOrder, responsiveRecipe } from '../../styles/responsive';
import { radiusAt, spacingAt } from '../layout/layout.css';

import { surfaceRecipe } from './surface.css';

export const surfaceResponsive = responsiveRecipe({
  recipe: surfaceRecipe,
  at: { spacing: spacingAt, radius: radiusAt },
  order: defaultOrder,
});
