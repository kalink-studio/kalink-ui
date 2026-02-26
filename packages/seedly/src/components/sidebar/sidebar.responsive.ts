import { sidebarRecipe, type SidebarVariants } from './sidebar.css';

export const sidebarResponsive = (props: SidebarVariants = {}) => {
  return sidebarRecipe(props);
};
