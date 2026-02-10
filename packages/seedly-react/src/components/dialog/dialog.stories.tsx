import * as styles from '@kalink-ui/seedly/components/dialog';

import { Dialog } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Dialog',
  component: Dialog.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog.Root>;

export default meta;

type Story = StoryObj<typeof Dialog.Root>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>View notifications</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup>
          <Dialog.Title>Notifications</Dialog.Title>
          <Dialog.Description>
            You are all caught up. Good job!
          </Dialog.Description>
          <div className={styles.actions}>
            <Dialog.Close>Close</Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
