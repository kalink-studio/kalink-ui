import {
  RadioGroup as BaseRadioGroup,
  type RadioGroupProps,
} from '@base-ui/react/radio-group';
import { radioGroup as radioGroupClassName } from '@kalink-ui/seedly/components/radio-group';

import { mergeClassName } from '@/utils/merge-class-name';

export function Root({ className, ...props }: RadioGroupProps) {
  return (
    <BaseRadioGroup
      {...props}
      className={mergeClassName(radioGroupClassName, className)}
    />
  );
}
