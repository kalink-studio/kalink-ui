import { clsx } from 'clsx';
import { ElementType } from 'react';

import { Cluster, ClusterProps } from '../cluster';

import { sheetFooter } from './sheet-footer.css';

export type SheetFooterProps<TUse extends ElementType> = ClusterProps<TUse>;

export function SheetFooter<TUse extends ElementType>({
  spacing = 4,
  className,
  ...props
}: SheetFooterProps<TUse>) {
  return (
    <Cluster
      spacing={spacing}
      className={clsx(sheetFooter, className)}
      {...props}
    />
  );
}
