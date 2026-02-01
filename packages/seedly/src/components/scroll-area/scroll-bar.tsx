'use client';

import {
  ScrollAreaScrollbar,
  ScrollAreaThumb,
} from '@radix-ui/react-scroll-area';
import { clsx } from 'clsx';
import { ComponentPropsWithRef } from 'react';

import {
  scrollAreaScrollbarRecipe,
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
  tone,
  ...props
}: ScrollAreaScrollbarProps) {
  return (
    <ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      className={clsx(
        scrollAreaScrollbarRecipe({ orientation, tone }),
        className,
      )}
      {...props}
    >
      <ScrollAreaThumb className={scrollAreaThumb} />
    </ScrollAreaScrollbar>
  );
}
