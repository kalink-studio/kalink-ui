import { Switch, type SwitchThumbProps } from '@base-ui/react/switch';
import { thumb as thumbClassName } from '@kalink-ui/seedly/components/switch';

import { mergeClassName } from '../../utils/merge-class-name';

export function Thumb({ className, ...props }: SwitchThumbProps) {
  return (
    <Switch.Thumb
      {...props}
      className={mergeClassName(thumbClassName, className)}
    />
  );
}
