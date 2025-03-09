import { createVar, globalStyle } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { sys } from '../../styles/system-contract.css';
import { mapContractVars } from '../../utils/map-contract-vars';

const spaceVar = createVar();
export const minSizeVar = createVar();

export const coverRecipe = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',

    minBlockSize: minSizeVar,
    padding: spaceVar,

    vars: {
      [minSizeVar]: '100vh',
    },
  },

  variants: {
    spacing: mapContractVars(sys.spacing, (key) => ({
      sys: {
        [spaceVar]: sys.spacing[key],
      },
    })),

    noPad: {
      true: {
        padding: 0,
      },
    },
  },
});

globalStyle(`${coverRecipe.classNames.base} > *`, {
  marginBlock: spaceVar,
});

globalStyle(
  `${coverRecipe.classNames.base} > :first-child:not([data-cover-center])`,
  {
    marginBlockStart: 0,
  },
);

globalStyle(
  `${coverRecipe.classNames.base} > :last-child:not([data-cover-center])`,
  {
    marginBlockEnd: 0,
  },
);

globalStyle(`${coverRecipe.classNames.base} > [data-cover-center]`, {
  marginBlock: 'auto',
});

export type CoverVariants = NonNullable<RecipeVariants<typeof coverRecipe>>;
