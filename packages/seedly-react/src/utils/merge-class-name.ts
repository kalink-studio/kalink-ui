type ComponentClassName<State> =
  | string
  | ((state: State) => string | undefined);

function joinClassNames(classNames: (string | undefined)[]): string {
  return classNames.filter(Boolean).join(' ');
}

export function mergeClassName<State>(
  ...classNames: [string, ...string[], (state: State) => string | undefined]
): (state: State) => string;

export function mergeClassName(
  ...classNames: [string, ...(string | undefined)[]]
): string;

export function mergeClassName<State>(
  ...classNames: [string, ...string[], ComponentClassName<State> | undefined]
): ComponentClassName<State>;

export function mergeClassName<State>(
  ...classNames: (ComponentClassName<State> | undefined)[]
): ComponentClassName<State> {
  const lastClassName = classNames.at(-1);

  if (typeof lastClassName === 'function') {
    const baseClassNames = classNames.slice(0, -1) as (string | undefined)[];
    const baseClassName = joinClassNames(baseClassNames);

    return (state: State) =>
      joinClassNames([baseClassName, lastClassName(state)]);
  }

  const mergedClassName = joinClassNames(classNames as (string | undefined)[]);

  if (mergedClassName === '') {
    return '';
  }

  return mergedClassName;
}
