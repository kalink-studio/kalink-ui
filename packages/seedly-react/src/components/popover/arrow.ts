import { Popover } from '@base-ui/react/popover';
import * as styles from '@kalink-ui/seedly/components/popover';

import { withClassName } from '../shared/with-class-name';

export const Arrow: typeof Popover.Arrow = withClassName(
  Popover.Arrow,
  styles.arrow,
);
