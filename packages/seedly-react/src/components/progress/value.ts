import { Progress } from '@base-ui/react/progress';
import * as styles from '@kalink-ui/seedly/components/progress';

import { withClassName } from '../shared/with-class-name';

export const Value: typeof Progress.Value = withClassName(
  Progress.Value,
  styles.value,
);
