import { Toast } from '@base-ui/react/toast';
import * as styles from '@kalink-ui/seedly/components/toast';

import { withClassName } from '../shared/with-class-name';

export const Root: typeof Toast.Root = withClassName(Toast.Root, styles.toast);
