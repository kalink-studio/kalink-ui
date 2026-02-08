import { Slider } from '@base-ui/react/slider';
import * as styles from '@kalink-ui/seedly/components/slider';

import { withClassName } from '../shared/with-class-name';

export const Control: typeof Slider.Control = withClassName(
  Slider.Control,
  styles.control,
);
