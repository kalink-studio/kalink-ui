import { Input } from '@base-ui/react/input';
import * as styles from '@kalink-ui/seedly/components/input';

export default function ExampleInput() {
  return (
    <label className={styles.label}>
      Name
      <Input placeholder="Enter your name" className={styles.input} />
    </label>
  );
}
