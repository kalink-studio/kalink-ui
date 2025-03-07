import { argTypesFromRecipe, CommonArgs, commonArgs } from '@/utils/arg-types';

import { Sidebar } from './sidebar';
import { sidebarRecipe } from './sidebar.css';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Layout/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  args: {
    children: (
      <>
        <div>Sidebar</div>
        <div>Main content</div>
      </>
    ),
  },
  argTypes: {
    ...argTypesFromRecipe(sidebarRecipe),

    ...commonArgs([
      CommonArgs.COMPOSABLE,
      CommonArgs.POLYMORPHIC,
      CommonArgs.STYLABLE,
      CommonArgs.REFERABLE,
    ]),

    sideWidth: {
      table: {
        category: 'Recipe props',
      },
      control: { type: 'range', min: 1, max: 100, step: 1 },
    },

    contentMinWidth: {
      table: {
        category: 'Recipe props',
      },
      control: { type: 'range', min: 1, max: 100, step: 1 },
    },
  },

  render: ({ sideWidth, contentMinWidth, ...args }) => (
    <Sidebar
      {...{
        ...(sideWidth && { sideWidth: `${sideWidth}%` }),
        ...(contentMinWidth && { contentMinWidth: `${contentMinWidth}%` }),
      }}
      {...args}
    />
  ),
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {};
