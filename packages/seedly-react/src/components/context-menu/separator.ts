import { ContextMenu } from '@base-ui/react/context-menu';
import * as styles from '@kalink-ui/seedly/components/context-menu';

import { withClassName } from '../shared/with-class-name';

export const Separator: typeof ContextMenu.Separator = withClassName(
  ContextMenu.Separator,
  styles.separator,
);
