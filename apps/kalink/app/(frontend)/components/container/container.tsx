import { clsx } from 'clsx';
import { HTMLAttributes, ReactNode } from 'react';

import { container } from './container.css';

export type ContainerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  className?: string;
  size?: ContainerSize;
}

export function Container({
  children,
  className,
  size = 'xl',
  ...rest
}: ContainerProps) {
  return (
    <div className={clsx(container({ size }), className)} {...rest}>
      {children}
    </div>
  );
}
