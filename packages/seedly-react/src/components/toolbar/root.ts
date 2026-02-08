import { Toolbar } from '@base-ui/react/toolbar';
import * as styles from '@kalink-ui/seedly/components/toolbar';

import { withClassName } from '../shared/with-class-name';

export const Root: typeof Toolbar.Root = withClassName(
  Toolbar.Root,
  styles.toolbar,
);
