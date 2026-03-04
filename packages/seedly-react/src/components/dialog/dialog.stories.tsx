import { expect, userEvent, within } from 'storybook/test';

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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /view notifications/i });
    await userEvent.click(trigger);

    const body = within(canvasElement.ownerDocument.body);
    const closeButton = await body.findByRole('button', { name: /close/i });
    await expect(closeButton).toBeInTheDocument();

    await userEvent.click(closeButton);
  },
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
          <Dialog.Actions>
            <Dialog.Close>Close</Dialog.Close>
          </Dialog.Actions>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
