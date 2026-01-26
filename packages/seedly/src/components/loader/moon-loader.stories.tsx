import { argTypesFromRecipe } from '../../utils';

import { loaderRecipe, loaderWrapperRecipe } from './loader.css';
import { MoonLoader } from './moon-loader';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Component/MoonLoader',
  component: MoonLoader,
  tags: ['autodocs'],
  args: {
    active: true,
  },
  argTypes: {
    ...argTypesFromRecipe(loaderRecipe),
    ...argTypesFromRecipe(loaderWrapperRecipe),
  },
} satisfies Meta<typeof MoonLoader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
