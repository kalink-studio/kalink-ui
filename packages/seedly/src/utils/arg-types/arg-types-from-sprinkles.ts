import { isObject } from '@kalink-ui/dibbly';

type ArgTypesFromSprinklesProps = {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  props: Record<string, any>;
  excludes?: string[];
  category?: string;
} & {};

export function argTypesFromSprinkles({
  props,
  excludes = [],
  category = 'Sprinkles props',
}: ArgTypesFromSprinklesProps) {
  return Object.entries(props).reduce((acc, [name]) => {
    if (Array.isArray(excludes) && excludes.includes(name)) {
      return acc;
    }

    let options = props[name] || [];
    let control = 'select';

    if (options.length === 1 && options[0] === 'true') {
      options.push('false');
      control = 'boolean';
    }

    if (isObject(options)) {
      options = Object.fromEntries(
        Object.keys(options).map((key) => [key, key]),
      );
    }

    return {
      ...acc,
      [name]: {
        control,
        options,
        table: { category },
      },
    };
  }, {});
}
