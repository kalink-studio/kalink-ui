'use client';

import { Content, Portal } from '@radix-ui/react-dialog';
import { clsx } from 'clsx';
import { ComponentPropsWithRef, ElementType } from 'react';

import { Container, ContainerProps } from '../container';

import { SheetPortal } from './sheet';
import { sheetContentRecipe, SheetContentVariants } from './sheet-content.css';
import { SheetOverlay } from './sheet-overlay';

import type { Tone } from '../../styles';

type SheetPortalProps = ComponentPropsWithRef<typeof Portal>;
type ContainerStyleProps<TUse extends ElementType> = Pick<
  ContainerProps<TUse>,
  'variant' | 'radius' | 'elevation' | 'use'
>;

export type SheetContentProps<TUse extends ElementType> = SheetContentVariants &
  ContainerStyleProps<TUse> & {
    tone?: Tone;
  } & Omit<
    ComponentPropsWithRef<typeof Content>,
    keyof ContainerStyleProps<TUse>
  > &
  Omit<SheetPortalProps, keyof ContainerStyleProps<TUse>>;

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
        <Container
          ref={ref}
          use={use}
          variant={variant ?? 'solid'}
          spacing={spacing}
          elevation={elevation}
          radius={radius}
          className={clsx(
            sheetContentRecipe({ side, size, spacing }),
            className,
          )}
          {...props}
        >
          {children}
        </Container>
      </Content>
    </SheetPortal>
  );
}
