import { clsx } from 'clsx';

import { Cluster, ClusterProps } from '../cluster';

import {
  alertDialogFooter,
  AlertDialogFooterVariants,
} from './alert-dialog-footer.css';

export type AlertDialogFooterProps = ClusterProps<'div'> &
  AlertDialogFooterVariants;

export function AlertDialogFooter({
  className,
  justify = 'end',
  position,
  ...props
}: AlertDialogFooterProps) {
  return (
    <Cluster
      justify={justify}
      className={clsx(alertDialogFooter({ position }), className)}
      {...props}
    />
  );
}
