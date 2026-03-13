import { Slider, type SliderTrackProps } from '@base-ui/react/slider';
import { track as trackClassName } from '@kalink-ui/seedly/components/slider';

import { mergeClassName } from '../../utils/merge-class-name';

export function Track({ className, ...props }: SliderTrackProps) {
  return (
    <Slider.Track
      {...props}
      className={mergeClassName(trackClassName, className)}
    />
  );
}
