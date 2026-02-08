import { Meter } from '@base-ui/react/meter';
import * as styles from '@kalink-ui/seedly/components/meter';

import { withClassName } from '../shared/with-class-name';

export const Indicator: typeof Meter.Indicator = withClassName(
  Meter.Indicator,
  styles.indicator,
);
