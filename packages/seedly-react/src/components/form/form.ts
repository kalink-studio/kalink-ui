import { Form as BaseForm } from '@base-ui/react/form';
import * as styles from '@kalink-ui/seedly/components/form';

import { withClassName } from '../shared/with-class-name';

export const Form: typeof BaseForm = withClassName(BaseForm, styles.form);
