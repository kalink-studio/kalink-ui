import { coverRecipe, type CoverVariants } from './cover.css';

export const coverResponsive = (props: CoverVariants = {}) => {
  return coverRecipe(props);
};
