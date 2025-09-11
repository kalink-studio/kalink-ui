import { defaultOrder, responsiveRecipe } from '../../styles/responsive';

import {
  alignContentAt,
  alignItemsAt,
  columnsAt,
  autoLayoutAt,
  gridRecipe,
  justifyContentAt,
  justifyItemsAt,
  rowSpacingAt,
  spacingAt,
  columnSpacingAt,
} from './grid.css';

export const gridResponsive = responsiveRecipe({
  recipe: gridRecipe,
  at: {
    spacing: spacingAt,
    columnSpacing: columnSpacingAt,
    rowSpacing: rowSpacingAt,
    columns: columnsAt,
    autoLayout: autoLayoutAt,
    justifyItems: justifyItemsAt,
    alignItems: alignItemsAt,
    justifyContent: justifyContentAt,
    alignContent: alignContentAt,
  },
  order: defaultOrder,
});
