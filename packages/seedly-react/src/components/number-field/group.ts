import { NumberField } from '@base-ui/react/number-field';
import * as styles from '@kalink-ui/seedly/components/number-field';

import { withClassName } from '../shared/with-class-name';

export const Group: typeof NumberField.Group = withClassName(
  NumberField.Group,
  styles.group,
);
