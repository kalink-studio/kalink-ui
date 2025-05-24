'use client';

import { Corner, Root, Viewport } from '@radix-ui/react-scroll-area';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { ComponentPropsWithRef } from 'react';

import {
  scrollArea,
  scrollAreaViewport,
  viewportMaxHeight,
} from './scroll-area.css';
import { ScrollBar } from './scroll-bar';

export type ScrollAreaProps = ComponentPropsWithRef<typeof Root> & {
  maxHeight?: string;
};

export function ScrollArea({
  ref,
  className,
  children,
  maxHeight = 'initial',
  ...props
}: ScrollAreaProps) {
  return (
    <Root ref={ref} className={scrollArea} {...props}>
      <Viewport
        className={scrollAreaViewport}
        style={assignInlineVars({
          [viewportMaxHeight]: maxHeight,
        })}
      >
        {children}
      </Viewport>
      <ScrollBar />
      <Corner />
    </Root>
  );
}
