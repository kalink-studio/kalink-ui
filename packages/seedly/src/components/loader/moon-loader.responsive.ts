import { defaultOrder, responsiveRecipe } from '../../styles/responsive';

import { loaderWrapper, sizeAt } from './loader.css';

export const moonLoaderResponsive = responsiveRecipe({
  recipe: loaderWrapper,
  at: { size: sizeAt },
  order: defaultOrder,
});
