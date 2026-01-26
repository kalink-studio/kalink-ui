import { AlertDialogPortal, Content } from '@radix-ui/react-alert-dialog';
import { RecipeVariants } from '@vanilla-extract/recipes';
import { clsx } from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

import { Box, BoxProps } from '../box';
import { ScrollArea, ScrollAreaProps } from '../scroll-area';

import { alertDialogContentRecipe } from './alert-dialog-content.css';
import { AlertDialogOverlay } from './alert-dialog-overlay';

export type AlertDialogContentVariants = NonNullable<
  RecipeVariants<typeof alertDialogContentRecipe>
>;

type BoxStyleProps = Pick<
  BoxProps<'div'>,
  'spacing' | 'radius' | 'elevation' | 'use'
>;

export type AlertDialogContentProps = AlertDialogContentVariants &
  Pick<ScrollAreaProps, 'maxHeight'> &
  ComponentPropsWithoutRef<typeof AlertDialogPortal> &
  BoxStyleProps &
  Omit<ComponentPropsWithoutRef<typeof Content>, keyof BoxStyleProps>;

export function AlertDialogContent({
  className,
  children,
  container,
  forceMount,
  variant,
  maxHeight = '50vh',
  elevation = 'high',
  radius,
  spacing = 2,
  use,
  ...props
}: AlertDialogContentProps) {
  return (
    <AlertDialogPortal container={container} forceMount={forceMount}>
      <AlertDialogOverlay />
      <Content
        className={clsx(alertDialogContentRecipe({ variant }), className)}
        asChild
        {...props}
      >
        <Box
          use={use}
          variant="solid"
          spacing={spacing}
          elevation={elevation}
          radius={radius}
        >
          <ScrollArea maxHeight={maxHeight}>{children}</ScrollArea>
        </Box>
      </Content>
    </AlertDialogPortal>
  );
}
