import { Tooltip } from '@base-ui/react/tooltip';
import * as styles from '@kalink-ui/seedly/components/tooltip';

import { withClassName } from '../shared/with-class-name';

export const Popup: typeof Tooltip.Popup = withClassName(
  Tooltip.Popup,
  styles.popup,
);
