import { Radio } from '@base-ui/react/radio';
import * as styles from '@kalink-ui/seedly/components/radio';

import { withClassName } from '../shared/with-class-name';

export const Root: typeof Radio.Root = withClassName(Radio.Root, styles.radio);
