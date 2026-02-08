import { Select } from '@base-ui/react/select';
import * as styles from '@kalink-ui/seedly/components/select';

import { withClassName } from '../shared/with-class-name';

export const Trigger: typeof Select.Trigger = withClassName(
  Select.Trigger,
  styles.select,
);
