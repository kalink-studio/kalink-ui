import {
  argTypesFromRecipe,
  CommonArgs,
  commonArgs,
} from '../../utils/arg-types';

import { Stack } from './stack';
import { stackRecipe } from './stack.css';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Layout/Stack',
  component: Stack,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    children: (
      <>
        <div>Stack element one</div>
        <div>Stack element two</div>
        <div>Stack element three</div>
      </>
    ),
  },
  argTypes: {
    ...argTypesFromRecipe(stackRecipe),

    ...commonArgs([
      CommonArgs.COMPOSABLE,
      CommonArgs.POLYMORPHIC,
      CommonArgs.STYLABLE,
      CommonArgs.REFERABLE,
    ]),
  },
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof Stack>;

export const Default: Story = {};

export const Nested: Story = {
  args: {
    recursive: true,
    spacing: 4,
    children: (
      <>
        <div>Stack element one</div>
        <div>
          <div>Stack element two</div>
          <div>Stack element three</div>
        </div>
        <div>Stack element four</div>
      </>
    ),
  },
};

export const AsList: Story = {
  args: {
    spacing: 4,
    use: 'ol',
    children: (
      <>
        <li>Stack element one</li>
        <li>Stack element two</li>
        <li>Stack element three</li>
        <li>Stack element four</li>
      </>
    ),
  },
};
