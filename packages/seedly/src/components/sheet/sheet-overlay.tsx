'use client';

import { Overlay } from '@radix-ui/react-dialog';
import { clsx } from 'clsx';
import { ComponentPropsWithRef } from 'react';

import { overlayRecipe, type OverlayVariants } from '../overlay';

export type SheetOverlayProps = ComponentPropsWithRef<typeof Overlay> &
  Pick<OverlayVariants, 'tone'>;

export function SheetOverlay({ className, tone, ...props }: SheetOverlayProps) {
  return (
    <Overlay className={clsx(overlayRecipe({ tone }), className)} {...props} />
  );
}
