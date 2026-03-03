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
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({
    listType,
    listStyle,
    orientation,
    itemSpacing,
    itemInlineSpacing,
    justify,
    align,
    markerPosition,
  }) => (
    <List
      listType={listType}
      listStyle={listStyle}
      orientation={orientation}
      itemSpacing={itemSpacing}
      itemInlineSpacing={itemInlineSpacing}
      justify={justify}
      align={align}
      markerPosition={markerPosition}
    >
      <ListItem>First item</ListItem>
      <ListItem>Second item</ListItem>
      <ListItem>Third item</ListItem>
    </List>
  ),
};

export const Ordered: Story = {
  args: {
    listType: 'ordered',
    start: 5,
    reversed: true,
  },
  render: (args) => (
    <List
      listType={args.listType}
      listStyle={args.listStyle}
      orientation={args.orientation}
      itemSpacing={args.itemSpacing}
      itemInlineSpacing={args.itemInlineSpacing}
      justify={args.justify}
      align={args.align}
      markerPosition={args.markerPosition}
      start={args.listType === 'ordered' ? args.start : undefined}
      reversed={args.listType === 'ordered' ? args.reversed : undefined}
      type={args.listType === 'ordered' ? args.type : undefined}
    >
      <ListItem>Item one</ListItem>
      <ListItem>Item two</ListItem>
      <ListItem>Item three</ListItem>
    </List>
  ),
};

export const Horizontal: Story = {
  args: {
    listType: 'unordered',
    listStyle: 'none',
    orientation: 'horizontal',
    itemSpacing: 4,
    itemInlineSpacing: 8,
  },
  render: ({
    listType,
    listStyle,
    orientation,
    itemSpacing,
    itemInlineSpacing,
    justify,
    align,
    markerPosition,
  }) => (
    <List
      listType={listType}
      listStyle={listStyle}
      orientation={orientation}
      itemSpacing={itemSpacing}
      itemInlineSpacing={itemInlineSpacing}
      justify={justify}
      align={align}
      markerPosition={markerPosition}
    >
      <ListItem>Home</ListItem>
      <ListItem>About</ListItem>
      <ListItem>Contact</ListItem>
    </List>
  ),
};

export const ListStyleNone: Story = {
  args: {
    listType: 'unordered',
    listStyle: 'none',
    itemSpacing: 2,
  },
  render: ({
    listType,
    listStyle,
    orientation,
    itemSpacing,
    itemInlineSpacing,
    justify,
    align,
    markerPosition,
  }) => (
    <List
      listType={listType}
      listStyle={listStyle}
      orientation={orientation}
      itemSpacing={itemSpacing}
      itemInlineSpacing={itemInlineSpacing}
      justify={justify}
      align={align}
      markerPosition={markerPosition}
    >
      <ListItem>No markers here</ListItem>
      <ListItem>Padding is reset</ListItem>
      <ListItem>Margins are zeroed</ListItem>
    </List>
  ),
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
  render: ({
    listType,
    listStyle,
    orientation,
    itemSpacing,
    itemInlineSpacing,
    justify,
    align,
    markerPosition,
  }) => (
    <List
      listType={listType}
      listStyle={listStyle}
      orientation={orientation}
      itemSpacing={itemSpacing}
      itemInlineSpacing={itemInlineSpacing}
      justify={justify}
      align={align}
      markerPosition={markerPosition}
    >
      <ListItem>Item 1</ListItem>
      <ListItem>Item 2</ListItem>
      <ListItem>Item 3</ListItem>
    </List>
  ),
};
