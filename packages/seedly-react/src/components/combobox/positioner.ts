import { Combobox } from '@base-ui/react/combobox';
import * as styles from '@kalink-ui/seedly/components/combobox';

import { withClassName } from '../shared/with-class-name';

export const Positioner: typeof Combobox.Positioner = withClassName(
  Combobox.Positioner,
  styles.positioner,
);
