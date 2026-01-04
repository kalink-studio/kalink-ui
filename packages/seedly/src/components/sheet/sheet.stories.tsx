import { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, waitFor } from 'storybook/test';

import { Button } from '../button';
import { ButtonIcon } from '../button-icon';
import { Stack } from '../stack';
import { Text } from '../text';

import { Sheet, SheetTrigger } from './sheet';
import { SheetBody } from './sheet-body';
import { SheetContent, SheetContentProps } from './sheet-content';
import { SheetDescription } from './sheet-description';
import { SheetFooter } from './sheet-footer';
import { SheetHeader } from './sheet-header';
import { SheetTitle } from './sheet-title';

type StoryArgs = SheetContentProps<'div'>;
type Story = StoryObj<StoryArgs>;

/** Shared play function that tests open/close behavior */
const sharedPlay: NonNullable<Story['play']> = async ({
  canvas,
  userEvent,
  step,
}) => {
  await step('Open sheet', async () => {
    const cta = canvas.getByRole('button');

    await userEvent.click(cta);

    await expect(canvas.getByRole('dialog')).toBeVisible();
  });

  await step('Close sheet with close button', async () => {
    const closeBtn = canvas.getByRole('button');

    await userEvent.click(closeBtn);

    await waitFor(() =>
      expect(canvas.queryByRole('dialog')).not.toBeInTheDocument(),
    );
  });
};

const meta = {
  title: 'Component/Sheet',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  component: SheetContent,
  argTypes: {},
  render: (args) => <SheetStory {...args} />,
  play: sharedPlay,
} satisfies Meta<StoryArgs>;

export default meta;

export const Right: Story = {};

export const Bottom: Story = {
  args: {
    side: 'bottom',
    size: 'sm',
  },
  play: async (context) => {
    await sharedPlay(context);

    // Add story-specific tests
    await context.step('Verify bottom positioning', async () => {
      // Example: add specific assertions for bottom sheet
    });
  },
};

export const Left: Story = {
  args: {
    side: 'left',
  },
};

export const Top: Story = {
  args: {
    side: 'top',
    size: 'sm',
  },
};

export const WithFooter: Story = {
  render: (args) => <SheetWithFooterStory {...args} />,
  play: async ({ canvas, userEvent, step }) => {
    await step('Open sheet', async () => {
      const openBtn = canvas.getByRole('button', { name: 'Open' });
      await userEvent.click(openBtn);
      await expect(canvas.getByRole('dialog')).toBeVisible();
    });

    await step('Verify footer buttons are present', async () => {
      await expect(
        canvas.getByRole('button', { name: 'Cancel' }),
      ).toBeVisible();
      await expect(
        canvas.getByRole('button', { name: 'Save Changes' }),
      ).toBeVisible();
    });

    await step('Close sheet with close button', async () => {
      // The close button is the ButtonIcon (no text name)
      const buttons = canvas.getAllByRole('button');
      const closeBtn = buttons.find(
        (btn) => !btn.textContent || btn.textContent.trim() === '',
      );
      if (closeBtn) {
        await userEvent.click(closeBtn);
        await waitFor(() =>
          expect(canvas.queryByRole('dialog')).not.toBeInTheDocument(),
        );
      }
    });
  },
};

const CloseIcon = () => (
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
    <path d="M18 6 6 18"></path>
    <path d="m6 6 12 12"></path>
  </svg>
);

const SheetStory = (props: SheetContentProps<'div'>) => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="plain">{'Open'}</Button>
        </SheetTrigger>
        <SheetContent container={portalRoot} spacing={4} {...props}>
          <Stack spacing={4} align="stretch">
            <SheetHeader
              side={props.side}
              closeBtn={
                <ButtonIcon label="Close">
                  <CloseIcon />
                </ButtonIcon>
              }
            >
              <SheetTitle variant="title">Nulla irure dolore.</SheetTitle>
              <SheetDescription>
                Labore ipsum labore aliquip laboris quis id.
              </SheetDescription>
            </SheetHeader>
            <Text>
              Esse magna occaecat fugiat ipsum eiusmod est aliqua labore.
              Laboris fugiat Lorem occaecat eu sunt irure eiusmod commodo.
              Excepteur Lorem est est exercitation elit ullamco proident
              laboris. Commodo excepteur exercitation incididunt adipisicing
              exercitation aute ex voluptate in. Laborum irure sint est
              excepteur occaecat irure eiusmod consectetur adipisicing commodo
              nostrud occaecat. Magna cillum ipsum nisi excepteur veniam laboris
              pariatur et aliqua deserunt dolore mollit enim magna. Laboris
              pariatur culpa nostrud et ipsum consequat ea pariatur mollit quis
              commodo commodo eiusmod laboris. Non exercitation qui amet. Velit
              occaecat aute cillum in qui exercitation esse incididunt. Anim
              aliqua voluptate nulla qui mollit nisi cillum minim irure mollit
              velit nisi irure sint. Ut cillum ea id excepteur veniam id
              voluptate excepteur pariatur quis nostrud eiusmod.
            </Text>
          </Stack>
        </SheetContent>
      </Sheet>

      <div ref={setPortalRoot} id="portal-root"></div>
    </>
  );
};

const SheetWithFooterStory = (props: SheetContentProps<'div'>) => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="plain">{'Open'}</Button>
        </SheetTrigger>
        <SheetContent container={portalRoot} spacing={4} {...props}>
          <SheetHeader
            side={props.side}
            closeBtn={
              <ButtonIcon label="Close">
                <CloseIcon />
              </ButtonIcon>
            }
          >
            <SheetTitle variant="title">Sheet with Footer</SheetTitle>
            <SheetDescription>
              This sheet demonstrates the SheetFooter component.
            </SheetDescription>
          </SheetHeader>
          <SheetBody>
            <Text>
              Esse magna occaecat fugiat ipsum eiusmod est aliqua labore.
              Laboris fugiat Lorem occaecat eu sunt irure eiusmod commodo.
              Excepteur Lorem est est exercitation elit ullamco proident
              laboris. Commodo excepteur exercitation incididunt adipisicing
              exercitation aute ex voluptate in. Laborum irure sint est
              excepteur occaecat irure eiusmod consectetur adipisicing commodo
              nostrud occaecat. Magna cillum ipsum nisi excepteur veniam laboris
              pariatur et aliqua deserunt dolore mollit enim magna. Laboris
              pariatur culpa nostrud et ipsum consequat ea pariatur mollit quis
              commodo commodo eiusmod laboris. Non exercitation qui amet. Velit
              occaecat aute cillum in qui exercitation esse incididunt. Anim
              aliqua voluptate nulla qui mollit nisi cillum minim irure mollit
              velit nisi irure sint. Ut cillum ea id excepteur veniam id
              voluptate excepteur pariatur quis nostrud eiusmod.
            </Text>
          </SheetBody>
          <SheetFooter>
            <Button>Cancel</Button>
            <Button variant="plain">Save Changes</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <div ref={setPortalRoot} id="portal-root"></div>
    </>
  );
};
