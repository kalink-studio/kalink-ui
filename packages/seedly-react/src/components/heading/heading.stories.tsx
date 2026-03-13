import { Heading as SeedlyHeading } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Typography/Heading',
  component: SeedlyHeading.Root,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    children: 'Ullamco in dolore cupidatat culpa',
    level: 'h2',
  },
  argTypes: {
    level: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    variant: {
      control: { type: 'select' },
      options: ['display', 'headline', 'title'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'justify'],
    },
  },
} satisfies Meta<typeof SeedlyHeading.Root>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithPretitle: Story = {
  args: {
    pretitle: (
      <SeedlyHeading.Pretitle spacing={4}>Lorem ipsum</SeedlyHeading.Pretitle>
    ),
    children: 'Lorem ipsum dolor sit amet',
  },
};

export const WithSubtitle: Story = {
  args: {
    subtitle: (
      <SeedlyHeading.Subtitle spacing={2}>Lorem ipsum</SeedlyHeading.Subtitle>
    ),
    children: 'Lorem ipsum dolor sit amet',
  },
};

export const ResponsiveTypography: Story = {
  args: {
    variant: { xs: 'headline', lg: 'display' },
    size: { xs: 'small', lg: 'large' },
  },
};
