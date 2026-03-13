import { expect, userEvent, within } from 'storybook/test';

import { Box } from '../box';
import { Menu } from '../menu';
import { Text } from '../text';

import { ContextMenu } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Context Menu',
  component: ContextMenu.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof ContextMenu.Root>;

export default meta;

type Story = StoryObj<typeof ContextMenu.Root>;

export const Default: Story = {
  render: () => <Example />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText(/right click here/i);

    await userEvent.pointer({ target: trigger, keys: '[MouseRight]' });

    const body = within(canvasElement.ownerDocument.body);
    const menuItem = await body.findByRole('menuitem', {
      name: /add to library/i,
    });
    await expect(menuItem).toBeInTheDocument();
  },
};

function Example() {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <Box
          colorKey="high"
          colorSource="container"
          corner="medium"
          spacing={8}
          variant="outline"
        >
          <Text>Right click here</Text>
        </Box>
      </ContextMenu.Trigger>
      <Menu.Portal>
        <Menu.Positioner>
          <Menu.Popup>
            <Menu.Item>Add to Library</Menu.Item>
            <Menu.Item>Add to Playlist</Menu.Item>
            <Menu.Separator />
            <Menu.Item>Play Next</Menu.Item>
            <Menu.Item>Play Last</Menu.Item>
            <Menu.Separator />
            <Menu.Item>Favorite</Menu.Item>
            <Menu.Item>Share</Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </ContextMenu.Root>
  );
}
