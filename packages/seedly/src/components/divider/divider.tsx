import { clsx } from 'clsx';

import { dividerRecipe, DividerVariants } from './divider.css';

export interface DividerProps extends DividerVariants {
  className?: string;
}

export function Divider({ className, tone }: DividerProps) {
  return <hr className={clsx(dividerRecipe({ tone }), className)} />;
}
