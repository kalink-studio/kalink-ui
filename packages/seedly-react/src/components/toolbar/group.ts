import { Toolbar } from '@base-ui/react/toolbar';
import * as styles from '@kalink-ui/seedly/components/toolbar';

import { withClassName } from '../shared/with-class-name';

export const Group: typeof Toolbar.Group = withClassName(
  Toolbar.Group,
  styles.group,
);
