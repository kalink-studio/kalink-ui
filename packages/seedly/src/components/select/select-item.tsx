'use client';

import { Item, ItemIndicator, ItemText } from '@radix-ui/react-select';
import { clsx } from 'clsx';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

import { menuItemRecipe } from '../menu';

import { selectItemIndicator } from './select-item.css';

import type { Tone } from '../../styles';

export type SelectItemProps = ComponentPropsWithoutRef<typeof Item> & {
  indicator?: ReactNode;
  tone?: Tone;
};

export function SelectItem({
  children,
  indicator,
  tone,
  ...props
}: SelectItemProps) {
  return (
    <Item className={clsx(menuItemRecipe({ inset: true, tone }))} {...props}>
      <ItemIndicator asChild>
        {indicator || <div className={selectItemIndicator} />}
      </ItemIndicator>
      <ItemText>{children}</ItemText>
    </Item>
  );
}
