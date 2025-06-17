import { AlertDialogPortal, Content } from '@radix-ui/react-alert-dialog';
import { RecipeVariants } from '@vanilla-extract/recipes';
import { clsx } from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

import { Box, BoxProps } from '../box';
import { ScrollArea, ScrollAreaProps } from '../scroll-area';

import { alertDialogContent } from './alert-dialog-content.css';
import { AlertDialogOverlay } from './alert-dialog-overlay';

export type AlertDialogContentVariants = NonNullable<
  RecipeVariants<typeof alertDialogContent>
>;

export type AlertDialogContentProps = ComponentPropsWithoutRef<typeof Content> &
  AlertDialogContentVariants &
  Pick<ScrollAreaProps, 'maxHeight'> &
  ComponentPropsWithoutRef<typeof AlertDialogPortal> &
  BoxProps<'div'>;

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
  ...props
}: AlertDialogContentProps) {
  return (
    <AlertDialogPortal container={container} forceMount={forceMount}>
      <AlertDialogOverlay />
      <Content
        className={clsx(alertDialogContent({ variant }), className)}
        asChild
        {...props}
      >
        <Box
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
