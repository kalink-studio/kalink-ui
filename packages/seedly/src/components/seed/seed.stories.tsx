import {
  sprinkles,
  sprinklesProps,
} from '../../../.storybook/theme/sprinkles.css';
import {
  CommonArgs,
  commonArgs,
  argTypesFromSprinkles,
} from '../../utils/arg-types';

import { plantSeed, withSeed } from './seed';

import type { Meta, StoryObj } from '@storybook/react-vite';

const Sprout = plantSeed({ sprinkles });

const meta = {
  title: 'Styles/Sprout',
  component: Sprout,
  tags: ['autodocs'],
  args: {
    children: 'Box content',
  },
  argTypes: {
    ...argTypesFromSprinkles({ props: sprinklesProps }),

    ...commonArgs([
      CommonArgs.COMPOSABLE,
      CommonArgs.POLYMORPHIC,
      CommonArgs.STYLABLE,
      CommonArgs.REFERABLE,
    ]),
  },
} satisfies Meta<typeof Sprout>;

export default meta;

type Story = StoryObj<typeof Sprout>;

export const Default: Story = {};

export const WithSprinklesProps: Story = {
  args: {
    padding: 'medium',
    backgroundColor: 'tonePrimary',
    color: 'onPrimary',
    textAlign: 'center',
  },
};

export const UseElement: Story = {
  args: {
    use: 'h1',
  },
};

// Test withSeed HOC
const BaseButton = ({
  className,
  ...props
}: React.ComponentPropsWithRef<'button'>) => (
  <button className={className} {...props} />
);

const EnhancedButton = withSeed({ sprinkles })(BaseButton);

export const WithSeedHOC: Story = {
  render: () => (
    <EnhancedButton
      padding="medium"
      backgroundColor="tonePrimary"
      color="onPrimary"
    >
      Enhanced with withSeed
    </EnhancedButton>
  ),
};
