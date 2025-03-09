import { createVar, globalStyle } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { sys } from '../../styles/system-contract.css';
import { mapContractVars } from '../../utils/map-contract-vars';

const spacing = createVar();

export const stackRecipe = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  variants: {
    recursive: {
      true: {},
    },

    spacing: mapContractVars(sys.spacing, (key) => ({
      vars: {
        [spacing]: sys.spacing[key],
      },
    })),
  },
});

globalStyle(
  `${stackRecipe.classNames.base} > * + *, ${stackRecipe.classNames.variants.recursive.true} * + *`,
  {
    marginBlockStart: spacing,
  },
);

export type StackVariants = NonNullable<RecipeVariants<typeof stackRecipe>>;
