import { Stack } from '../stack';

import { PreviewCard } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Preview Card',
  component: PreviewCard.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof PreviewCard.Root>;

export default meta;

type Story = StoryObj<typeof PreviewCard.Root>;

export const Default: Story = {
  render: () => <Example />,
};

function Example() {
  return (
    <PreviewCard.Root>
      <p>
        The principles of good{' '}
        <PreviewCard.Trigger href="https://en.wikipedia.org/wiki/Typography">
          typography
        </PreviewCard.Trigger>{' '}
        remain in the digital age.
      </p>

      <PreviewCard.Portal>
        <PreviewCard.Positioner sideOffset={8}>
          <PreviewCard.Popup>
            <PreviewCard.Arrow />
            <Stack spacing={4}>
              <img
                width="224"
                height="150"
                style={{ display: 'block', borderRadius: '0.25rem' }}
                src="https://images.unsplash.com/photo-1619615391095-dfa29e1672ef?q=80&w=448&h=300"
                alt="Station Hofplein signage in Rotterdam, Netherlands"
              />
              <p style={{ margin: 0 }}>
                <strong>Typography</strong> is the art and science of arranging
                type to make written language clear, visually appealing, and
                effective in communication.
              </p>
            </Stack>
          </PreviewCard.Popup>
        </PreviewCard.Positioner>
      </PreviewCard.Portal>
    </PreviewCard.Root>
  );
}
