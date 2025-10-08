type AnyRecord = Record<string, unknown>;

const isObject = (value: unknown): value is AnyRecord =>
  typeof value === 'object' && value !== null;

export const getValueByPath = (source: unknown, path: string): unknown => {
  if (!isObject(source) || path.length === 0) {
    return undefined;
  }

  const segments = path.split('.');

  return segments.reduce<unknown>((current, segment) => {
    if (!isObject(current) && !Array.isArray(current)) {
      return undefined;
    }

    if (Array.isArray(current)) {
      const index = Number(segment);

      if (!Number.isNaN(index) && current[index] !== undefined) {
        return current[index];
      }

      return undefined;
    }

    return current[segment];
  }, source);
};
