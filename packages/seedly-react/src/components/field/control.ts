import { Field } from '@base-ui/react/field';
import * as styles from '@kalink-ui/seedly/components/field';

import { withClassName } from '../shared/with-class-name';

export const Control: typeof Field.Control = withClassName(
  Field.Control,
  styles.input,
);
