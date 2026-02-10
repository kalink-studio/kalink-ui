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
};

function Example() {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>Right click here</ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Positioner>
          <ContextMenu.Popup>
            <ContextMenu.Item>Add to Library</ContextMenu.Item>
            <ContextMenu.Item>Add to Playlist</ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item>Play Next</ContextMenu.Item>
            <ContextMenu.Item>Play Last</ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item>Favorite</ContextMenu.Item>
            <ContextMenu.Item>Share</ContextMenu.Item>
          </ContextMenu.Popup>
        </ContextMenu.Positioner>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}
