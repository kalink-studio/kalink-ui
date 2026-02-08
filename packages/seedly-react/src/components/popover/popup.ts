import { Popover } from '@base-ui/react/popover';
import * as styles from '@kalink-ui/seedly/components/popover';

import { withClassName } from '../shared/with-class-name';

export const Popup: typeof Popover.Popup = withClassName(
  Popover.Popup,
  styles.popup,
);
