import { PolymorphicComponentProps } from '@kalink-ui/dibbly';
import { clsx } from 'clsx';
import { ElementType } from 'react';

import { StackVariants } from './stack.css';
import { stackResponsive } from './stack.responsive';

import type { Responsive } from '../../styles/responsive';

export type StackProps<TUse extends ElementType> =
  PolymorphicComponentProps<TUse> &
    Omit<StackVariants, 'spacing' | 'align'> & {
      spacing?: Responsive<NonNullable<StackVariants['spacing']>>;
      align?: Responsive<NonNullable<StackVariants['align']>>;
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
export function Stack<TUse extends ElementType = 'div'>({
  spacing,
  className,
  align,
  ...props
}: StackProps<TUse>) {
  const { use: Comp = 'div', ...rest } = props;

  return (
    <Comp
      className={clsx(stackResponsive({ spacing, align }), className)}
      {...rest}
    />
  );
}
