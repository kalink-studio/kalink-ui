import { defaultOrder, responsiveRecipe } from '../../styles/responsive';

import {
  alignAt,
  justifyAt,
  listRecipe,
  markerPositionAt,
  orientationAt,
} from './list.css';

export const listResponsive = responsiveRecipe({
  recipe: listRecipe,
  at: {
    align: alignAt,
    justify: justifyAt,
    markerPosition: markerPositionAt,
    orientation: orientationAt,
  },
  order: defaultOrder,
});
