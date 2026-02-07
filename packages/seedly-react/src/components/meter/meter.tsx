import { Meter } from '@base-ui/react/meter';
import * as styles from '@kalink-ui/seedly/components/meter';

export default function ExampleMeter() {
  return (
    <Meter.Root className={styles.meter} value={24}>
      <Meter.Label className={styles.label}>Storage Used</Meter.Label>
      <Meter.Value className={styles.value} />
      <Meter.Track className={styles.track}>
        <Meter.Indicator className={styles.indicator} />
      </Meter.Track>
    </Meter.Root>
  );
}
