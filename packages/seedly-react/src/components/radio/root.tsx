import { Radio, type RadioRootProps } from '@base-ui/react/radio';
import { radio as radioClassName } from '@kalink-ui/seedly/components/radio';

import { mergeClassName } from '../../utils/merge-class-name';

export function Root({ className, ...props }: RadioRootProps) {
  return (
    <Radio.Root
      {...props}
      className={mergeClassName(radioClassName, className)}
    />
  );
}
