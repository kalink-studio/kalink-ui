import { Avatar, type AvatarImageProps } from '@base-ui/react/avatar';
import { image as imageClassName } from '@kalink-ui/seedly/components/avatar';

import { mergeClassName } from '../../utils/merge-class-name';

export function Image({ className, ...props }: AvatarImageProps) {
  return (
    <Avatar.Image
      {...props}
      className={mergeClassName(imageClassName, className)}
    />
  );
}
