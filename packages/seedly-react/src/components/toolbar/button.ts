import { Toolbar } from '@base-ui/react/toolbar';
import * as styles from '@kalink-ui/seedly/components/toolbar';

import { withClassName } from '../shared/with-class-name';

export const Button: typeof Toolbar.Button = withClassName(
  Toolbar.Button,
  styles.button,
);
