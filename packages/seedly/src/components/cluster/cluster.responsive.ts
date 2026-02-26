import { defaultOrder, responsiveRecipe } from '../../styles/responsive';

import { alignAt, clusterRecipe, directionAt, justifyAt } from './cluster.css';

export const clusterResponsive = responsiveRecipe({
  recipe: clusterRecipe,
  at: {
    justify: justifyAt,
    align: alignAt,
    direction: directionAt,
  },
  order: defaultOrder,
});
