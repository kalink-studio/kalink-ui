import { Field } from '@base-ui/react/field';
import * as styles from '@kalink-ui/seedly/components/field';

import { withClassName } from '../shared/with-class-name';

export const Error: typeof Field.Error = withClassName(
  Field.Error,
  styles.error,
);
