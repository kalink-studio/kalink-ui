import { assignVars, createThemeContract } from '@vanilla-extract/css';
import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';

import { sys } from '../../styles';
import { components } from '../../styles/layers.css';

interface LabelTypographyStylesOptions {
  font: string;
  lineHeight: string;
  size: string;
  tracking: string;
  weight: string;
}

export const labelVars = createThemeContract({
  typography: {
    captionFont: null,
    captionLineHeight: null,
    captionSize: null,
    captionTracking: null,
    captionWeight: null,
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
    captionFont: sys.typography.label.large.font,
    captionLineHeight: sys.typography.label.large.lineHeight,
    captionSize: sys.typography.label.large.size,
    captionTracking: sys.typography.label.large.tracking,
    captionWeight: sys.typography.label.large.weight,
    choiceFont: sys.typography.body.large.font,
    choiceLineHeight: sys.typography.body.large.lineHeight,
    choiceSize: sys.typography.body.large.size,
    choiceTracking: sys.typography.body.large.tracking,
    choiceWeight: sys.typography.body.large.weight,
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
      [components]: {
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
      [components]: {
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
      caption: createLabelTypographyStyles({
        font: labelVars.typography.captionFont,
        lineHeight: labelVars.typography.captionLineHeight,
        size: labelVars.typography.captionSize,
        tracking: labelVars.typography.captionTracking,
        weight: labelVars.typography.captionWeight,
      }),
    },
  },

  defaultVariants: {
    variant: 'field',
  },
});

export type LabelVariants = NonNullable<RecipeVariants<typeof labelRecipe>>;
