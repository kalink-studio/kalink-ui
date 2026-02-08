import { AlertDialog } from '@base-ui/react/alert-dialog';
import * as styles from '@kalink-ui/seedly/components/alert-dialog';

import { withClassName } from '../shared/with-class-name';

export const Close: typeof AlertDialog.Close = withClassName(
  AlertDialog.Close,
  styles.button,
);
