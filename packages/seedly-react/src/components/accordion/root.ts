import { Accordion } from '@base-ui/react/accordion';
import * as styles from '@kalink-ui/seedly/components/accordion';

import { withClassName } from '../shared/with-class-name';

export const Root: typeof Accordion.Root = withClassName(
  Accordion.Root,
  styles.accordion,
);
