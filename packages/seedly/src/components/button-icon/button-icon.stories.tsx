import { assignInlineVars } from '@vanilla-extract/dynamic';

import { sys } from '../../styles';
import { argTypesFromRecipe } from '../../utils';
import { Button } from '../button/button';
import { buttonVars } from '../button/button.css';
import { Cluster } from '../cluster';

import { ButtonIcon } from './button-icon';
import { buttonIcon } from './button-icon.css';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Component/ButtonIcon',
  component: ButtonIcon,
  tags: ['autodocs'],
  args: {
    children: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <line x1="4" x2="20" y1="12" y2="12"></line>
        <line x1="4" x2="20" y1="6" y2="6"></line>
        <line x1="4" x2="20" y1="18" y2="18"></line>
      </svg>
    ),
  },
  argTypes: {
    ...argTypesFromRecipe(buttonIcon),

    use: {
      control: false,
    },
  },
  render: (args) => (
    <Cluster spacing={4}>
      <ButtonIcon {...args} />
      <ButtonIcon {...args} disabled />
    </Cluster>
  ),
} satisfies Meta<typeof ButtonIcon>;

export default meta;

type Story = StoryObj<typeof ButtonIcon>;

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
};

export const Plain: Story = {
  args: {
    variant: 'plain',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
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
      <Cluster spacing={1} align="center">
        <ButtonIcon size="sm" {...args} />
        <Button Icon size="sm" variant="plain">
          {'Button label'}
        </Button>
      </Cluster>
      <Cluster spacing={1} align="center">
        <ButtonIcon size="md" {...args} />
        <Button Icon size="md" variant="plain">
          {'Button label'}
        </Button>
      </Cluster>
      <Cluster spacing={1} align="center">
        <ButtonIcon size="lg" {...args} />
        <Button Icon size="lg" variant="plain">
          {'Button label'}
        </Button>
      </Cluster>
    </Cluster>
  ),
};

export const Inlined: Story = {
  render: (args) => (
    <Cluster spacing={4} align="center">
      <ButtonIcon variant="plain" {...args} />
      <ButtonIcon variant="outline" {...args} />
      <ButtonIcon variant="ghost" {...args} />
      <ButtonIcon variant="link" {...args} />
    </Cluster>
  ),
};

export const InlinedDisabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <Cluster spacing={4} align="center">
      <ButtonIcon variant="plain" {...args} />
      <ButtonIcon variant="outline" {...args} />
      <ButtonIcon variant="ghost" {...args} />
      <ButtonIcon variant="link" {...args} />
    </Cluster>
  ),
};

export const GlobalOverrides: Story = {
  render: (args) => (
    <Cluster spacing={4} align="center">
      <ButtonIcon
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
