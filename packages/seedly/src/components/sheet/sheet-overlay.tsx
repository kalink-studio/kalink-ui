'use client';

import { Overlay } from '@radix-ui/react-dialog';
import { clsx } from 'clsx';
import { ComponentPropsWithRef } from 'react';

import { overlay } from '../overlay';

export type SheetOverlayProps = ComponentPropsWithRef<typeof Overlay>;

export function SheetOverlay({ className, ...props }: SheetOverlayProps) {
  return <Overlay className={clsx(overlay, className)} {...props} />;
}
