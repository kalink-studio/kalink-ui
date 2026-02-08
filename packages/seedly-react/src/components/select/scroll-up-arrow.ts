import { Select } from '@base-ui/react/select';
import * as styles from '@kalink-ui/seedly/components/select';

import { withClassName } from '../shared/with-class-name';

export const ScrollUpArrow: typeof Select.ScrollUpArrow = withClassName(
  Select.ScrollUpArrow,
  styles.scrollArrow,
);
