import { Combobox, type ComboboxTriggerProps } from '@base-ui/react/combobox';
import { trigger as triggerClassName } from '@kalink-ui/seedly/components/combobox';

import { mergeClassName } from '@/utils/merge-class-name';

export function Trigger({ className, ...props }: ComboboxTriggerProps) {
  return (
    <Combobox.Trigger
      {...props}
      className={mergeClassName(triggerClassName, className)}
    />
  );
}
