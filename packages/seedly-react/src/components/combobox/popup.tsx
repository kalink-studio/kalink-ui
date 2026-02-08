import { Combobox, type ComboboxPopupProps } from '@base-ui/react/combobox';
import { popup as popupClassName } from '@kalink-ui/seedly/components/combobox';

import { mergeClassName } from '@/utils/merge-class-name';

export function Popup({ className, ...props }: ComboboxPopupProps) {
  return (
    <Combobox.Popup
      {...props}
      className={mergeClassName(popupClassName, className)}
    />
  );
}
