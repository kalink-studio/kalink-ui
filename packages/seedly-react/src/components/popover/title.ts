import { Popover } from '@base-ui/react/popover';
import * as styles from '@kalink-ui/seedly/components/popover';

import { withClassName } from '../shared/with-class-name';

export const Title: typeof Popover.Title = withClassName(
  Popover.Title,
  styles.title,
);
