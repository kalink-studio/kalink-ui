import { defaultOrder, responsiveRecipe } from '../../styles/responsive';

import { commandListRecipe, spacingAt } from './command-list.css';

export const commandListResponsive = responsiveRecipe({
  recipe: commandListRecipe,
  at: { spacing: spacingAt },
  order: defaultOrder,
});
