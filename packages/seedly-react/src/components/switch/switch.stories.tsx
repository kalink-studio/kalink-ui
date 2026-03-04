import { expect, userEvent, within } from 'storybook/test';

import { Switch } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Switch',
  component: Switch.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof Switch.Root>;

export default meta;

type Story = StoryObj<typeof Switch.Root>;

export const Default: Story = {
  render: () => <Example />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('switch');
    await expect(toggle).not.toBeChecked();
    await userEvent.click(toggle);
    await expect(toggle).toBeChecked();
  },
};

export const States: Story = {
  render: () => <StateGallery />,
};

function Example() {
  return (
    <Switch.Label>
      <Switch.Root>
        <Switch.Thumb />
      </Switch.Root>
      Notifications
    </Switch.Label>
  );
}

function StateGallery() {
  return (
    <div
      style={{
        display: 'grid',
        gap: '1rem',
        alignItems: 'start',
      }}
    >
      <Switch.Label>
        <Switch.Root>
          <Switch.Thumb />
        </Switch.Root>
        Off
      </Switch.Label>

      <Switch.Label>
        <Switch.Root defaultChecked>
          <Switch.Thumb />
        </Switch.Root>
        On
      </Switch.Label>

      <Switch.Label>
        <Switch.Root disabled>
          <Switch.Thumb />
        </Switch.Root>
        Disabled
      </Switch.Label>

      <Switch.Label>
        <Switch.Root defaultChecked disabled>
          <Switch.Thumb />
        </Switch.Root>
        Disabled on
      </Switch.Label>

      <Switch.Label>
        <Switch.Root readOnly defaultChecked>
          <Switch.Thumb />
        </Switch.Root>
        Read-only
      </Switch.Label>
    </div>
  );
}
