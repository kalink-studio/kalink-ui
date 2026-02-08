import { CheckboxGroup as BaseCheckboxGroup } from '@base-ui/react/checkbox-group';
import * as styles from '@kalink-ui/seedly/components/checkbox-group';

import { withClassName } from '../shared/with-class-name';

export const CheckboxGroup: typeof BaseCheckboxGroup = withClassName(
  BaseCheckboxGroup,
  styles.checkboxGroup,
);
