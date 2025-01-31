export const isObject = <T extends object>(value: unknown): value is T => {
  return !!value && typeof value === "object" && !Array.isArray(value);
};
