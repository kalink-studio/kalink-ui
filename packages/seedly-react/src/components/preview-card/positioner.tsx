import {
  PreviewCard,
  type PreviewCardPositionerProps,
} from '@base-ui/react/preview-card';
import { positioner as positionerClassName } from '@kalink-ui/seedly/components/preview-card';

import { mergeClassName } from '@/utils/merge-class-name';

export function Positioner({
  className,
  ...props
}: PreviewCardPositionerProps) {
  return (
    <PreviewCard.Positioner
      {...props}
      className={mergeClassName(positionerClassName, className)}
    />
  );
}
