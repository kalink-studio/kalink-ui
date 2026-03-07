import { Avatar, type AvatarRootProps } from '@base-ui/react/avatar';
import { root as rootClassName } from '@kalink-ui/seedly/components/avatar';

import { mergeClassName } from '../../utils/merge-class-name';

export function Root({ className, ...props }: AvatarRootProps) {
  return (
    <Avatar.Root
      {...props}
      className={mergeClassName(rootClassName, className)}
    />
  );
}
