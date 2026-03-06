import { assignVars, createThemeContract } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { sys } from '../../styles';
import { atoms } from '../../styles/layers.css';

interface LabelTypographyStylesOptions {
  font: string;
  lineHeight: string;
  size: string;
  tracking: string;
  weight: string;
}

export const labelVars = createThemeContract({
  typography: {
    choiceFont: null,
    choiceLineHeight: null,
    choiceSize: null,
    choiceTracking: null,
    choiceWeight: null,
    fieldFont: null,
    fieldLineHeight: null,
    fieldSize: null,
    fieldTracking: null,
    fieldWeight: null,
  },
});

const labelDefaults = assignVars(labelVars, {
  typography: {
    choiceFont: sys.typography.label.medium.font,
    choiceLineHeight: sys.typography.label.medium.lineHeight,
    choiceSize: sys.typography.label.medium.size,
    choiceTracking: sys.typography.label.medium.tracking,
    choiceWeight: sys.typography.label.medium.weight,
    fieldFont: sys.typography.label.medium.font,
    fieldLineHeight: sys.typography.label.medium.lineHeight,
    fieldSize: sys.typography.label.medium.size,
    fieldTracking: sys.typography.label.medium.tracking,
    fieldWeight: sys.typography.label.medium.weight,
  },
});

function createLabelTypographyStyles(options: LabelTypographyStylesOptions) {
  return {
    '@layer': {
      [atoms]: {
        fontFamily: options.font,
        fontSize: options.size,
        fontWeight: options.weight,
        letterSpacing: options.tracking,
        lineHeight: options.lineHeight,
      },
    },
  };
}

export const labelRecipe = recipe({
  base: {
    '@layer': {
      [atoms]: {
        vars: labelDefaults,
      },
    },
  },

  variants: {
    variant: {
      field: createLabelTypographyStyles({
        font: labelVars.typography.fieldFont,
        lineHeight: labelVars.typography.fieldLineHeight,
        size: labelVars.typography.fieldSize,
        tracking: labelVars.typography.fieldTracking,
        weight: labelVars.typography.fieldWeight,
      }),
      choice: createLabelTypographyStyles({
        font: labelVars.typography.choiceFont,
        lineHeight: labelVars.typography.choiceLineHeight,
        size: labelVars.typography.choiceSize,
        tracking: labelVars.typography.choiceTracking,
        weight: labelVars.typography.choiceWeight,
      }),
    },
  },

  defaultVariants: {
    variant: 'field',
  },
});

export type LabelVariants = NonNullable<RecipeVariants<typeof labelRecipe>>;
