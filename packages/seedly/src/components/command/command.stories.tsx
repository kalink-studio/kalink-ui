import {
  Calculator,
  Calendar,
  Check,
  Delete,
  Search,
  Smile,
} from 'lucide-react';
import { ComponentPropsWithoutRef, useState } from 'react';

import { CommonArgs, commonArgs, responsiveSelectArg } from '../../utils';
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

import type { Tone } from '../../styles';
import type { Meta, StoryObj } from '@storybook/react-vite';

type StoryArgs = ComponentPropsWithoutRef<typeof Command> & {
  tone?: Tone;
};

const meta: Meta<StoryArgs> = {
  title: 'Component/Command',
  parameters: {
    layout: 'centered',
  },
  component: Command,
  args: {},
  argTypes: {
    ...commonArgs([CommonArgs.COMPOSABLE, CommonArgs.STYLABLE]),
    tone: responsiveSelectArg({
      options: ['neutral', 'primary', 'destructive', 'success'],
      summary: 'Responsive<Tone>',
    }),
  },
};

export default meta;

type Story = StoryObj<StoryArgs>;

export const Default: Story = {
  render: (args) => (
    <Box variant="outline">
      <CommandComponent tone={args.tone} />
    </Box>
  ),
};

export const InPopover: Story = {
  render: (args) => <PopoverStory tone={args.tone} />,
};

const PopoverStory = ({ tone }: Pick<StoryArgs, 'tone'>) => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button>{'Open'}</Button>
        </PopoverTrigger>
        <PopoverContent container={portalRoot}>
          <CommandComponent tone={tone} />
        </PopoverContent>
      </Popover>

      <div ref={setPortalRoot} id="portal-root"></div>
    </>
  );
};

const CommandComponent = ({ tone }: Pick<StoryArgs, 'tone'>) => (
  <Command>
    <CommandInput placeholder="Search for..." icon={<Search />} />
    <CommandList>
      <CommandEmpty tone={tone}>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem icon={Calendar} tone={tone}>
          Calendar
        </CommandItem>
        <CommandItem icon={Smile} disabled tone={tone}>
          Search Emoji
        </CommandItem>
        <CommandItem icon={Calculator} tone={tone}>
          Calculator
        </CommandItem>
      </CommandGroup>
      <CommandSeparator offset={false} />
      <CommandGroup heading="Settings">
        <CommandItem tone={tone}>Profile</CommandItem>
        <CommandItem tone={tone}>
          <Cluster justify="spaceBetween">
            <span>Billing</span>
            <Check size={16} />
          </Cluster>
        </CommandItem>
        <CommandItem tone={tone}>Settings</CommandItem>
      </CommandGroup>
      <CommandSeparator offset />
      <CommandItem icon={Delete} tone={tone}>
        Delete
      </CommandItem>
    </CommandList>
  </Command>
);
