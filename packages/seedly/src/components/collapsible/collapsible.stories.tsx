import { CollapsibleProps } from '@radix-ui/react-collapsible';
import { Meta, StoryObj } from '@storybook/react-vite';

import { Box } from '../box';
import { Button } from '../button';
import { Stack } from '../stack';
import { Text } from '../text';

import {
  Collapsible as CollapsibleRoot,
  CollapsibleTrigger,
} from './collapsible';
import { CollapsibleContent } from './collapsible-content';

type CollapsibleStoryArgs = Pick<
  CollapsibleProps,
  'defaultOpen' | 'open' | 'onOpenChange' | 'disabled'
> & {
  forceMount?: boolean;
};

const defaultChildren = (
  <Box spacing={4}>
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam porta
      lacus eget eget sed tempus. Voluptate quis minim deserunt est qui id. Sit
      laboris irure reprehenderit. Nullam porta lacus eget eget sed tempus.
      Voluptate quis minim deserunt est qui id. Sit laboris irure reprehenderit.
      Nullam porta lacus eget eget sed tempus. Voluptate quis minim deserunt est
      qui id. Sit laboris irure reprehenderit. Nullam porta lacus eget eget sed
      tempus. Voluptate quis minim deserunt est qui id. Sit laboris irure
      reprehenderit. Nullam porta lacus eget eget sed tempus. Voluptate quis
      minim deserunt est qui id. Sit laboris irure reprehenderit. Nullam porta
      lacus eget eget sed tempus. Voluptate quis minim deserunt est qui id. Sit
      laboris irure reprehenderit. Nullam porta lacus eget eget sed tempus.
      Voluptate quis minim deserunt est qui id. Sit laboris irure reprehenderit.
    </Text>
  </Box>
);

function Collapsible({
  defaultOpen = false,
  open,
  onOpenChange,
  disabled,
  forceMount = false,
}: CollapsibleStoryArgs) {
  return (
    <CollapsibleRoot
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
      disabled={disabled}
    >
      <Stack align="stretch">
        <CollapsibleTrigger asChild>
          <Button variant="plain">{'Toggle details'}</Button>
        </CollapsibleTrigger>
        <CollapsibleContent forceMount={forceMount ? true : undefined}>
          {defaultChildren}
        </CollapsibleContent>
      </Stack>
    </CollapsibleRoot>
  );
}

const meta = {
  title: 'Component/Collapsible',
  component: Collapsible,
  subcomponents: {
    CollapsibleContent,
    CollapsibleTrigger,
  },
  tags: ['autodocs'],
  args: {
    defaultOpen: false,
    disabled: false,
    forceMount: false,
  },
  argTypes: {
    onOpenChange: {
      action: 'onOpenChange',
    },
  },
} satisfies Meta<typeof Collapsible>;

export default meta;

type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {};

export const Open: Story = {
  args: {
    defaultOpen: true,
  },
};
