import {
  PreviewCard,
  type PreviewCardPopupProps,
} from '@base-ui/react/preview-card';
import { popup as popupClassName } from '@kalink-ui/seedly/components/preview-card';

import { mergeClassName } from '@/utils/merge-class-name';

export function Popup({ className, ...props }: PreviewCardPopupProps) {
  return (
    <PreviewCard.Popup
      {...props}
      className={mergeClassName(popupClassName, className)}
    />
  );
}
