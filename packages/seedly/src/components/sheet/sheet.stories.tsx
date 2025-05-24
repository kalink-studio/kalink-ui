import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../button';
import { ButtonIcon } from '../button-icon';
import { Stack } from '../stack';
import { Text } from '../text';

import { Sheet, SheetTrigger } from './sheet';
import { SheetContent, SheetContentProps } from './sheet-content';
import { SheetDescription } from './sheet-description';
import { SheetHeader } from './sheet-header';
import { SheetTitle } from './sheet-title';

type StoryArgs = SheetContentProps<'div'>;

const meta = {
  title: 'Component/Sheet',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  component: SheetContent,
  subcomponents: {
    Sheet,
    SheetTrigger,
    SheetHeader,
    SheetTitle,
  },
  argTypes: {},
  render: (args) => <SheetStory {...args} />,
} satisfies Meta<StoryArgs>;

export default meta;

type Story = StoryObj<StoryArgs>;

export const Right: Story = {};

export const Bottom: Story = {
  args: {
    side: 'bottom',
    size: 'sm',
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

const SheetStory = (props: SheetContentProps<'div'>) => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="plain">{'Open'}</Button>
        </SheetTrigger>
        <SheetContent
          container={portalRoot}
          color="surface"
          spacing={4}
          {...props}
        >
          <Stack spacing={4}>
            <SheetHeader
              side={props.side}
              closeBtn={
                <ButtonIcon>
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
