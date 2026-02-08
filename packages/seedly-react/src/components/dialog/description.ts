import { Dialog } from '@base-ui/react/dialog';
import * as styles from '@kalink-ui/seedly/components/dialog';

import { withClassName } from '../shared/with-class-name';

export const Description: typeof Dialog.Description = withClassName(
  Dialog.Description,
  styles.description,
);
