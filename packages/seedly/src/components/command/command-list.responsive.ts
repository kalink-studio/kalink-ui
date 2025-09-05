import { defaultOrder, responsiveRecipe } from '../../styles/responsive';

import { commandList, spacingAt } from './command-list.css';

export const commandListResponsive = responsiveRecipe({
  recipe: commandList,
  at: { spacing: spacingAt },
  order: defaultOrder,
});
