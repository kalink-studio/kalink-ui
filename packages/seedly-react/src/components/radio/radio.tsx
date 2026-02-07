'use client';
import { Radio } from '@base-ui/react/radio';
import { RadioGroup } from '@base-ui/react/radio-group';
import * as styles from '@kalink-ui/seedly/components/radio';
import * as React from 'react';

export default function ExampleRadioGroup() {
  const id = React.useId();
  return (
    <RadioGroup
      aria-labelledby={id}
      defaultValue="fuji-apple"
      className={styles.radioGroup}
    >
      <div className={styles.caption} id={id}>
        Best apple
      </div>

      <label className={styles.item}>
        <Radio.Root value="fuji-apple" className={styles.radio}>
          <Radio.Indicator className={styles.indicator} />
        </Radio.Root>
        Fuji
      </label>

      <label className={styles.item}>
        <Radio.Root value="gala-apple" className={styles.radio}>
          <Radio.Indicator className={styles.indicator} />
        </Radio.Root>
        Gala
      </label>

      <label className={styles.item}>
        <Radio.Root value="granny-smith-apple" className={styles.radio}>
          <Radio.Indicator className={styles.indicator} />
        </Radio.Root>
        Granny Smith
      </label>
    </RadioGroup>
  );
}
