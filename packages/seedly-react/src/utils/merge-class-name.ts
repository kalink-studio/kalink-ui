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
  className: ComponentClassName<State> | undefined,
): ComponentClassName<State> {
  if (className === undefined || className === '') {
    return baseClassName;
  }

  if (typeof className === 'function') {
    return function mergedClassName(state: State) {
      const stateClassName = className(state);

      return joinClassNames(baseClassName, stateClassName);
    };
  }

  return joinClassNames(baseClassName, className);
}
