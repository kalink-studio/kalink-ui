import type { HTMLAttributes, ReactElement } from 'react';

type ComponentClassName<State> =
  | string
  | ((state: State) => string | undefined);

type ComponentRender<State> =
  | ReactElement
  | ((props: HTMLAttributes<HTMLElement>, state: State) => ReactElement);

export function resolveStateClassName<State>(
  className: ComponentClassName<State> | undefined,
  state: State,
): string | undefined {
  if (typeof className === 'function') {
    return className(state);
  }

  return className;
}

export function resolveStateRender<State>(
  render: ComponentRender<State> | undefined,
  state: State,
):
  | ReactElement
  | ((props: HTMLAttributes<HTMLElement>) => ReactElement)
  | undefined {
  if (typeof render !== 'function') {
    return render;
  }

  return (props: HTMLAttributes<HTMLElement>) => render(props, state);
}
