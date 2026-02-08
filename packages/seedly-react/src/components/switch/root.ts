import { Switch } from '@base-ui/react/switch';
import * as styles from '@kalink-ui/seedly/components/switch';

import { withClassName } from '../shared/with-class-name';

export const Root: typeof Switch.Root = withClassName(
  Switch.Root,
  styles.switchRoot,
);
