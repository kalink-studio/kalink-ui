import { Radio } from '@base-ui/react/radio';
import * as styles from '@kalink-ui/seedly/components/radio';

import { withClassName } from '../shared/with-class-name';

export const Indicator: typeof Radio.Indicator = withClassName(
  Radio.Indicator,
  styles.indicator,
);
