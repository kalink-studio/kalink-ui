import * as styles from '@kalink-ui/seedly/components/alert-dialog';

import { AlertDialog } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Alert Dialog',
  component: AlertDialog.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof AlertDialog.Root>;

export default meta;

type Story = StoryObj<typeof AlertDialog.Root>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger data-color="red">Discard draft</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop />
        <AlertDialog.Popup>
          <AlertDialog.Title>Discard draft?</AlertDialog.Title>
          <AlertDialog.Description>
            You can&apos;t undo this action.
          </AlertDialog.Description>
          <div className={styles.actions}>
            <AlertDialog.Close>Cancel</AlertDialog.Close>
            <AlertDialog.Close data-color="red">Discard</AlertDialog.Close>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
