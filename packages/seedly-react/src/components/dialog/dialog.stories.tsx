import { Dialog } from '@base-ui/react/dialog';
import * as styles from '@kalink-ui/seedly/components/dialog';

import { Dialog as SeedlyDialog } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Dialog',
  component: SeedlyDialog.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof SeedlyDialog.Root>;

export default meta;

type Story = StoryObj<typeof SeedlyDialog.Root>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  return (
    <Dialog.Root>
      <Dialog.Trigger className={styles.button}>
        View notifications
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.backdrop} />
        <Dialog.Popup className={styles.popup}>
          <Dialog.Title className={styles.title}>Notifications</Dialog.Title>
          <Dialog.Description className={styles.description}>
            You are all caught up. Good job!
          </Dialog.Description>
          <div className={styles.actions}>
            <Dialog.Close className={styles.button}>Close</Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
