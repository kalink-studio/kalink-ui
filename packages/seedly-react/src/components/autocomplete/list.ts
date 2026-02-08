import { Autocomplete } from '@base-ui/react/autocomplete';
import * as styles from '@kalink-ui/seedly/components/autocomplete';

import { withClassName } from '../shared/with-class-name';

export const List: typeof Autocomplete.List = withClassName(
  Autocomplete.List,
  styles.list,
);
