import { Menubar, MenubarMenu } from '.';

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
};

function Example() {
  return (
    <Menubar>
      <MenubarMenu.Root>
        <MenubarMenu.Trigger variant="ghost">
          File
          <MenubarMenu.TriggerIcon>
            <ChevronDownIcon />
          </MenubarMenu.TriggerIcon>
        </MenubarMenu.Trigger>
        <MenubarMenu.Portal>
          <MenubarMenu.Positioner sideOffset={6} alignOffset={-2}>
            <MenubarMenu.Popup>
              <MenubarMenu.Item onClick={handleClick}>New</MenubarMenu.Item>
              <MenubarMenu.Item onClick={handleClick}>Open</MenubarMenu.Item>
              <MenubarMenu.Item onClick={handleClick}>Save</MenubarMenu.Item>

              <MenubarMenu.SubmenuRoot>
                <MenubarMenu.SubmenuTrigger>
                  Export
                  <ChevronRightIcon />
                </MenubarMenu.SubmenuTrigger>
                <MenubarMenu.Portal>
                  <MenubarMenu.Positioner alignOffset={-4}>
                    <MenubarMenu.Popup>
                      <MenubarMenu.Item onClick={handleClick}>
                        PDF
                      </MenubarMenu.Item>
                      <MenubarMenu.Item onClick={handleClick}>
                        PNG
                      </MenubarMenu.Item>
                      <MenubarMenu.Item onClick={handleClick}>
                        SVG
                      </MenubarMenu.Item>
                    </MenubarMenu.Popup>
                  </MenubarMenu.Positioner>
                </MenubarMenu.Portal>
              </MenubarMenu.SubmenuRoot>

              <MenubarMenu.Separator />
              <MenubarMenu.Item onClick={handleClick}>Print</MenubarMenu.Item>
            </MenubarMenu.Popup>
          </MenubarMenu.Positioner>
        </MenubarMenu.Portal>
      </MenubarMenu.Root>

      <MenubarMenu.Root>
        <MenubarMenu.Trigger variant="ghost">
          Edit
          <MenubarMenu.TriggerIcon>
            <ChevronDownIcon />
          </MenubarMenu.TriggerIcon>
        </MenubarMenu.Trigger>
        <MenubarMenu.Portal>
          <MenubarMenu.Positioner sideOffset={6}>
            <MenubarMenu.Popup>
              <MenubarMenu.Item onClick={handleClick}>Cut</MenubarMenu.Item>
              <MenubarMenu.Item onClick={handleClick}>Copy</MenubarMenu.Item>
              <MenubarMenu.Item onClick={handleClick}>Paste</MenubarMenu.Item>
            </MenubarMenu.Popup>
          </MenubarMenu.Positioner>
        </MenubarMenu.Portal>
      </MenubarMenu.Root>

      <MenubarMenu.Root>
        <MenubarMenu.Trigger variant="ghost">
          View
          <MenubarMenu.TriggerIcon>
            <ChevronDownIcon />
          </MenubarMenu.TriggerIcon>
        </MenubarMenu.Trigger>
        <MenubarMenu.Portal>
          <MenubarMenu.Positioner sideOffset={6}>
            <MenubarMenu.Popup>
              <MenubarMenu.Item onClick={handleClick}>Zoom In</MenubarMenu.Item>
              <MenubarMenu.Item onClick={handleClick}>
                Zoom Out
              </MenubarMenu.Item>

              <MenubarMenu.SubmenuRoot>
                <MenubarMenu.SubmenuTrigger>
                  Layout
                  <ChevronRightIcon />
                </MenubarMenu.SubmenuTrigger>
                <MenubarMenu.Portal>
                  <MenubarMenu.Positioner alignOffset={-4}>
                    <MenubarMenu.Popup>
                      <MenubarMenu.Item onClick={handleClick}>
                        Single Page
                      </MenubarMenu.Item>
                      <MenubarMenu.Item onClick={handleClick}>
                        Two Pages
                      </MenubarMenu.Item>
                      <MenubarMenu.Item onClick={handleClick}>
                        Continuous
                      </MenubarMenu.Item>
                    </MenubarMenu.Popup>
                  </MenubarMenu.Positioner>
                </MenubarMenu.Portal>
              </MenubarMenu.SubmenuRoot>

              <MenubarMenu.Separator />
              <MenubarMenu.Item onClick={handleClick}>
                Full Screen
              </MenubarMenu.Item>
            </MenubarMenu.Popup>
          </MenubarMenu.Positioner>
        </MenubarMenu.Portal>
      </MenubarMenu.Root>

      <MenubarMenu.Root disabled>
        <MenubarMenu.Trigger variant="ghost">
          Help
          <MenubarMenu.TriggerIcon>
            <ChevronDownIcon />
          </MenubarMenu.TriggerIcon>
        </MenubarMenu.Trigger>
      </MenubarMenu.Root>
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
