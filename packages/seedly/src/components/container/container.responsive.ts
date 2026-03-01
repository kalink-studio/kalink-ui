import { defaultOrder, responsiveRecipe } from '../../styles/responsive';
import { cornerAt } from '../layout/layout.css';

import { containerRecipe } from './container.css';

export const containerResponsive = responsiveRecipe({
  recipe: containerRecipe,
  at: { corner: cornerAt },
  order: defaultOrder,
});
