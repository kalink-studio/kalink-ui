import { Select, type SelectPopupProps } from '@base-ui/react/select';
import { popup as popupClassName } from '@kalink-ui/seedly/components/select';

import { mergeClassName } from '../../utils/merge-class-name';

export function Popup({ className, ...props }: SelectPopupProps) {
  return (
    <Select.Popup
      {...props}
      className={mergeClassName(popupClassName, className)}
    />
  );
}
