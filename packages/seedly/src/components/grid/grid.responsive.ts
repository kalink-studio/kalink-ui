import { defaultOrder, responsiveRecipe } from '../../styles/responsive';

import {
  alignContentAt,
  alignItemsAt,
  autoLayoutAt,
  columnsAt,
  gridRecipe,
  justifyContentAt,
  justifyItemsAt,
} from './grid.css';

export const gridResponsive = responsiveRecipe({
  recipe: gridRecipe,
  at: {
    columns: columnsAt,
    autoLayout: autoLayoutAt,
    justifyItems: justifyItemsAt,
    alignItems: alignItemsAt,
    justifyContent: justifyContentAt,
    alignContent: alignContentAt,
  },
  order: defaultOrder,
});
