import { clsx } from 'clsx';

import { Cluster, ClusterProps } from '../cluster';

import {
  alertDialogFooterRecipe,
  AlertDialogFooterVariants,
} from './alert-dialog-footer.css';

export type AlertDialogFooterProps = ClusterProps<'div'> &
  AlertDialogFooterVariants;

export function AlertDialogFooter({
  className,
  justify = 'end',
  position,
  tone,
  ...props
}: AlertDialogFooterProps) {
  return (
    <Cluster
      justify={justify}
      className={clsx(alertDialogFooterRecipe({ position, tone }), className)}
      {...props}
    />
  );
}
