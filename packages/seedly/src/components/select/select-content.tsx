'use client';

import { Portal, Content, Viewport } from '@radix-ui/react-select';
import { clsx } from 'clsx';
import { ComponentPropsWithRef, ReactNode } from 'react';

import { popoverContentRecipe } from '../popover';
import { ScrollArea } from '../scroll-area';

import { SelectProps } from './select';
import {
  selectContentRecipe,
  selectContentViewport,
  type SelectContentVariants,
} from './select-content.css';

export type SelectContentProps = ComponentPropsWithRef<typeof Content> &
  SelectContentVariants & {
    container?: SelectProps['container'];
  };

export interface SelectContentPortalProps {
  children: ReactNode;
  container?: SelectProps['container'];
}

const SelectContentPortal = ({
  children,
  container,
}: SelectContentPortalProps) => {
  if (container === false) {
    return children;
  }

  return <Portal container={container}>{children}</Portal>;
};

export function SelectContent({
  className,
  children,
  position = 'popper',
  container,
  tone,
  ...props
}: SelectContentProps) {
  return (
    <SelectContentPortal container={container}>
      <Content position={position} asChild {...props}>
        <div
          className={clsx(
            selectContentRecipe({ tone }),
            popoverContentRecipe(),
          )}
        >
          <Viewport className={selectContentViewport}>
            <ScrollArea maxHeight="16rem" tone={tone}>
              {children}
            </ScrollArea>
          </Viewport>
        </div>
      </Content>
    </SelectContentPortal>
  );
}
