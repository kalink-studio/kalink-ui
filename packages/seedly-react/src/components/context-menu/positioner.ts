import { ContextMenu } from '@base-ui/react/context-menu';
import * as styles from '@kalink-ui/seedly/components/context-menu';

import { withClassName } from '../shared/with-class-name';

export const Positioner: typeof ContextMenu.Positioner = withClassName(
  ContextMenu.Positioner,
  styles.positioner,
);
