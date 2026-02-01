import { Overlay } from '@radix-ui/react-alert-dialog';
import { clsx } from 'clsx';
import { ComponentPropsWithRef } from 'react';

import { overlayRecipe, type OverlayVariants } from '../overlay';

export type AlertDialogOverlayProps = ComponentPropsWithRef<typeof Overlay> &
  Pick<OverlayVariants, 'tone'>;

export function AlertDialogOverlay({
  className,
  children,
  tone,
  ...props
}: AlertDialogOverlayProps) {
  return (
    <Overlay className={clsx(overlayRecipe({ tone }), className)} {...props} />
  );
}
