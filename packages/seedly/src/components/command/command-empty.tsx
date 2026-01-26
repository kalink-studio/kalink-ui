'use client';

import { clsx } from 'clsx';
import { Command as CommandPrimitive } from 'cmdk';
import { ComponentPropsWithoutRef } from 'react';

import {
  buildTypographyOverrides,
  getResponsiveBase,
  mapResponsiveSizeToTypography,
  type Responsive,
  type Tone,
} from '../../styles';
import { menuItemRecipe, type MenuItemVariants } from '../menu/menu-item.css';

export type CommandEmptyProps = ComponentPropsWithoutRef<
  typeof CommandPrimitive.Empty
> & {
  tone?: Tone;
  size?: Responsive<NonNullable<MenuItemVariants['size']>>;
};

export function CommandEmpty({
  tone,
  size,
  className,
  ...props
}: CommandEmptyProps) {
  const baseSize = getResponsiveBase(size) ?? 'md';
  const typographySize = mapResponsiveSizeToTypography(size);
  const typographyOverrides = buildTypographyOverrides({
    variant: 'body',
    size: typographySize,
  });

  return (
    <CommandPrimitive.Empty
      className={clsx(
        menuItemRecipe({ tone, size: baseSize }),
        typographyOverrides,
        className,
      )}
      {...props}
    />
  );
}
