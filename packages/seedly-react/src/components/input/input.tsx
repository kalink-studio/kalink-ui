import { Input } from '@base-ui/react/input';
import * as styles from '@kalink-ui/seedly/components/input';

export default function ExampleInput() {
  return (
    <label className={styles.Label}>
      Name
      <Input placeholder="Enter your name" className={styles.Input} />
    </label>
  );
}
