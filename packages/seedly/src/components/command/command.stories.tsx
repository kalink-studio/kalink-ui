import {
  Calculator,
  Calendar,
  Check,
  Delete,
  Search,
  Smile,
} from 'lucide-react';
import { useState } from 'react';

import { CommonArgs, commonArgs } from '../../utils';
import { Box } from '../box';
import { Button } from '../button';
import { Cluster } from '../cluster';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';

import { Command } from './command';
import { CommandEmpty } from './command-empty';
import { CommandGroup } from './command-group';
import { CommandInput } from './command-input';
import { CommandItem } from './command-item';
import { CommandList } from './command-list';
import { CommandSeparator } from './command-separator';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Command',
  parameters: {
    layout: 'centered',
  },
  component: Command,
  args: {},
  argTypes: {
    ...commonArgs([CommonArgs.COMPOSABLE, CommonArgs.STYLABLE]),
  },
} satisfies Meta<typeof Command>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Box variant="outline">
      <CommandComponent />
    </Box>
  ),
};

export const InPopover: Story = {
  render: () => <PopoverStory />,
};

const PopoverStory = () => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button>{'Open'}</Button>
        </PopoverTrigger>
        <PopoverContent container={portalRoot}>
          <CommandComponent />
        </PopoverContent>
      </Popover>

      <div ref={setPortalRoot} id="portal-root"></div>
    </>
  );
};

const CommandComponent = () => (
  <Command>
    <CommandInput placeholder="Search for..." icon={<Search />} />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem icon={Calendar}>Calendar</CommandItem>
        <CommandItem icon={Smile} disabled>
          Search Emoji
        </CommandItem>
        <CommandItem icon={Calculator}>Calculator</CommandItem>
      </CommandGroup>
      <CommandSeparator offset={false} />
      <CommandGroup heading="Settings">
        <CommandItem>Profile</CommandItem>
        <CommandItem>
          <Cluster justify="spaceBetween">
            <span>Billing</span>
            <Check size={16} />
          </Cluster>
        </CommandItem>
        <CommandItem>Settings</CommandItem>
      </CommandGroup>
      <CommandSeparator offset />
      <CommandItem icon={Delete}>Delete</CommandItem>
    </CommandList>
  </Command>
);
