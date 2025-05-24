import { Description } from '@radix-ui/react-dialog';
import { ComponentPropsWithRef, ElementType } from 'react';

import { Text, TextProps } from '../text';

type SheetDescriptionPros<TUse extends ElementType> = ComponentPropsWithRef<
  typeof Description
> &
  TextProps<TUse>;

export function SheetDescription<TUse extends ElementType>({
  ref,
  children,
  ...props
}: SheetDescriptionPros<TUse>) {
  return (
    <Description ref={ref} asChild {...props}>
      <Text>{children}</Text>
    </Description>
  );
}
