import { Field } from '@base-ui/react/field';
import { Select } from '@base-ui/react/select';
import * as styles from '@kalink-ui/seedly/components/select';
import * as React from 'react';

const apples = [
  { label: 'Gala', value: 'gala' },
  { label: 'Fuji', value: 'fuji' },
  { label: 'Honeycrisp', value: 'honeycrisp' },
  { label: 'Granny Smith', value: 'granny-smith' },
  { label: 'Pink Lady', value: 'pink-lady' },
];

export default function ExampleSelect() {
  return (
    <Field.Root className={styles.field}>
      <Field.Label
        className={styles.label}
        nativeLabel={false}
        render={<div />}
      >
        Apple
      </Field.Label>
      <Select.Root items={apples}>
        <Select.Trigger className={styles.select}>
          <Select.Value className={styles.value} placeholder="Select apple" />
          <Select.Icon className={styles.selectIcon}>
            <ChevronUpDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner className={styles.positioner} sideOffset={8}>
            <Select.Popup className={styles.popup}>
              <Select.ScrollUpArrow className={styles.scrollArrow} />
              <Select.List className={styles.list}>
                {apples.map(({ label, value }) => (
                  <Select.Item
                    key={label}
                    value={value}
                    className={styles.item}
                  >
                    <Select.ItemIndicator className={styles.itemIndicator}>
                      <CheckIcon className={styles.itemIndicatorIcon} />
                    </Select.ItemIndicator>
                    <Select.ItemText className={styles.itemText}>
                      {label}
                    </Select.ItemText>
                  </Select.Item>
                ))}
              </Select.List>
              <Select.ScrollDownArrow className={styles.scrollArrow} />
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    </Field.Root>
  );
}

function ChevronUpDownIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.5"
      {...props}
    >
      <path d="M0.5 4.5L4 1.5L7.5 4.5" />
      <path d="M0.5 7.5L4 10.5L7.5 7.5" />
    </svg>
  );
}

function CheckIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      fill="currentcolor"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      {...props}
    >
      <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
    </svg>
  );
}
