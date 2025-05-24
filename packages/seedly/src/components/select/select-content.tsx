'use client';

import { Portal, Content, Viewport } from '@radix-ui/react-select';
import { clsx } from 'clsx';
import { ComponentPropsWithRef, ReactNode } from 'react';

import { popoverContent } from '../popover';
import { ScrollArea } from '../scroll-area';

import { SelectProps } from './select';
import { selectContent, selectContentViewport } from './select-content.css';

export type SelectContentProps = ComponentPropsWithRef<typeof Content> & {
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
  ...props
}: SelectContentProps) {
  return (
    <SelectContentPortal container={container}>
      <Content position={position} asChild {...props}>
        <div className={clsx(selectContent, popoverContent())}>
          <Viewport className={selectContentViewport}>
            <ScrollArea maxHeight="16rem">{children}</ScrollArea>
          </Viewport>
        </div>
      </Content>
    </SelectContentPortal>
  );
}
