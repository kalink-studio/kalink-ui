type ComponentClassName<State> =
  | string
  | ((state: State) => string | undefined);

function joinClassNames(
  baseClassName: string,
  className: string | undefined,
): string {
  if (className === undefined || className === '') {
    return baseClassName;
  }

  return `${baseClassName} ${className}`;
}

export function mergeClassName<State>(
  baseClassName: string,
  className: (state: State) => string | undefined,
): (state: State) => string;

export function mergeClassName(
  baseClassName: string,
  className: string | undefined,
): string;

export function mergeClassName<State>(
  baseClassName: string,
  className: ComponentClassName<State> | undefined,
): ComponentClassName<State>;

export function mergeClassName<State>(
  baseClassName: string,
  className: ComponentClassName<State> | undefined,
): ComponentClassName<State> {
  if (className === undefined || className === '') {
    return baseClassName;
  }

  if (typeof className === 'function') {
    return (state: State) => joinClassNames(baseClassName, className(state));
  }

  return joinClassNames(baseClassName, className);
}
