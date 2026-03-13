import { Button } from '../button';

import { Cluster as SeedlyCluster } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Layout/Cluster',
  component: SeedlyCluster,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    spacing: 4,
    justify: 'spaceBetween',
    align: 'center',
    direction: 'row',
  },
  argTypes: {
    spacing: {
      control: {
        type: 'select',
      },
      options: [0, 2, 4, 6, 8, 10, 12],
    },
    justify: {
      control: {
        type: 'select',
      },
      options: ['start', 'center', 'end', 'spaceBetween', 'spaceAround'],
    },
    align: {
      control: {
        type: 'select',
      },
      options: ['start', 'center', 'end', 'baseline', 'stretch'],
    },
    direction: {
      control: {
        type: 'inline-radio',
      },
      options: ['row', 'rowReverse'],
    },
  },
} satisfies Meta<typeof SeedlyCluster>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ spacing, justify, align, direction }) => (
    <SeedlyCluster
      spacing={spacing}
      justify={justify}
      align={align}
      direction={direction}
    >
      <Button type="button" variant="outline" tone="neutral">
        Back
      </Button>
      <Button type="button" variant="outline" tone="neutral">
        Save draft
      </Button>
      <Button type="button">Publish</Button>
    </SeedlyCluster>
  ),
};
