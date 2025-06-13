'use client';

import { Overlay } from '@radix-ui/react-dialog';
import { clsx } from 'clsx';
import { ComponentPropsWithRef } from 'react';

import { overlay } from '../overlay';

export function SheetOverlay({
  className,
  ...props
}: ComponentPropsWithRef<typeof Overlay>) {
  return <Overlay className={clsx(overlay, className)} {...props} />;
}
