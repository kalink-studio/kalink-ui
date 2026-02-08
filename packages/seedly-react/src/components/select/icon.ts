import { Select } from '@base-ui/react/select';
import * as styles from '@kalink-ui/seedly/components/select';

import { withClassName } from '../shared/with-class-name';

export const Icon: typeof Select.Icon = withClassName(
  Select.Icon,
  styles.selectIcon,
);
