import { FunctionComponent } from 'react';

import { Heading } from './heading';

import type { Meta, StoryObj } from '@storybook/react';

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
    spacing: 4,
    children: 'Lorem ipsum dolor sit amet',
    pretitle: <Heading.Pretitle>Lorem ipsum</Heading.Pretitle>,
  },
};

export const WithSubtitle: Story = {
  args: {
    spacing: 4,
    children: 'Lorem ipsum dolor sit amet',
    subtitle: <Heading.Subtitle>Lorem ipsum</Heading.Subtitle>,
  },
};
