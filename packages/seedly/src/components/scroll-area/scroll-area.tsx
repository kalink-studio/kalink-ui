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

import type { Tone } from '../../styles';

export type ScrollAreaProps = ComponentPropsWithRef<typeof Root> & {
  maxHeight?: string;
  /** Scrollbar orientation. Use 'both' for both vertical and horizontal scrollbars. */
  orientation?: 'vertical' | 'horizontal' | 'both';
  tone?: Tone;
};

export function ScrollArea({
  ref,
  className,
  children,
  maxHeight = 'initial',
  orientation = 'vertical',
  tone,
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
        <ScrollBar orientation="vertical" tone={tone} />
      )}
      {(orientation === 'horizontal' || orientation === 'both') && (
        <ScrollBar orientation="horizontal" tone={tone} />
      )}
      <Corner />
    </Root>
  );
}
