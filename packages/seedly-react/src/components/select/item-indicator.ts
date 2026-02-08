import { Select } from '@base-ui/react/select';
import * as styles from '@kalink-ui/seedly/components/select';

import { withClassName } from '../shared/with-class-name';

export const ItemIndicator: typeof Select.ItemIndicator = withClassName(
  Select.ItemIndicator,
  styles.itemIndicator,
);
