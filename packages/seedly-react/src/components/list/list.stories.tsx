import { List, ListItem } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Data Display/List',
  component: List,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    listType: 'unordered',
    orientation: 'vertical',
    markerPosition: 'outside',
    itemSpacing: 0,
    itemInlineSpacing: 8,
  },
  argTypes: {
    listType: {
      control: { type: 'inline-radio' },
      options: ['unordered', 'ordered'],
    },
    listStyle: {
      control: { type: 'select' },
      description:
        'Marker style. In horizontal orientation, markers are always rendered inside.',
      options: [
        undefined,
        'none',
        'disc',
        'circle',
        'square',
        'decimal',
        'lower-alpha',
        'upper-alpha',
        'lower-roman',
        'upper-roman',
      ],
    },
    orientation: {
      control: { type: 'inline-radio' },
      description:
        'Layout direction. Horizontal forces inside marker position and removes root inline-start padding.',
      options: ['vertical', 'horizontal'],
    },
    itemSpacing: {
      control: { type: 'select' },
      options: [0, 2, 4, 6, 8, 10, 12],
    },
    itemInlineSpacing: {
      control: { type: 'select' },
      description:
        'Inline spacing between list edge, marker and item content. In horizontal orientation, this applies to item content inset only.',
      options: [0, 2, 4, 6, 8, 10, 12],
      if: { arg: 'listStyle', neq: 'none' },
    },
    justify: {
      control: { type: 'select' },
      options: [
        'start',
        'center',
        'end',
        'spaceBetween',
        'spaceAround',
        'spaceEvenly',
      ],
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
    },
    markerPosition: {
      control: { type: 'inline-radio' },
      description:
        'Marker position for vertical lists with marker styles. Hidden when listStyle is none or orientation is horizontal.',
      options: ['inside', 'outside'],
      if: { arg: 'listStyle', neq: 'none' },
    },
    start: {
      control: { type: 'number' },
      if: { arg: 'listType', eq: 'ordered' },
    },
    reversed: {
      control: { type: 'boolean' },
      if: { arg: 'listType', eq: 'ordered' },
    },
    type: {
      control: { type: 'select' },
      options: [undefined, '1', 'a', 'A', 'i', 'I'],
      if: { arg: 'listType', eq: 'ordered' },
    },
  },

  render: (args) => (
    <List {...args}>
      <ListItem>Item 1</ListItem>
      <ListItem>Item 2</ListItem>
      <ListItem>Item 3</ListItem>
    </List>
  ),
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Ordered: Story = {
  args: {
    listType: 'ordered',
    start: 5,
    listStyle: 'decimal',
  },
};

export const Horizontal: Story = {
  args: {
    listStyle: 'none',
    orientation: 'horizontal',
    itemSpacing: 4,
  },
};

export const ListStyle: Story = {
  args: {
    listType: 'unordered',
    listStyle: 'upper-alpha',
    itemSpacing: 8,
  },
};

export const Responsive: Story = {
  args: {
    listType: 'unordered',
    listStyle: 'none',
    orientation: { xs: 'vertical', md: 'horizontal' },
    itemSpacing: 4,
    itemInlineSpacing: 8,
    justify: { md: 'center' },
  },
};
