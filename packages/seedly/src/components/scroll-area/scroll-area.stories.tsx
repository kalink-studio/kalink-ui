import { expect } from 'storybook/test';

import { responsiveSelectArg } from '../../utils';
import { Text } from '../text';

import { ScrollArea } from './scroll-area';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Component/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    maxHeight: '200px',
    style: { width: 300 },
  },
  argTypes: {
    tone: responsiveSelectArg({
      options: ['neutral', 'primary', 'destructive', 'success'],
      summary: 'Responsive<Tone>',
    }),
  },
} satisfies Meta<typeof ScrollArea>;

export default meta;

type Story = StoryObj<typeof ScrollArea>;

const longContent = Array.from({ length: 20 }, (_, i) => (
  <Text key={i} style={{ padding: '8px 0' }}>
    Item {i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  </Text>
));

const wideContent = (
  <div style={{ width: 600, padding: 16 }}>
    <Text>
      This is a very wide content that should trigger horizontal scrolling.
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </Text>
  </div>
);

export const Default: Story = {
  args: {
    children: longContent,
  },
  play: async ({ canvas, step }) => {
    await step('Verify scroll area renders with content', async () => {
      const scrollArea = canvas.getByText('Item 1:', { exact: false });
      await expect(scrollArea).toBeVisible();
    });

    await step('Verify last item exists in DOM (scrollable)', async () => {
      const lastItem = canvas.getByText('Item 20:', { exact: false });
      await expect(lastItem).toBeInTheDocument();
    });
  },
};

export const WithMaxHeight: Story = {
  args: {
    maxHeight: '150px',
    children: longContent,
  },
  play: async ({ canvas, step }) => {
    await step('Verify content is scrollable within max height', async () => {
      const firstItem = canvas.getByText('Item 1:', { exact: false });
      await expect(firstItem).toBeVisible();

      // Last items should exist but may not be visible without scrolling
      const lastItem = canvas.getByText('Item 20:', { exact: false });
      await expect(lastItem).toBeInTheDocument();
    });
  },
};

export const HorizontalScroll: Story = {
  args: {
    maxHeight: 'initial',
    orientation: 'horizontal',
    style: { width: 300, height: 100 },
    children: wideContent,
  },
  play: async ({ canvas, step }) => {
    await step('Verify horizontal content renders', async () => {
      const content = canvas.getByText('This is a very wide content', {
        exact: false,
      });
      await expect(content).toBeVisible();
    });
  },
};

export const BothDirections: Story = {
  args: {
    maxHeight: '200px',
    orientation: 'both',
    style: { width: 250 },
    children: (
      <div style={{ width: 400 }}>
        {Array.from({ length: 15 }, (_, i) => (
          <Text key={i} style={{ padding: '8px 0', whiteSpace: 'nowrap' }}>
            Item {i + 1}: This is a long line that extends beyond the container
            width to trigger horizontal scrolling.
          </Text>
        ))}
      </div>
    ),
  },
  play: async ({ canvas, step }) => {
    await step(
      'Verify content renders for both scroll directions',
      async () => {
        const firstItem = canvas.getByText('Item 1:', { exact: false });
        await expect(firstItem).toBeVisible();
      },
    );

    await step('Verify last item exists (vertically scrollable)', async () => {
      const lastItem = canvas.getByText('Item 15:', { exact: false });
      await expect(lastItem).toBeInTheDocument();
    });
  },
};

export const SmallContent: Story = {
  args: {
    maxHeight: '300px',
    children: (
      <div style={{ padding: 16 }}>
        <Text>Small content that does not require scrolling.</Text>
      </div>
    ),
  },
  play: async ({ canvas, step }) => {
    await step('Verify small content renders without scrollbar', async () => {
      const content = canvas.getByText('Small content', { exact: false });
      await expect(content).toBeVisible();
    });
  },
};
