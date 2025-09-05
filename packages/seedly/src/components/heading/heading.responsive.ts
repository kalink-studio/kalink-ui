import { defaultOrder, responsiveRecipe } from '../../styles/responsive';

import {
  alignAt,
  headingRoot,
  pretitle,
  pretitleSpacingAt,
  subtitle,
  subtitleSpacingAt,
} from './heading.css';

export const headingRootResponsive = responsiveRecipe({
  recipe: headingRoot,
  at: { align: alignAt },
  order: defaultOrder,
});

export const pretitleResponsive = responsiveRecipe({
  recipe: pretitle,
  at: { spacing: pretitleSpacingAt },
  order: defaultOrder,
});

export const subtitleResponsive = responsiveRecipe({
  recipe: subtitle,
  at: { spacing: subtitleSpacingAt },
  order: defaultOrder,
});
