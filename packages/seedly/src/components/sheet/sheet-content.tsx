'use client';

import { Content, Portal } from '@radix-ui/react-dialog';
import { clsx } from 'clsx';
import { ComponentPropsWithoutRef, ElementType } from 'react';

import { Box, BoxProps } from '../box';
import { ScrollArea } from '../scroll-area';

import { SheetPortal } from './sheet';
import { sheetContent, SheetContentVariants } from './sheet-content.css';
import { SheetOverlay } from './sheet-overlay';

export type SheetContentProps<TUse extends ElementType> = BoxProps<TUse> &
  ComponentPropsWithoutRef<typeof Portal> &
  SheetContentVariants;

export function SheetContent<TUse extends ElementType>({
  className,
  children,
  container,
  side,
  size,
  ref,
  ...props
}: SheetContentProps<TUse>) {
  return (
    <SheetPortal container={container}>
      <SheetOverlay />
      <Content asChild>
        <Box
          ref={ref}
          variant="solid"
          className={clsx(sheetContent({ side, size }), className)}
        >
          <ScrollArea>
            <Box {...props}>{children}</Box>
          </ScrollArea>
        </Box>
      </Content>
    </SheetPortal>
  );
}
