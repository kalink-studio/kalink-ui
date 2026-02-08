import { Field } from '@base-ui/react/field';
import * as styles from '@kalink-ui/seedly/components/field';

import { withClassName } from '../shared/with-class-name';

export const Label: typeof Field.Label = withClassName(
  Field.Label,
  styles.label,
);
