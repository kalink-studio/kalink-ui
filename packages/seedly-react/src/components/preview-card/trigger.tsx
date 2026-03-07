import {
  PreviewCard,
  type PreviewCardTriggerProps,
} from '@base-ui/react/preview-card';
import { link as linkClassName } from '@kalink-ui/seedly/components/preview-card';

import { mergeClassName } from '../../utils/merge-class-name';

export function Trigger({ className, ...props }: PreviewCardTriggerProps) {
  return (
    <PreviewCard.Trigger
      {...props}
      className={mergeClassName(linkClassName, className)}
    />
  );
}
