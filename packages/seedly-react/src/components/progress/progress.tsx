'use client';
import { Progress } from '@base-ui/react/progress';
import * as styles from '@kalink-ui/seedly/components/progress';
import * as React from 'react';

export default function ExampleProgress() {
  const [value, setValue] = React.useState(20);

  // Simulate changes
  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((current) =>
        Math.min(100, Math.round(current + Math.random() * 25)),
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Progress.Root className={styles.progress} value={value}>
      <Progress.Label className={styles.label}>Export data</Progress.Label>
      <Progress.Value className={styles.value} />
      <Progress.Track className={styles.track}>
        <Progress.Indicator className={styles.indicator} />
      </Progress.Track>
    </Progress.Root>
  );
}
