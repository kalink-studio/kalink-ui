import { ElementType, ReactNode } from 'react';

import { Stack, StackProps } from '../stack';

import { SheetClose } from './sheet';
import { SheetContentVariants } from './sheet-content.css';
import { sheetHeader, sheetHeaderCloseBtn } from './sheet-header.css';

type SheetHeaderProps<TUse extends ElementType> = StackProps<TUse> & {
  side: SheetContentVariants['side'];
  closeBtn: ReactNode;
};

export function SheetHeader<TUse extends ElementType>({
  ref,
  spacing = 2,
  children,
  side,
  closeBtn,
  ...props
}: SheetHeaderProps<TUse>) {
  return (
    <div ref={ref} className={sheetHeader({ side })}>
      <Stack spacing={spacing} {...props}>
        {children}
      </Stack>
      <SheetClose asChild className={sheetHeaderCloseBtn}>
        {closeBtn}
      </SheetClose>
    </div>
  );
}
