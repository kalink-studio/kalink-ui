import {
  argTypesFromRecipe,
  CommonArgs,
  commonArgs,
} from '../../utils/arg-types';

import { Frame } from './frame';
import { frameRecipe } from './frame.css';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Layout/Frame',
  component: Frame,
  tags: ['autodocs'],
  argTypes: {
    ...argTypesFromRecipe(frameRecipe),

    ...commonArgs([
      CommonArgs.COMPOSABLE,
      CommonArgs.POLYMORPHIC,
      CommonArgs.STYLABLE,
      CommonArgs.REFERABLE,
    ]),
  },
  args: {
    ratio: '16:9',

    children: <img src="https://picsum.photos/seed/picsum/2000/2000" />,
  },
} satisfies Meta<typeof Frame>;

export default meta;

type Story = StoryObj<typeof Frame>;

export const Default: Story = {};
