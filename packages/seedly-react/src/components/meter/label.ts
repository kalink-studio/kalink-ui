import { Meter } from '@base-ui/react/meter';
import * as styles from '@kalink-ui/seedly/components/meter';

import { withClassName } from '../shared/with-class-name';

export const Label: typeof Meter.Label = withClassName(
  Meter.Label,
  styles.label,
);
