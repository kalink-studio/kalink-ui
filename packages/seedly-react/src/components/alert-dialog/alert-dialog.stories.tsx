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
      <AlertDialog.Trigger tone="error">Discard draft</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop />
        <AlertDialog.Popup>
          <AlertDialog.Title>Discard draft?</AlertDialog.Title>
          <AlertDialog.Description>
            You can&apos;t undo this action.
          </AlertDialog.Description>
          <AlertDialog.Actions>
            <AlertDialog.Close>Cancel</AlertDialog.Close>
            <AlertDialog.Close tone="error" variant="solid">
              Discard
            </AlertDialog.Close>
          </AlertDialog.Actions>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
