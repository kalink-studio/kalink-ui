import { PolymorphicComponentProps } from '@kalink-ui/dibbly/types';
import { clsx } from 'clsx';
import { ElementType } from 'react';

import { stackRecipe, StackVariants } from './stack.css';

type StackProps<TUse extends ElementType> = PolymorphicComponentProps<TUse> & {
  /**
   * Whether the stack spacing should be applied recursively
   */
  recursive?: StackVariants['recursive'];

  /**
   * The spacing between items
   */
  spacing?: StackVariants['spacing'];
};

/**
 * A custom element for injecting white space (margin) between flow
 * (block) elements along a vertical axis.
 *
 * `splitAfter` is not available in this implementation since it only
 * works in a web component context where the css selector is
 * dynamically generated.
 *
 * https://every-layout.dev/layouts/stack
 */
export const Stack = <TUse extends ElementType = 'div'>({
  recursive,
  spacing,
  className,
  ...props
}: StackProps<TUse>) => {
  const { use: Comp = 'div', ...rest } = props;

  return (
    <Comp
      className={clsx(stackRecipe({ recursive, spacing }), className)}
      {...rest}
    />
  );
};
