import { defaultOrder, responsiveRecipe } from '../../styles/responsive';

import {
  alignAt,
  headingRootRecipe,
  pretitleRecipe,
  pretitleSpacingAt,
  subtitleRecipe,
  subtitleSpacingAt,
} from './heading.css';

export const headingRootResponsive = responsiveRecipe({
  recipe: headingRootRecipe,
  at: { align: alignAt },
  order: defaultOrder,
});

export const pretitleResponsive = responsiveRecipe({
  recipe: pretitleRecipe,
  at: { spacing: pretitleSpacingAt },
  order: defaultOrder,
});

export const subtitleResponsive = responsiveRecipe({
  recipe: subtitleRecipe,
  at: { spacing: subtitleSpacingAt },
  order: defaultOrder,
});
