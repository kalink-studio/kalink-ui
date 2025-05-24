import { clsx } from 'clsx';

import { divider } from './divider.css';

export interface DividerProps {
  className?: string;
}

export function Divider({ className }: DividerProps) {
  return <hr className={clsx(divider, className)} />;
}
