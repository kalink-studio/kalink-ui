import { Switch, type SwitchRootProps } from '@base-ui/react/switch';
import { switchRoot as switchRootClassName } from '@kalink-ui/seedly/components/switch';

import { mergeClassName } from '@/utils/merge-class-name';

export function Root({ className, ...props }: SwitchRootProps) {
  return (
    <Switch.Root
      {...props}
      className={mergeClassName(switchRootClassName, className)}
    />
  );
}
