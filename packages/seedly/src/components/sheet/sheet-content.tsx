'use client';

import { Content, Portal } from '@radix-ui/react-dialog';
import { clsx } from 'clsx';
import { ComponentPropsWithRef, ElementType } from 'react';

import { Box, BoxProps } from '../box';

import { SheetPortal } from './sheet';
import { sheetContent, SheetContentVariants } from './sheet-content.css';
import { SheetOverlay } from './sheet-overlay';

export type SheetContentProps<TUse extends ElementType> = BoxProps<TUse> &
  ComponentPropsWithRef<typeof Portal> &
  SheetContentVariants;

export function SheetContent<TUse extends ElementType>({
  className,
  children,
  container,
  side,
  size,
  ref,
  spacing = 4,
  ...props
}: SheetContentProps<TUse>) {
  return (
    <SheetPortal container={container}>
      <SheetOverlay />
      <Content asChild>
        <Box
          ref={ref}
          variant="solid"
          spacing={spacing}
          className={clsx(sheetContent({ side, size, spacing }), className)}
          {...props}
        >
          {children}
        </Box>
      </Content>
    </SheetPortal>
  );
}
