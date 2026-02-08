import * as React from 'react';

export function withClassName<TElement extends React.ElementType>(
  Component: TElement,
  baseClassName: string,
): TElement {
  type ComponentProps = React.ComponentProps<TElement>;
  type ComponentClassNameProps = ComponentProps & {
    className?: string;
  };

  const ComponentWithClassName = function ComponentWithClassName(
    props: ComponentProps,
  ) {
    const classNameProps = props as ComponentClassNameProps;
    const className =
      classNameProps.className === undefined || classNameProps.className === ''
        ? baseClassName
        : `${baseClassName} ${classNameProps.className}`;

    return React.createElement(Component, {
      ...classNameProps,
      className,
    });
  };

  return ComponentWithClassName as TElement;
}
