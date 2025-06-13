import { Overlay } from '@radix-ui/react-alert-dialog';
import { clsx } from 'clsx';
import { ComponentPropsWithRef } from 'react';

import { overlay } from '../overlay';

export type AlertDialogOverlayProps = ComponentPropsWithRef<typeof Overlay>;

export function AlertDialogOverlay({
  className,
  children,
  ...props
}: AlertDialogOverlayProps) {
  return <Overlay className={clsx(overlay, className)} {...props} />;
}
