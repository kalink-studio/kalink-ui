import { expect, userEvent, within } from 'storybook/test';

import { Menu } from '../menu';

import { Menubar } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps, MouseEvent } from 'react';

const meta = {
  title: 'Components/Menubar',
  component: Menubar,
  tags: ['autodocs'],
} satisfies Meta<typeof Menubar>;

export default meta;

type Story = StoryObj<typeof Menubar>;

export const Default: Story = {
  render: () => <Example />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const fileTrigger = canvas.getByRole('menuitem', { name: /file/i });
    await userEvent.click(fileTrigger);

    const body = within(canvasElement.ownerDocument.body);
    const openItem = await body.findByRole('menuitem', { name: 'Open' });
    await expect(openItem).toBeInTheDocument();
    await userEvent.click(openItem);
  },
};

function Example() {
  return (
    <Menubar>
      <Menu.Root>
        <Menu.Trigger variant="ghost">
          File
          <Menu.TriggerIcon>
            <ChevronDownIcon />
          </Menu.TriggerIcon>
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner sideOffset={6} alignOffset={-2}>
            <Menu.Popup>
              <Menu.Item onClick={handleClick}>New</Menu.Item>
              <Menu.Item onClick={handleClick}>Open</Menu.Item>
              <Menu.Item onClick={handleClick}>Save</Menu.Item>

              <Menu.SubmenuRoot>
                <Menu.SubmenuTrigger>
                  Export
                  <ChevronRightIcon />
                </Menu.SubmenuTrigger>
                <Menu.Portal>
                  <Menu.Positioner alignOffset={-4}>
                    <Menu.Popup>
                      <Menu.Item onClick={handleClick}>PDF</Menu.Item>
                      <Menu.Item onClick={handleClick}>PNG</Menu.Item>
                      <Menu.Item onClick={handleClick}>SVG</Menu.Item>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.SubmenuRoot>

              <Menu.Separator />
              <Menu.Item onClick={handleClick}>Print</Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      <Menu.Root>
        <Menu.Trigger variant="ghost">
          Edit
          <Menu.TriggerIcon>
            <ChevronDownIcon />
          </Menu.TriggerIcon>
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner sideOffset={6}>
            <Menu.Popup>
              <Menu.Item onClick={handleClick}>Cut</Menu.Item>
              <Menu.Item onClick={handleClick}>Copy</Menu.Item>
              <Menu.Item onClick={handleClick}>Paste</Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      <Menu.Root>
        <Menu.Trigger variant="ghost">
          View
          <Menu.TriggerIcon>
            <ChevronDownIcon />
          </Menu.TriggerIcon>
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner sideOffset={6}>
            <Menu.Popup>
              <Menu.Item onClick={handleClick}>Zoom In</Menu.Item>
              <Menu.Item onClick={handleClick}>Zoom Out</Menu.Item>

              <Menu.SubmenuRoot>
                <Menu.SubmenuTrigger>
                  Layout
                  <ChevronRightIcon />
                </Menu.SubmenuTrigger>
                <Menu.Portal>
                  <Menu.Positioner alignOffset={-4}>
                    <Menu.Popup>
                      <Menu.Item onClick={handleClick}>Single Page</Menu.Item>
                      <Menu.Item onClick={handleClick}>Two Pages</Menu.Item>
                      <Menu.Item onClick={handleClick}>Continuous</Menu.Item>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.SubmenuRoot>

              <Menu.Separator />
              <Menu.Item onClick={handleClick}>Full Screen</Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      <Menu.Root disabled>
        <Menu.Trigger variant="ghost">
          Help
          <Menu.TriggerIcon>
            <ChevronDownIcon />
          </Menu.TriggerIcon>
        </Menu.Trigger>
      </Menu.Root>
    </Menubar>
  );
}

function handleClick(event: MouseEvent<HTMLElement>) {
  console.log(`${event.currentTarget.textContent} clicked`);
}

function ChevronRightIcon(props: ComponentProps<'svg'>) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
      <path
        d="M6 12L10 8L6 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDownIcon(props: ComponentProps<'svg'>) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" {...props}>
      <path d="M1 3.5L5 7.5L9 3.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
