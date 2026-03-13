import { Input as BaseInput, type InputProps } from '@base-ui/react/input';
import { input as inputClassName } from '@kalink-ui/seedly/components/input';

import { mergeClassName } from '../../utils/merge-class-name';

export function Input({ className, ...props }: InputProps) {
  return (
    <BaseInput
      {...props}
      className={mergeClassName(inputClassName, className)}
    />
  );
}
