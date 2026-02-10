import * as styles from '@kalink-ui/seedly/components/menubar';
import * as React from 'react';

import { Menu } from '../menu';

import { Menubar } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';

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
      <Menu.Root>
        <Menu.Trigger className={styles.menuTrigger}>File</Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner
            className={styles.menuPositioner}
            sideOffset={6}
            alignOffset={-2}
          >
            <Menu.Popup className={styles.menuPopup}>
              <Menu.Item className={styles.menuItem} onClick={handleClick}>
                New
              </Menu.Item>
              <Menu.Item className={styles.menuItem} onClick={handleClick}>
                Open
              </Menu.Item>
              <Menu.Item className={styles.menuItem} onClick={handleClick}>
                Save
              </Menu.Item>

              <Menu.SubmenuRoot>
                <Menu.SubmenuTrigger className={styles.menuItem}>
                  Export
                  <ChevronRightIcon />
                </Menu.SubmenuTrigger>
                <Menu.Portal>
                  <Menu.Positioner alignOffset={-4}>
                    <Menu.Popup className={styles.menuPopup}>
                      <Menu.Item
                        className={styles.menuItem}
                        onClick={handleClick}
                      >
                        PDF
                      </Menu.Item>
                      <Menu.Item
                        className={styles.menuItem}
                        onClick={handleClick}
                      >
                        PNG
                      </Menu.Item>
                      <Menu.Item
                        className={styles.menuItem}
                        onClick={handleClick}
                      >
                        SVG
                      </Menu.Item>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.SubmenuRoot>

              <Menu.Separator className={styles.menuSeparator} />
              <Menu.Item className={styles.menuItem} onClick={handleClick}>
                Print
              </Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      <Menu.Root>
        <Menu.Trigger className={styles.menuTrigger}>Edit</Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner className={styles.menuPositioner} sideOffset={6}>
            <Menu.Popup className={styles.menuPopup}>
              <Menu.Item className={styles.menuItem} onClick={handleClick}>
                Cut
              </Menu.Item>
              <Menu.Item className={styles.menuItem} onClick={handleClick}>
                Copy
              </Menu.Item>
              <Menu.Item className={styles.menuItem} onClick={handleClick}>
                Paste
              </Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      <Menu.Root>
        <Menu.Trigger className={styles.menuTrigger}>View</Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner className={styles.menuPositioner} sideOffset={6}>
            <Menu.Popup className={styles.menuPopup}>
              <Menu.Item className={styles.menuItem} onClick={handleClick}>
                Zoom In
              </Menu.Item>
              <Menu.Item className={styles.menuItem} onClick={handleClick}>
                Zoom Out
              </Menu.Item>

              <Menu.SubmenuRoot>
                <Menu.SubmenuTrigger className={styles.menuItem}>
                  Layout
                  <ChevronRightIcon />
                </Menu.SubmenuTrigger>
                <Menu.Portal>
                  <Menu.Positioner alignOffset={-4}>
                    <Menu.Popup className={styles.menuPopup}>
                      <Menu.Item
                        className={styles.menuItem}
                        onClick={handleClick}
                      >
                        Single Page
                      </Menu.Item>
                      <Menu.Item
                        className={styles.menuItem}
                        onClick={handleClick}
                      >
                        Two Pages
                      </Menu.Item>
                      <Menu.Item
                        className={styles.menuItem}
                        onClick={handleClick}
                      >
                        Continuous
                      </Menu.Item>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.SubmenuRoot>

              <Menu.Separator className={styles.menuSeparator} />
              <Menu.Item className={styles.menuItem} onClick={handleClick}>
                Full Screen
              </Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>

      <Menu.Root disabled>
        <Menu.Trigger className={styles.menuTrigger}>Help</Menu.Trigger>
      </Menu.Root>
    </Menubar>
  );
}

function handleClick(event: React.MouseEvent<HTMLElement>) {
  console.log(`${event.currentTarget.textContent} clicked`);
}

function ChevronRightIcon(props: React.ComponentProps<'svg'>) {
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
