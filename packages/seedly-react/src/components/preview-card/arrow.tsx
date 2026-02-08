import {
  PreviewCard,
  type PreviewCardArrowProps,
} from '@base-ui/react/preview-card';
import { arrow as arrowClassName } from '@kalink-ui/seedly/components/preview-card';

import { mergeClassName } from '@/utils/merge-class-name';

export function Arrow({ className, ...props }: PreviewCardArrowProps) {
  return (
    <PreviewCard.Arrow
      {...props}
      className={mergeClassName(arrowClassName, className)}
    />
  );
}
