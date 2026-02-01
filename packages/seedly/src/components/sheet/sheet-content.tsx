'use client';

import { Content, Portal } from '@radix-ui/react-dialog';
import { clsx } from 'clsx';
import { ComponentPropsWithRef, ElementType } from 'react';

import { Box, BoxProps } from '../box';

import { SheetPortal } from './sheet';
import { sheetContentRecipe, SheetContentVariants } from './sheet-content.css';
import { SheetOverlay } from './sheet-overlay';

type SheetPortalProps = ComponentPropsWithRef<typeof Portal>;
type BoxStyleProps<TUse extends ElementType> = Pick<
  BoxProps<TUse>,
  'variant' | 'radius' | 'elevation' | 'use' | 'tone'
>;

export type SheetContentProps<TUse extends ElementType> = SheetContentVariants &
  BoxStyleProps<TUse> &
  Omit<ComponentPropsWithRef<typeof Content>, keyof BoxStyleProps<TUse>> &
  Omit<SheetPortalProps, keyof BoxStyleProps<TUse>>;

export function SheetContent<TUse extends ElementType>({
  className,
  children,
  container,
  forceMount,
  side,
  size,
  ref,
  spacing = 4,
  variant,
  elevation,
  radius,
  use,
  tone,
  ...props
}: SheetContentProps<TUse>) {
  return (
    <SheetPortal container={container} forceMount={forceMount}>
      <SheetOverlay tone={tone} />
      <Content asChild>
        <Box
          ref={ref}
          use={use}
          variant={variant ?? 'solid'}
          spacing={spacing}
          elevation={elevation}
          radius={radius}
          tone={tone}
          className={clsx(
            sheetContentRecipe({ side, size, spacing }),
            className,
          )}
          {...props}
        >
          {children}
        </Box>
      </Content>
    </SheetPortal>
  );
}
