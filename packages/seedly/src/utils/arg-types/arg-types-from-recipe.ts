import { type ComplexStyleRule } from '@vanilla-extract/css';
import { type RuntimeFn } from '@vanilla-extract/recipes';

type RecipeStyleRule = ComplexStyleRule | string;
type VariantDefinitions = Record<string, RecipeStyleRule>;
type VariantGroups = Record<string, VariantDefinitions>;

export function argTypesFromRecipe(
  recipe: RuntimeFn<VariantGroups>,
  excludes: string[] = [],
) {
  return Object.entries(recipe.classNames.variants).reduce(
    (acc, [name, variant]) => {
      if (excludes.includes(name)) {
        return acc;
      }

      const options = Object.keys(variant);
      let control = options.length > 5 ? 'select' : 'radio';

      if (options.length === 1 && options[0] === 'true') {
        options.push('false');
        control = 'boolean';
      }

      if (name === 'tone') {
        control = 'select';
      }

      return {
        ...acc,
        [name]: {
          control,
          options,
        },
      };
    },
    {},
  );
}
