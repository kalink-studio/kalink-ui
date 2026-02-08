import { Autocomplete } from '@base-ui/react/autocomplete';
import * as styles from '@kalink-ui/seedly/components/autocomplete';

import { withClassName } from '../shared/with-class-name';

export const Positioner: typeof Autocomplete.Positioner = withClassName(
  Autocomplete.Positioner,
  styles.positioner,
);
