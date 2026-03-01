import { Container as SeedlyContainer } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Layout/Container',
  component: SeedlyContainer,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
  },
  args: {
    variant: 'solid',
    level: 'high',
    spacing: 6,
    corner: 'medium',
    elevation: 'none',
  },
  argTypes: {
    variant: {
      control: {
        type: 'inline-radio',
      },
      options: ['solid', 'outline', 'bare'],
    },
    level: {
      control: {
        type: 'inline-radio',
      },
      options: ['low', 'base', 'high', 'top'],
    },
    spacing: {
      control: {
        type: 'select',
      },
      options: [0, 2, 4, 6, 8, 10, 12],
    },
    corner: {
      control: {
        type: 'select',
      },
      options: ['none', 'sharp', 'small', 'medium', 'rounded'],
    },
    elevation: {
      control: {
        type: 'select',
      },
      options: ['none', 'minimal', 'low', 'moderate', 'high'],
    },
  },
} satisfies Meta<typeof SeedlyContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ variant, level, spacing, corner, elevation }) => (
    <SeedlyContainer
      variant={variant}
      level={level}
      spacing={spacing}
      corner={corner}
      elevation={elevation}
    >
      <h3 style={{ margin: 0 }}>Performance report</h3>
      <p style={{ margin: '0.75rem 0 0' }}>
        Container is useful for section shells with configurable level and
        visual treatment.
      </p>
    </SeedlyContainer>
  ),
};
