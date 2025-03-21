import { PolymorphicComponentProps } from '@kalink-ui/dibbly';
import { ElementType, ReactNode } from 'react';

type ConditionalWrapperProps<TUse extends ElementType> =
  PolymorphicComponentProps<TUse> & {
    /**
     * If `true`, the provided `children` prop will be wrapped.
     */
    condition: boolean;

    /**
     * The component to wrap if `condition` is `true`.
     */
    children: ReactNode;
  };

export function ConditionalWrapper<TUse extends ElementType>(
  props: ConditionalWrapperProps<TUse>,
) {
  const { use: Comp = 'div', condition, children, ...rest } = props;

  return condition ? <Comp {...rest}>{children}</Comp> : children;
}
