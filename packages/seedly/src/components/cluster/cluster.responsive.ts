import { defaultOrder, responsiveRecipe } from '../../styles/responsive';

import { alignAt, clusterRecipe, justifyAt, spacingAt } from './cluster.css';

export const clusterResponsive = responsiveRecipe({
  recipe: clusterRecipe,
  at: { spacing: spacingAt, justify: justifyAt, align: alignAt },
  order: defaultOrder,
});
