import { expect, userEvent, within } from 'storybook/test';

import { Grid, GridChild } from '../grid';
import { Text } from '../text';

import { NavigationMenu } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';

const meta = {
  title: 'Components/Navigation Menu',
  component: NavigationMenu.Root,
  tags: ['autodocs'],
  parameters: {
    a11y: {
      context: {
        include: ['body'],
        // exclude: ['[data-base-ui-focus-guard]'],
      },
    },
  },
} satisfies Meta<typeof NavigationMenu.Root>;

export default meta;

type Story = StoryObj<typeof NavigationMenu.Root>;

export const Default: Story = {
  render: () => <Example />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const overviewTrigger = canvas.getByRole('button', { name: /overview/i });
    await userEvent.click(overviewTrigger);
    await expect(overviewTrigger).toBeInTheDocument();
  },
};

function Example() {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>
            Overview
            <NavigationMenu.Icon>
              <ChevronDownIcon />
            </NavigationMenu.Icon>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <LinkList links={overviewLinks} columns={2} aria-label="Overview" />
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger>
            Handbook
            <NavigationMenu.Icon>
              <ChevronDownIcon />
            </NavigationMenu.Icon>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <LinkList links={handbookLinks} columns={1} aria-label="Handbook" />
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.TriggerLink href="https://github.com/mui/base-ui">
            GitHub
          </NavigationMenu.TriggerLink>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <NavigationMenu.Portal>
        <NavigationMenu.Positioner
          sideOffset={10}
          collisionPadding={{ top: 5, bottom: 5, left: 20, right: 20 }}
          collisionAvoidance={{ side: 'none' }}
        >
          <NavigationMenu.Popup>
            <NavigationMenu.Arrow />
            <NavigationMenu.Viewport />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Root>
  );
}

function LinkList({
  links,
  columns,
  ...props
}: {
  links: readonly LinkData[];
  columns: 1 | 2;
  'aria-label': string;
}) {
  return (
    <nav {...props}>
      <Grid role="list" columns={columns === 2 ? { xs: 1, sm: 2 } : 1}>
        {links.map((item) => (
          <GridChild key={item.href} role="listitem">
            <NavigationMenu.Link href={item.href}>
              <Text render={<div />} variant="title" size="medium">
                {item.title}
              </Text>
              <Text render={<div />}>{item.description}</Text>
            </NavigationMenu.Link>
          </GridChild>
        ))}
      </Grid>
    </nav>
  );
}

function ChevronDownIcon(props: ComponentProps<'svg'>) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" {...props}>
      <path d="M1 3.5L5 7.5L9 3.5" stroke="currentcolor" strokeWidth="1.5" />
    </svg>
  );
}

interface LinkData {
  href: string;
  title: string;
  description: string;
}

const overviewLinks = [
  {
    href: '/react/overview/quick-start',
    title: 'Quick Start',
    description: 'Install and assemble your first component.',
  },
  {
    href: '/react/overview/accessibility',
    title: 'Accessibility',
    description: 'Learn how we build accessible components.',
  },
  {
    href: '/react/overview/releases',
    title: 'Releases',
    description: 'See what is new in the latest Base UI versions.',
  },
  {
    href: '/react/overview/about',
    title: 'About',
    description: 'Learn more about Base UI and our mission.',
  },
] as const;

const handbookLinks = [
  {
    href: '/react/handbook/styling',
    title: 'Styling',
    description:
      'Base UI components can be styled with plain CSS, Tailwind CSS, CSS-in-JS, or CSS Modules.',
  },
  {
    href: '/react/handbook/animation',
    title: 'Animation',
    description:
      'Base UI components can be animated with CSS transitions, CSS animations, or JavaScript libraries.',
  },
  {
    href: '/react/handbook/composition',
    title: 'Composition',
    description:
      'Base UI components can be replaced and composed with your own existing components.',
  },
] as const;
