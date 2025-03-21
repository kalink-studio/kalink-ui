import { argTypesFromRecipe } from '../../utils/arg-types';

import { Text } from './text';
import { textRecipe } from './text.css';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Component/Text',
  component: Text,
  tags: ['autodocs'],
  args: {
    children:
      'Commodo nulla nostrud mollit veniam fugiat sunt eu qui est incididunt exercitation. Ullamco tempor nostrud pariatur nostrud ipsum nisi velit occaecat culpa officia ut. Magna dolore officia est. Qui qui sint sint elit cupidatat ea fugiat. Ut ullamco elit laborum consectetur proident. Nisi incididunt veniam amet nulla culpa ullamco tempor ut consequat voluptate consequat Lorem non. Fugiat in quis eu eu ad ad. Lorem laborum qui excepteur.',
    variant: 'body',
    size: 'medium',
  },
  argTypes: {
    ...argTypesFromRecipe(textRecipe),

    use: {
      control: false,
    },
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {};
