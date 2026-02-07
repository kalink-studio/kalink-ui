import { Field } from '@base-ui/react/field';
import * as styles from '@kalink-ui/seedly/components/field';

export default function ExampleField() {
  return (
    <Field.Root className={styles.field}>
      <Field.Label className={styles.label}>Name</Field.Label>
      <Field.Control required placeholder="Required" className={styles.input} />

      <Field.Error className={styles.error} match="valueMissing">
        Please enter your name
      </Field.Error>

      <Field.Description className={styles.description}>
        Visible on your profile
      </Field.Description>
    </Field.Root>
  );
}
