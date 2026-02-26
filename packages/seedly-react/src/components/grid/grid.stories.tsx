import { Grid as SeedlyGrid, GridChild as SeedlyGridChild } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Layout/Grid',
  component: SeedlyGrid,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    spacing: 4,
    columns: 4,
    autoLayout: undefined,
    minSize: '10rem',
    justifyItems: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'start',
    alignContent: 'start',
  },
  argTypes: {
    spacing: {
      control: {
        type: 'select',
      },
      options: [0, 2, 4, 6, 8, 10, 12],
    },
    columns: {
      control: {
        type: 'select',
      },
      options: [1, 2, 3, 4, 5, 6, 8, 12],
    },
    autoLayout: {
      control: {
        type: 'inline-radio',
      },
      options: [undefined, 'fit', 'fill'],
    },
    minSize: {
      control: {
        type: 'text',
      },
    },
    justifyItems: {
      control: {
        type: 'select',
      },
      options: ['start', 'center', 'end', 'stretch'],
    },
    alignItems: {
      control: {
        type: 'select',
      },
      options: ['start', 'center', 'end', 'stretch'],
    },
    justifyContent: {
      control: {
        type: 'select',
      },
      options: ['start', 'center', 'end', 'spaceBetween', 'spaceAround'],
    },
    alignContent: {
      control: {
        type: 'select',
      },
      options: ['start', 'center', 'end', 'stretch', 'spaceBetween'],
    },
  },
} satisfies Meta<typeof SeedlyGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <SeedlyGrid {...args}>
      <SeedlyGridChild colSpan={2}>
        <Card>Hero</Card>
      </SeedlyGridChild>
      <Card>A</Card>
      <Card>B</Card>
      <Card>C</Card>
      <Card>D</Card>
      <Card>E</Card>
    </SeedlyGrid>
  ),
};

function Card({ children }: { children: string }) {
  return (
    <div
      style={{
        padding: '1rem',
        border: '1px solid #d1d5db',
        borderRadius: '0.5rem',
      }}
    >
      {children}
    </div>
  );
}
