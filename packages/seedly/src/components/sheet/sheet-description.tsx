import { Description } from '@radix-ui/react-dialog';
import { ComponentPropsWithRef, ElementType } from 'react';

import { Text, TextProps } from '../text';

export type SheetDescriptionProps<TUse extends ElementType> =
  ComponentPropsWithRef<typeof Description> & TextProps<TUse>;

export function SheetDescription<TUse extends ElementType>({
  ref,
  children,
  ...props
}: SheetDescriptionProps<TUse>) {
  return (
    <Description ref={ref} asChild>
      <Text {...props}>{children}</Text>
    </Description>
  );
}
