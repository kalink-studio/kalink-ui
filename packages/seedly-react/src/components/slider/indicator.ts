import { Slider } from '@base-ui/react/slider';
import * as styles from '@kalink-ui/seedly/components/slider';

import { withClassName } from '../shared/with-class-name';

export const Indicator: typeof Slider.Indicator = withClassName(
  Slider.Indicator,
  styles.indicator,
);
