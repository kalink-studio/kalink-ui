'use client';

import { Item, ItemIndicator, ItemText } from '@radix-ui/react-select';
import { clsx } from 'clsx';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

import { menuItem, MenuItemTone } from '../menu';

import { selectItemIndicator } from './select-item.css';

export type SelectItemProps = ComponentPropsWithoutRef<typeof Item> & {
  indicator?: ReactNode;
  tone?: MenuItemTone;
};

export function SelectItem({
  children,
  indicator,
  tone,
  ...props
}: SelectItemProps) {
  return (
    <Item className={clsx(menuItem({ inset: true, tone }))} {...props}>
      <ItemIndicator asChild>
        {indicator || <div className={selectItemIndicator} />}
      </ItemIndicator>
      <ItemText>{children}</ItemText>
    </Item>
  );
}
