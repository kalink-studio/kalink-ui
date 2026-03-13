import { useId, type ComponentProps } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { Combobox } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Combobox',
  component: Combobox.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof Combobox.Root>;

export default meta;

type Story = StoryObj<typeof Combobox.Root>;

export const Default: Story = {
  render: () => <Example />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText(/choose a fruit/i);
    const trigger = canvas.getByLabelText(/open popup/i);

    await userEvent.click(trigger);
    const body = within(canvasElement.ownerDocument.body);
    const option = await body.findByRole('option', { name: 'Banana' });
    await userEvent.click(option);

    await expect(input).toHaveValue('Banana');
  },
};

function Example() {
  const id = useId();
  return (
    <Combobox.Root items={fruits}>
      <Combobox.Label htmlFor={id}>
        Choose a fruit
        <Combobox.InputWrapper>
          <Combobox.Input placeholder="e.g. Apple" id={id} />
          <Combobox.ActionButtons>
            <Combobox.Clear aria-label="Clear selection" icon={<ClearIcon />} />
            <Combobox.Trigger
              aria-label="Open popup"
              icon={<ChevronDownIcon />}
            />
          </Combobox.ActionButtons>
        </Combobox.InputWrapper>
      </Combobox.Label>

      <Combobox.Portal>
        <Combobox.Positioner sideOffset={4}>
          <Combobox.Popup>
            <Combobox.Empty>No fruits found.</Combobox.Empty>
            <Combobox.List>
              {(item: Fruit) => (
                <Combobox.Item key={item.value} value={item}>
                  <Combobox.ItemIndicator>
                    <CheckIcon />
                  </Combobox.ItemIndicator>
                  <Combobox.ItemText>{item.label}</Combobox.ItemText>
                </Combobox.Item>
              )}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  );
}

function CheckIcon(props: ComponentProps<'svg'>) {
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

function ClearIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

function ChevronDownIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

interface Fruit {
  label: string;
  value: string;
}

const fruits: Fruit[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
  { label: 'Pineapple', value: 'pineapple' },
  { label: 'Grape', value: 'grape' },
  { label: 'Mango', value: 'mango' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Blueberry', value: 'blueberry' },
  { label: 'Raspberry', value: 'raspberry' },
  { label: 'Blackberry', value: 'blackberry' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Peach', value: 'peach' },
  { label: 'Pear', value: 'pear' },
  { label: 'Plum', value: 'plum' },
  { label: 'Kiwi', value: 'kiwi' },
  { label: 'Watermelon', value: 'watermelon' },
  { label: 'Cantaloupe', value: 'cantaloupe' },
  { label: 'Honeydew', value: 'honeydew' },
  { label: 'Papaya', value: 'papaya' },
  { label: 'Guava', value: 'guava' },
  { label: 'Lychee', value: 'lychee' },
  { label: 'Pomegranate', value: 'pomegranate' },
  { label: 'Apricot', value: 'apricot' },
  { label: 'Grapefruit', value: 'grapefruit' },
  { label: 'Passionfruit', value: 'passionfruit' },
];
