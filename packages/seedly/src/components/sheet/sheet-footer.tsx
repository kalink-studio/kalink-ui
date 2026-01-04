import { clsx } from 'clsx';
import { ElementType } from 'react';

import { Cluster, ClusterProps } from '../cluster';

import { sheetFooter } from './sheet-footer.css';

export function SheetFooter<TUse extends ElementType>({
  spacing = 4,
  className,
  ...props
}: ClusterProps<TUse>) {
  return (
    <Cluster
      spacing={spacing}
      className={clsx(sheetFooter, className)}
      {...props}
    />
  );
}
