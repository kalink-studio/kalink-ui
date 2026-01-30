import { Cancel } from '@radix-ui/react-alert-dialog';
import { ComponentPropsWithRef } from 'react';

import { Button, ButtonProps } from '../button';

export type AlertDialogCancelProps = ComponentPropsWithRef<typeof Cancel> &
  ButtonProps<'button'>;

export function AlertDialogCancel({
  children,
  ...props
}: AlertDialogCancelProps) {
  return (
    <Cancel asChild {...props}>
      <Button>{children}</Button>
    </Cancel>
  );
}
