import { RadioGroup, type RadioGroupProps } from '@base-ui/react/radio-group';
import { radioGroup as radioGroupClassName } from '@kalink-ui/seedly/components/radio';

import { mergeClassName } from '@/utils/merge-class-name';

export function Group({ className, ...props }: RadioGroupProps) {
  return (
    <RadioGroup
      {...props}
      className={mergeClassName(radioGroupClassName, className)}
    />
  );
}
