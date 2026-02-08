import { Popover } from '@base-ui/react/popover';
import * as styles from '@kalink-ui/seedly/components/popover';

import { withClassName } from '../shared/with-class-name';

export const Description: typeof Popover.Description = withClassName(
  Popover.Description,
  styles.description,
);
