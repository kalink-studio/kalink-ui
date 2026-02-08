import { NumberField } from '@base-ui/react/number-field';
import * as styles from '@kalink-ui/seedly/components/number-field';

import { withClassName } from '../shared/with-class-name';

export const ScrubArea: typeof NumberField.ScrubArea = withClassName(
  NumberField.ScrubArea,
  styles.scrubArea,
);
