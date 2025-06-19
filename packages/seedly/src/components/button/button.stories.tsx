import { assignInlineVars } from '@vanilla-extract/dynamic';
import { Check } from 'lucide-react';

import { sys } from '../../styles';
import { argTypesFromRecipe } from '../../utils';
import { Cluster } from '../cluster';

import { Button } from './button';
import { buttonRecipe, buttonVars } from './button.css';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Component/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button label',
  },
  argTypes: {
    ...argTypesFromRecipe(buttonRecipe),

    use: {
      control: false,
    },
  },
  render: (args) => (
    <Cluster spacing={4}>
      <Button {...args} />
      <Button {...args} disabled />
    </Cluster>
  ),
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Plain: Story = {
  args: {
    variant: 'plain',
  },
};

export const WithStartSlot: Story = {
  args: {
    variant: 'plain',
    startSlot: <Check />,
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
  },
};

export const Size: Story = {
  args: {
    variant: 'plain',
  },
  render: (args) => (
    <Cluster spacing={4} align="center">
      <Button size="sm" {...args} />
      <Button size="md" {...args} />
      <Button size="lg" {...args} />
    </Cluster>
  ),
};

export const Inlined: Story = {
  render: (args) => (
    <Cluster spacing={4} align="center">
      <Button variant="plain" {...args} />
      <Button variant="outline" {...args} />
      <Button variant="ghost" {...args} />
      <Button variant="link" {...args} />
    </Cluster>
  ),
};

export const InlinedDisabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <Cluster spacing={4} align="center">
      <Button variant="plain" {...args} />
      <Button variant="outline" {...args} />
      <Button variant="ghost" {...args} />
      <Button variant="link" {...args} />
    </Cluster>
  ),
};

export const GlobalOverrides: Story = {
  render: (args) => (
    <Cluster spacing={4} align="center">
      <Button
        variant="plain"
        {...args}
        style={assignInlineVars({
          [buttonVars.borderRadius]: sys.shape.corner.rounded,
          [buttonVars.textTransform]: 'uppercase',
        })}
      />
    </Cluster>
  ),
};
