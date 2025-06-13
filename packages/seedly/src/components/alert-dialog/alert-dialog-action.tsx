import { Action } from '@radix-ui/react-alert-dialog';
import { ComponentPropsWithRef } from 'react';

import { Button, ButtonProps } from '../button';

export type AlertDialogActionProps = ComponentPropsWithRef<typeof Action> &
  ButtonProps<'button'> & {
    loading?: boolean;
  };

export function AlertDialogAction({
  className,
  children,
  loading,
  ...props
}: AlertDialogActionProps) {
  return (
    <Action asChild {...props}>
      <Button>{children}</Button>
    </Action>
  );
}
