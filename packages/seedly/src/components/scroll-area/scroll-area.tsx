'use client';

import { Corner, Root, Viewport } from '@radix-ui/react-scroll-area';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { clsx } from 'clsx';
import { ComponentPropsWithRef } from 'react';

import {
  scrollArea,
  scrollAreaViewport,
  viewportMaxHeight,
} from './scroll-area.css';
import { ScrollBar } from './scroll-bar';

export type ScrollAreaProps = ComponentPropsWithRef<typeof Root> & {
  maxHeight?: string;
  /** Scrollbar orientation. Use 'both' for both vertical and horizontal scrollbars. */
  orientation?: 'vertical' | 'horizontal' | 'both';
};

export function ScrollArea({
  ref,
  className,
  children,
  maxHeight = 'initial',
  orientation = 'vertical',
  ...props
}: ScrollAreaProps) {
  return (
    <Root ref={ref} className={clsx(scrollArea, className)} {...props}>
      <Viewport
        tabIndex={0}
        className={scrollAreaViewport}
        style={assignInlineVars({
          [viewportMaxHeight]: maxHeight,
        })}
      >
        {children}
      </Viewport>
      {(orientation === 'vertical' || orientation === 'both') && (
        <ScrollBar orientation="vertical" />
      )}
      {(orientation === 'horizontal' || orientation === 'both') && (
        <ScrollBar orientation="horizontal" />
      )}
      <Corner />
    </Root>
  );
}
