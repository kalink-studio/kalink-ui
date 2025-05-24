'use client';

import {
  ScrollAreaScrollbar,
  ScrollAreaThumb,
} from '@radix-ui/react-scroll-area';
import { clsx } from 'clsx';
import { ComponentPropsWithRef } from 'react';

import {
  scrollAreaScrollbar,
  ScrollAreaScrollbarVariants,
  scrollAreaThumb,
} from './scroll-area.css';

export type ScrollAreaScrollbarProps = ComponentPropsWithRef<
  typeof ScrollAreaScrollbar
> &
  ScrollAreaScrollbarVariants;

export function ScrollBar({
  ref,
  className,
  orientation = 'vertical',
  ...props
}: ScrollAreaScrollbarProps) {
  return (
    <ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      className={clsx(scrollAreaScrollbar({ orientation }), className)}
      {...props}
    >
      <ScrollAreaThumb className={scrollAreaThumb} />
    </ScrollAreaScrollbar>
  );
}
