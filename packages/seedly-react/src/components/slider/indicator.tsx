import { Slider, type SliderIndicatorProps } from '@base-ui/react/slider';
import { indicator as indicatorClassName } from '@kalink-ui/seedly/components/slider';

import { mergeClassName } from '@/utils/merge-class-name';

export function Indicator({ className, ...props }: SliderIndicatorProps) {
  return (
    <Slider.Indicator
      {...props}
      className={mergeClassName(indicatorClassName, className)}
    />
  );
}
