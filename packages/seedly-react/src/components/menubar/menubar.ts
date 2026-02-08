import { Menubar as BaseMenubar } from '@base-ui/react/menubar';
import * as styles from '@kalink-ui/seedly/components/menubar';

import { withClassName } from '../shared/with-class-name';

export const Menubar: typeof BaseMenubar = withClassName(
  BaseMenubar,
  styles.menubar,
);
