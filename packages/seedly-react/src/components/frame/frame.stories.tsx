import { Frame as SeedlyFrame } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Layout/Frame',
  component: SeedlyFrame,
  tags: ['autodocs'],
} satisfies Meta<typeof SeedlyFrame>;

export default meta;

type Story = StoryObj<typeof SeedlyFrame>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  return (
    <SeedlyFrame ratio="16:9">
      <div
        style={{
          inlineSize: '100%',
          blockSize: '100%',
          display: 'grid',
          placeItems: 'center',
          background:
            'linear-gradient(135deg, rgb(37 99 235) 0%, rgb(29 78 216) 45%, rgb(30 64 175) 100%)',
          color: 'white',
          fontWeight: 600,
        }}
      >
        16:9 preview
      </div>
    </SeedlyFrame>
  );
}
