import { Slider, type SliderControlProps } from '@base-ui/react/slider';
import { control as controlClassName } from '@kalink-ui/seedly/components/slider';

import { mergeClassName } from '@/utils/merge-class-name';

export function Control({ className, ...props }: SliderControlProps) {
  return (
    <Slider.Control
      {...props}
      className={mergeClassName(controlClassName, className)}
    />
  );
}
