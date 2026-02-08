import { Toast } from '@base-ui/react/toast';
import * as styles from '@kalink-ui/seedly/components/toast';

import { withClassName } from '../shared/with-class-name';

export const Content: typeof Toast.Content = withClassName(
  Toast.Content,
  styles.content,
);
