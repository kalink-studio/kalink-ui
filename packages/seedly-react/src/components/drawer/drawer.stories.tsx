import { sys } from '@kalink-ui/seedly';
import {
  dragArea,
  drawerVars,
  handle as handleClassName,
  scrollArea,
} from '@kalink-ui/seedly/components/drawer';
import * as React from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { Drawer, type DrawerSnapPoint } from '.';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';

const meta = {
  title: 'Components/Drawer',
  component: Drawer.Root,
  tags: ['autodocs'],
} satisfies Meta<typeof Drawer.Root>;

export default meta;

type Story = StoryObj<typeof Drawer.Root>;

export const RightDrawer: Story = {
  render: () => <SideDrawerExample direction="right" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /view activity/i });
    await userEvent.click(trigger);

    const body = within(canvasElement.ownerDocument.body);
    const title = await body.findByRole('heading', { name: /activity/i });
    await expect(title).toBeInTheDocument();

    const closeButton = await body.findByRole('button', { name: /close/i });
    await userEvent.click(closeButton);
  },
};

export const LeftDrawer: Story = {
  render: () => <SideDrawerExample direction="left" />,
};

export const BottomSheet: Story = {
  render: () => (
    <VerticalDrawerExample direction="down" title="Notifications" />
  ),
};

export const TopSheet: Story = {
  render: () => <VerticalDrawerExample direction="up" title="Filters" />,
};

export const SnapPoints: Story = {
  render: () => <SnapPointExample />,
};

export const NestedDrawers: Story = {
  render: () => <NestedDrawerExample />,
};

export const IndentEffect: Story = {
  render: () => <IndentExample />,
};

export const DetachedTrigger: Story = {
  render: () => <DetachedTriggerExample />,
};

