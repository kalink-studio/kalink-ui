import { defaultOrder, responsiveRecipe } from '../../styles/responsive';

import {
  alignSelfAt,
  colEndAt,
  colSpanAt,
  colStartAt,
  gridChildRecipe,
  justifySelfAt,
  rowEndAt,
  rowSpanAt,
  rowStartAt,
} from './grid-child.css';

export const gridChildResponsive = responsiveRecipe({
  recipe: gridChildRecipe,
  at: {
    colSpan: colSpanAt,
    rowSpan: rowSpanAt,
    colStart: colStartAt,
    colEnd: colEndAt,
    rowStart: rowStartAt,
    rowEnd: rowEndAt,
    justifySelf: justifySelfAt,
    alignSelf: alignSelfAt,
  },
  order: defaultOrder,
});
