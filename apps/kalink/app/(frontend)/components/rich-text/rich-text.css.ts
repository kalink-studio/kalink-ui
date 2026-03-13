import { sys } from '@kalink-ui/seedly/styles';
import { createVar } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const spacingAfter = createVar();

export const headingRichText = recipe({
  base: {
    marginBlockEnd: spacingAfter,
  },
  variants: {
    level: {
      h1: {
        vars: {
          [spacingAfter]: sys.spacing[12],
        },
      },
      h2: {
        vars: {
          [spacingAfter]: sys.spacing[12],
        },
      },
      h3: {
        vars: {
          [spacingAfter]: sys.spacing[8],
        },
      },
      h4: {
        vars: {
          [spacingAfter]: sys.spacing[8],
        },
      },
      h5: {
        vars: {
          [spacingAfter]: sys.spacing[4],
        },
      },
      h6: {
        vars: {
          [spacingAfter]: sys.spacing[4],
        },
      },
    },
  },
});
