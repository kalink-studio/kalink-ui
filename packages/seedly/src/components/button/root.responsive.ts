import { type RecipeVariants } from '@vanilla-extract/recipes';

import { buttonRecipe, type ButtonVariants } from './root.css';

type ButtonResponsiveVariants = NonNullable<
  RecipeVariants<typeof buttonRecipe>
>;

export const buttonResponsive = (props: ButtonResponsiveVariants = {}) => {
  return buttonRecipe(props);
};

export type ResponsiveButtonVariants = ButtonVariants;
