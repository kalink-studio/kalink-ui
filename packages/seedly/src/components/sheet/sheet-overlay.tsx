'use client';

import { Overlay } from '@radix-ui/react-dialog';
import { clsx } from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

import { sheetOverlay } from './sheet-overlay.css';

export function SheetOverlay({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Overlay>) {
  return <Overlay className={clsx(sheetOverlay, className)} {...props} />;
}
