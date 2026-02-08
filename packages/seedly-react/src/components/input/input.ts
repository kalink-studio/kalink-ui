import { Input as BaseInput } from '@base-ui/react/input';
import * as styles from '@kalink-ui/seedly/components/input';

import { withClassName } from '../shared/with-class-name';

export const Input: typeof BaseInput = withClassName(BaseInput, styles.input);
