import { FunctionComponent } from 'react';

import { Heading } from './heading';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Typography/Heading',
  component: Heading,
  subcomponents: {
    'Heading.Pretitle': Heading.Pretitle as FunctionComponent<unknown>,
    'Heading.Subtitle': Heading.Subtitle as FunctionComponent<unknown>,
  },
  tags: ['autodocs'],
  args: {
    children: 'Ullamco in dolore cupidatat culpa',
  },
  argTypes: {
    children: {
      control: false,
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof Heading>;

export const Default: Story = {};

export const WithPretitle: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet',
    pretitle: <Heading.Pretitle spacing={4}>Lorem ipsum</Heading.Pretitle>,
  },
};

export const WithSubtitle: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet',
    subtitle: <Heading.Subtitle spacing={2}>Lorem ipsum</Heading.Subtitle>,
  },
};

export const Responsive: Story = {
  args: {
    variant: { xs: 'headline', lg: 'display' },
    size: { xs: 'small', lg: 'large' },
  },
};
