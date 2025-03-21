import { argTypesFromRecipe } from '../../utils/arg-types';

import { Heading } from './heading';
import { headingRecipe } from './heading.css';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Component/Heading',
  component: Heading,
  tags: ['autodocs'],
  args: {
    children: 'Ullamco in dolore cupidatat culpa',
    size: 'medium',
    variant: 'display',
  },
  argTypes: {
    ...argTypesFromRecipe(headingRecipe),
  },
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof Heading>;

export const Default: Story = {};
