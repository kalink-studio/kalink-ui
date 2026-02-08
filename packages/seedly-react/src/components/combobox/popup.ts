import { Combobox } from '@base-ui/react/combobox';
import * as styles from '@kalink-ui/seedly/components/combobox';

import { withClassName } from '../shared/with-class-name';

export const Popup: typeof Combobox.Popup = withClassName(
  Combobox.Popup,
  styles.popup,
);
