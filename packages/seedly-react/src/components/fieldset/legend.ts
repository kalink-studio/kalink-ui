import { Fieldset } from '@base-ui/react/fieldset';
import * as styles from '@kalink-ui/seedly/components/fieldset';

import { withClassName } from '../shared/with-class-name';

export const Legend: typeof Fieldset.Legend = withClassName(
  Fieldset.Legend,
  styles.legend,
);