function SideDrawerExample({ direction }: { direction: 'left' | 'right' }) {
  return (
    <Drawer.Root swipeDirection={direction}>
      <Drawer.Trigger>View activity</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop />
        <Drawer.Viewport>
          <Drawer.Popup>
            <Drawer.Content>
              <Drawer.Title>Activity</Drawer.Title>
              <Drawer.Description>
                Review recent updates without leaving the current page context.
              </Drawer.Description>
              <Drawer.Actions>
                <Drawer.Close>Close</Drawer.Close>
              </Drawer.Actions>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

function VerticalDrawerExample({
  direction,
  title,
}: {
  direction: 'down' | 'up';
  title: string;
}) {
  return (
    <Drawer.Root swipeDirection={direction}>
      <Drawer.Trigger>
        {direction === 'down' ? 'Open sheet' : 'Open top sheet'}
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop />
        <Drawer.Viewport>
          <Drawer.Popup>
            <div className={dragArea}>
              <div className={handleClassName} />
            </div>
            <Drawer.Content>
              <Drawer.Title>{title}</Drawer.Title>
              <Drawer.Description>
                You can swipe this drawer away, or interact with its content
                directly.
              </Drawer.Description>
              <Drawer.Actions>
                <Drawer.Close>Close</Drawer.Close>
              </Drawer.Actions>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

function SnapPointExample() {
  const snapPoints = React.useMemo<DrawerSnapPoint[]>(() => ['18rem', 1], []);
  const popupStyle = React.useMemo(
    () =>
      ({
        [drawerVars.layout.popupVerticalTopMargin]: '1rem',
      }) satisfies CSSProperties,
    [],
  );

  return (
    <Drawer.Root snapPoints={snapPoints}>
      <Drawer.Trigger>Open snap drawer</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop />
        <Drawer.Viewport>
          <Drawer.Popup style={popupStyle}>
            <div className={dragArea}>
              <div className={handleClassName} />
              <Drawer.Title>Snap points</Drawer.Title>
            </div>
            <div className={scrollArea}>
              <Drawer.Description>
                Drag between a compact preview and a near full-height sheet.
              </Drawer.Description>
              <div aria-hidden style={snapListStyle}>
                {Array.from({ length: 12 }, (_, index) => (
                  <div key={index} style={snapItemStyle} />
                ))}
              </div>
              <Drawer.Actions>
                <Drawer.Close>Close</Drawer.Close>
              </Drawer.Actions>
            </div>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

function NestedDrawerExample() {
  const [firstOpen, setFirstOpen] = React.useState(false);
  const [secondOpen, setSecondOpen] = React.useState(false);

  return (
    <Drawer.Root
      open={firstOpen}
      onOpenChange={(open) => {
        setFirstOpen(open);

        if (!open) {
          setSecondOpen(false);
        }
      }}
    >
      <Drawer.Trigger>Open drawer stack</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop />
        <Drawer.Viewport>
          <Drawer.Popup>
            <div className={dragArea}>
              <div className={handleClassName} />
            </div>
            <Drawer.Content>
              <Drawer.Title>Account</Drawer.Title>
              <Drawer.Description>
                Nested drawers can stack while each sheet remains independently
                focus managed.
              </Drawer.Description>

              <Drawer.Actions>
                <Drawer.Root open={secondOpen} onOpenChange={setSecondOpen}>
                  <Drawer.Trigger>Security settings</Drawer.Trigger>
                  <Drawer.Portal>
                    <Drawer.Viewport>
                      <Drawer.Popup>
                        <div className={dragArea}>
                          <div className={handleClassName} />
                        </div>
                        <Drawer.Content>
                          <Drawer.Title>Security</Drawer.Title>
                          <Drawer.Description>
                            Review sign-in activity and update your security
                            preferences.
                          </Drawer.Description>
                          <Drawer.Actions>
                            <Drawer.Close>Done</Drawer.Close>
                          </Drawer.Actions>
                        </Drawer.Content>
                      </Drawer.Popup>
                    </Drawer.Viewport>
                  </Drawer.Portal>
                </Drawer.Root>

                <Drawer.Close>Close</Drawer.Close>
              </Drawer.Actions>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

function IndentExample() {
  return (
    <div style={indentRootStyle}>
      <Drawer.Provider>
        <Drawer.IndentBackground />
        <Drawer.Indent>
          <div style={indentCenterStyle}>
            <Drawer.Root>
              <Drawer.Trigger>Open indented sheet</Drawer.Trigger>
              <Drawer.Portal>
                <Drawer.Backdrop />
                <Drawer.Viewport>
                  <Drawer.Popup>
                    <div className={dragArea}>
                      <div className={handleClassName} />
                    </div>
                    <Drawer.Content>
                      <Drawer.Title>Notifications</Drawer.Title>
                      <Drawer.Description>
                        The app shell scales back while this drawer opens.
                      </Drawer.Description>
                      <Drawer.Actions>
                        <Drawer.Close>Close</Drawer.Close>
                      </Drawer.Actions>
                    </Drawer.Content>
                  </Drawer.Popup>
                </Drawer.Viewport>
              </Drawer.Portal>
            </Drawer.Root>
          </div>
        </Drawer.Indent>
      </Drawer.Provider>
    </div>
  );
}

function DetachedTriggerExample() {
  const drawer = React.useMemo(
    () => Drawer.createHandle<{ title: string; description: string }>(),
    [],
  );

  return (
    <div style={detachedActionsStyle}>
      <Drawer.Trigger
        handle={drawer}
        payload={{
          title: 'Profile',
          description: 'Review account details and profile preferences.',
        }}
      >
        Profile
      </Drawer.Trigger>
      <Drawer.Trigger
        handle={drawer}
        payload={{
          title: 'Settings',
          description: 'Change application defaults without leaving the page.',
        }}
      >
        Settings
      </Drawer.Trigger>

      <Drawer.Root handle={drawer} swipeDirection="right">
        {({ payload }) => (
          <Drawer.Portal>
            <Drawer.Backdrop />
            <Drawer.Viewport>
              <Drawer.Popup>
                <Drawer.Content>
                  <Drawer.Title>{payload?.title ?? 'Drawer'}</Drawer.Title>
                  <Drawer.Description>
                    {payload?.description ??
                      'Detached triggers can pass payload into the drawer.'}
                  </Drawer.Description>
                  <Drawer.Actions>
                    <Drawer.Close>Close</Drawer.Close>
                  </Drawer.Actions>
                </Drawer.Content>
              </Drawer.Popup>
            </Drawer.Viewport>
          </Drawer.Portal>
        )}
      </Drawer.Root>
    </div>
  );
}

const detachedActionsStyle: CSSProperties = {
  display: 'flex',
  gap: '1rem',
  flexWrap: 'wrap',
};

const indentCenterStyle: CSSProperties = {
  minHeight: 320,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const indentRootStyle: CSSProperties = {
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
};

const snapItemStyle: CSSProperties = {
  height: '3rem',
  borderRadius: '0.75rem',
  border: `1px solid ${sys.color.border.low}`,
  background: sys.color.container.low,
};

const snapListStyle: CSSProperties = {
  display: 'grid',
  gap: '0.75rem',
  marginBottom: '1.5rem',
};
