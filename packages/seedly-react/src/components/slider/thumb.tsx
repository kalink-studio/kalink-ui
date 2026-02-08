import { Slider, type SliderThumbProps } from '@base-ui/react/slider';
import { thumb as thumbClassName } from '@kalink-ui/seedly/components/slider';

import { mergeClassName } from '@/utils/merge-class-name';

export function Thumb({ className, ...props }: SliderThumbProps) {
  return (
    <Slider.Thumb
      {...props}
      className={mergeClassName(thumbClassName, className)}
    />
  );
}
