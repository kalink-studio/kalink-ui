import { Combobox } from '@base-ui/react/combobox';
import * as styles from '@kalink-ui/seedly/components/combobox';

import { withClassName } from '../shared/with-class-name';

export const Input: typeof Combobox.Input = withClassName(
  Combobox.Input,
  styles.input,
);
