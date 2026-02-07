import { Switch } from '@base-ui/react/switch';
import * as styles from '@kalink-ui/seedly/components/switch';

export default function ExampleSwitch() {
  return (
    <label className={styles.Label}>
      <Switch.Root defaultChecked className={styles.Switch}>
        <Switch.Thumb className={styles.Thumb} />
      </Switch.Root>
      Notifications
    </label>
  );
}
