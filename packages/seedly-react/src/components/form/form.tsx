import { Form as BaseForm, type FormProps } from '@base-ui/react/form';
import { form as formClassName } from '@kalink-ui/seedly/components/form';

import { mergeClassName } from '../../utils/merge-class-name';

export function Form({ className, ...props }: FormProps) {
  return (
    <BaseForm {...props} className={mergeClassName(formClassName, className)} />
  );
}
