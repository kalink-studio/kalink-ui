import { useRender } from '@base-ui/react/use-render';
import { inputWrapper as inputWrapperClassName } from '@kalink-ui/seedly/components/combobox';

import { mergeClassName } from '@/utils/merge-class-name';

export type InputWrapperProps = useRender.ComponentProps<'div'>;

export function InputWrapper({
  className,
  render,
  ...props
}: InputWrapperProps) {
  return useRender({
    render,
    defaultTagName: 'div',
    props: {
      ...props,
      className: mergeClassName(inputWrapperClassName, className),
    },
  });
}
