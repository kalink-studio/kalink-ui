import { LoaderOverlay } from './loader-overlay';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Component/LoaderOverlay',
  component: LoaderOverlay,
  tags: ['autodocs'],
} satisfies Meta<typeof LoaderOverlay>;

export default meta;

type Story = StoryObj<typeof LoaderOverlay>;

export const Default: Story = {};
