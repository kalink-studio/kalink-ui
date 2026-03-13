import { button as buttonClassName } from '@kalink-ui/seedly/components/toggle-group';

import { mergeClassName } from '../../utils/merge-class-name';
import { Toggle } from '../toggle';

import type { ToggleRootProps } from '../toggle';

export function ToggleGroupItem({ className, ...props }: ToggleRootProps) {
  return (
    <Toggle {...props} className={mergeClassName(buttonClassName, className)} />
  );
}
