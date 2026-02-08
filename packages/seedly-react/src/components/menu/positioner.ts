import { Menu } from '@base-ui/react/menu';
import * as styles from '@kalink-ui/seedly/components/menu';

import { withClassName } from '../shared/with-class-name';

export const Positioner: typeof Menu.Positioner = withClassName(
  Menu.Positioner,
  styles.positioner,
);
