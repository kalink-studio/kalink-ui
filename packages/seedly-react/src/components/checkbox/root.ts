import { Checkbox } from '@base-ui/react/checkbox';
import * as styles from '@kalink-ui/seedly/components/checkbox';

import { withClassName } from '../shared/with-class-name';

export const Root: typeof Checkbox.Root = withClassName(
  Checkbox.Root,
  styles.checkbox,
);
