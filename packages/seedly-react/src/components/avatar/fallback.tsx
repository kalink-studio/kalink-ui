import { Avatar, type AvatarFallbackProps } from '@base-ui/react/avatar';
import { fallback as fallbackClassName } from '@kalink-ui/seedly/components/avatar';

import { mergeClassName } from '../../utils/merge-class-name';

export function Fallback({ className, ...props }: AvatarFallbackProps) {
  return (
    <Avatar.Fallback
      {...props}
      className={mergeClassName(fallbackClassName, className)}
    />
  );
}
