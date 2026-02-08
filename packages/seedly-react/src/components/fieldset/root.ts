import { Fieldset } from '@base-ui/react/fieldset';
import * as styles from '@kalink-ui/seedly/components/fieldset';

import { withClassName } from '../shared/with-class-name';

export const Root: typeof Fieldset.Root = withClassName(
  Fieldset.Root,
  styles.fieldset,
);
