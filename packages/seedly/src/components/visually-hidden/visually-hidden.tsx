import { clsx } from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

import { visuallyHiddenStyle } from './visually-hidden.css';

export type VisuallyHiddenProps = ComponentPropsWithoutRef<'span'>;

export function VisuallyHidden({ className, ...props }: VisuallyHiddenProps) {
  return <span {...props} className={clsx(visuallyHiddenStyle, className)} />;
}
