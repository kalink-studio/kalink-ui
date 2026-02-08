import { Button as BaseButton, type ButtonProps } from '@base-ui/react/button';
import { button as buttonClassName } from '@kalink-ui/seedly/components/button';

import { mergeClassName } from '@/utils/merge-class-name';

export function Button({ className, ...props }: ButtonProps) {
  return (
    <BaseButton
      {...props}
      className={mergeClassName(buttonClassName, className)}
    />
  );
}
