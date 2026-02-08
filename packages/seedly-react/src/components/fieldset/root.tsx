import { Fieldset, type FieldsetRootProps } from '@base-ui/react/fieldset';
import { fieldset as fieldsetClassName } from '@kalink-ui/seedly/components/fieldset';

import { mergeClassName } from '@/utils/merge-class-name';

export function Root({ className, ...props }: FieldsetRootProps) {
  return (
    <Fieldset.Root
      {...props}
      className={mergeClassName(fieldsetClassName, className)}
    />
  );
}
