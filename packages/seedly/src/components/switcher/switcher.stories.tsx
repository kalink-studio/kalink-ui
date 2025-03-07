import { ComponentPropsWithoutRef } from 'react';

import { argTypesFromRecipe, CommonArgs, commonArgs } from '@/utils/arg-types';

import { Switcher } from './switcher';
import { switcherRecipe } from './switcher.css';

import type { Meta, StoryObj } from '@storybook/react';

type StoryArgs = ComponentPropsWithoutRef<typeof Switcher> & {
  childCount: number;
};

const meta = {
  title: 'Layout/Switcher',
  component: Switcher,
  tags: ['autodocs'],
  argTypes: {
    ...argTypesFromRecipe(switcherRecipe),

    ...commonArgs([
      CommonArgs.COMPOSABLE,
      CommonArgs.POLYMORPHIC,
      CommonArgs.STYLABLE,
      CommonArgs.REFERABLE,
    ]),

    threshold: {
      table: {
        category: 'Recipe props',
      },
    },

    limit: {
      table: {
        category: 'Recipe props',
      },
    },

    childCount: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
      table: {
        category: 'Story args',
      },
    },
  },

  args: {
    childCount: 4,
  },
  render: ({ childCount, ...args }) => {
    return (
      <Switcher {...args}>
        {new Array(childCount).fill('').map((_, index) => (
          <div key={index}>{`Block ${index + 1}`}</div>
        ))}
      </Switcher>
    );
  },
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Default: Story = {};
