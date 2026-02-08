import { Toast } from '@base-ui/react/toast';
import * as styles from '@kalink-ui/seedly/components/toast';

import { withClassName } from '../shared/with-class-name';

export const Viewport: typeof Toast.Viewport = withClassName(
  Toast.Viewport,
  styles.viewport,
);
