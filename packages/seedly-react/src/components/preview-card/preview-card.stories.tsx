import { expect, userEvent, within } from 'storybook/test';

import { Box } from '../box';
import { Frame } from '../frame';
import { Heading } from '../heading';
import { Stack } from '../stack';
import { Text } from '../text';

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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('link', { name: /typography/i });
    await userEvent.hover(trigger);
    await expect(trigger).toHaveAttribute(
      'href',
      'https://en.wikipedia.org/wiki/Typography',
    );
  },
};

function Example() {
  return (
    <PreviewCard.Root>
      <Text>
        {'The principles of good '}
        <PreviewCard.Trigger href="https://en.wikipedia.org/wiki/Typography">
          {'typography'}
        </PreviewCard.Trigger>
        {' remain in the digital age.'}
      </Text>

      <PreviewCard.Portal>
        <PreviewCard.Positioner sideOffset={8}>
          <PreviewCard.Popup>
            <PreviewCard.Arrow />
            <Stack spacing={0}>
              <Frame ratio="16:9">
                <img
                  src="https://images.unsplash.com/photo-1619615391095-dfa29e1672ef?q=80&w=600&h=400&fit=crop"
                  alt="Station Hofplein signage in Rotterdam, Netherlands"
                />
              </Frame>
              <Box spacing={4}>
                <Stack spacing={4}>
                  <Heading.Root level="h4" size="small">
                    Typography
                  </Heading.Root>
                  <Text wrap="pretty">
                    Typography is the art and science of arranging type to make
                    written language clear, visually appealing, and effective in
                    communication.
                  </Text>
                </Stack>
              </Box>
            </Stack>
          </PreviewCard.Popup>
        </PreviewCard.Positioner>
      </PreviewCard.Portal>
    </PreviewCard.Root>
  );
}
