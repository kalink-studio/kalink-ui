import { Progress } from '@base-ui/react/progress';
import * as styles from '@kalink-ui/seedly/components/progress';

import { withClassName } from '../shared/with-class-name';

export const Indicator: typeof Progress.Indicator = withClassName(
  Progress.Indicator,
  styles.indicator,
);
