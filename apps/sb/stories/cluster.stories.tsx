import { Cluster, clusterRecipe } from '@kalink/ui/cluster';

import { argTypesFromRecipe, CommonArgs, commonArgs } from '@/utils/arg-types';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Layout/Cluster',
  component: Cluster,
  args: {
    children: (
      <>
        <div>Cluster element one</div>
        <div>Cluster element two</div>
        <div>Cluster element three</div>
      </>
    ),
  },
  argTypes: {
    ...argTypesFromRecipe(clusterRecipe),

    ...commonArgs([
      CommonArgs.COMPOSABLE,
      CommonArgs.POLYMORPHIC,
      CommonArgs.STYLABLE,
      CommonArgs.REFERABLE,
    ]),
  },
} satisfies Meta<typeof Cluster>;

export default meta;

type Story = StoryObj<typeof Cluster>;

export const Default: Story = {};
