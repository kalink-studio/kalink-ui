import { Text as SeedlyText } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Typography/Text',
  component: SeedlyText,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    children:
      'Commodo nulla nostrud mollit veniam fugiat sunt eu qui est incididunt exercitation. Ullamco tempor nostrud pariatur nostrud ipsum nisi velit occaecat culpa officia ut.',
    variant: 'body',
    size: 'medium',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['display', 'headline', 'title', 'label', 'body'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'justify'],
    },
    wrap: {
      control: { type: 'select' },
      options: ['true', 'false', 'balance', 'pretty'],
    },
    lineClamp: {
      control: { type: 'select' },
      options: [undefined, 2, 3, 4, 5],
    },
  },
} satisfies Meta<typeof SeedlyText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Truncate: Story = {
  args: {
    truncate: true,
  },
};

export const LineClamp: Story = {
  args: {
    lineClamp: 2,
  },
};

export const Paragraph: Story = {
  args: {
    render: <p />,
    wrap: 'balance',
  },
};

export const ResponsiveTypography: Story = {
  args: {
    variant: { xs: 'body', lg: 'title' },
    size: { xs: 'small', lg: 'large' },
  },
};
