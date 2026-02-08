import { Toggle as BaseToggle, type ToggleProps } from '@base-ui/react/toggle';
import { button as buttonClassName } from '@kalink-ui/seedly/components/toggle';

import { mergeClassName } from '@/utils/merge-class-name';

export function Toggle({ className, ...props }: ToggleProps) {
  return (
    <BaseToggle
      {...props}
      className={mergeClassName(buttonClassName, className)}
    />
  );
}
