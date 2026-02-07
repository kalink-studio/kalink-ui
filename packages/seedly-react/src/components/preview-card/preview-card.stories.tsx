import { PreviewCard } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Preview Card',
  component: PreviewCard,
  tags: ['autodocs'],
} satisfies Meta<typeof PreviewCard>;

export default meta;

type Story = StoryObj<typeof PreviewCard>;

export const Default: Story = {};
