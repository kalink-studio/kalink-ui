import { Switch } from '@base-ui/react/switch';
import * as styles from '@kalink-ui/seedly/components/switch';

export default function ExampleSwitch() {
  return (
    <label className={styles.label}>
      <Switch.Root defaultChecked className={styles.switchRoot}>
        <Switch.Thumb className={styles.thumb} />
      </Switch.Root>
      Notifications
    </label>
  );
}
