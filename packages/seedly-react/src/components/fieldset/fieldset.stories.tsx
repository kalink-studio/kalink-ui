import { Fieldset } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Fieldset',
  component: Fieldset,
  tags: ['autodocs'],
} satisfies Meta<typeof Fieldset>;

export default meta;

type Story = StoryObj<typeof Fieldset>;

export const Default: Story = {};
