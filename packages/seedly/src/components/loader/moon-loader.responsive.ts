import { defaultOrder, responsiveRecipe } from '../../styles/responsive';

import { loaderWrapperRecipe, sizeAt } from './loader.css';

export const moonLoaderResponsive = responsiveRecipe({
  recipe: loaderWrapperRecipe,
  at: { size: sizeAt },
  order: defaultOrder,
});
